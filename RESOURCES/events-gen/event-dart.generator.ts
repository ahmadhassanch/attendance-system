import * as ts from 'typescript';
import * as fs from 'fs';
import { pascalToCamel } from '../../utils/case.converter';

const tsTypeToDartType = {
  string: 'String',
  number: 'int',
  boolean: 'bool',
};

let eventDefString = `/// When creating new event:
///  1. Add entry to CustomEvent enum
///  2. Declase new class that derives BaseEvent
///  3. Add case in BaseEvent factory constructor
///  4. Add stream in EventStream
///  5. Add case in EventStream.dispatchEvent()

// ignore_for_file: constant_identifier_names\n\n`;

let eventStreamString = `import 'package:flutter/material.dart';
import 'package:rxdart/rxdart.dart' show PublishSubject;

import 'custom_event_occured.dart';
import 'event_definitions.dart';

`;

type Models = {
  [eventName: string]: {
    name: string;
    type: keyof typeof tsTypeToDartType;
  }[];
};

function getDispatchEventFunction(models: Models) {
  let st = '';
  st += `  void dispatchEvent(Map<String, dynamic> message) {\n`;
  st += `    debugPrint('============>>>>>> $message');\n`;
  st += `    switch (stringToEnum(message['event'])) {\n`;

  for (const eventName of Object.keys(models)) {
    st += `      case CustomEvent.${eventName}:\n`;
    st += `        CustomEventOccurred<${eventName}> event =\n`;
    st += `            CustomEventOccurred.fromMap(message);\n`;
    st += `        _${pascalToCamel(eventName)}.sink.add(event);\n`;
    st += `        break;\n`;
    st += `\n`;
  }

  st += `      default:\n`;
  st += `        throw Exception(\n`;
  st += `            message['event'] + ' not registered in handleEvent');\n`;
  st += `    }\n`;
  st += `  }\n`;

  return st;
}

function buildEventStream(models: Models) {
  let st = `class EventStream {
  CustomEvent stringToEnum(String str) {
    return CustomEvent.values.firstWhere((element) => element.name == str);
  }\n`;

  st += '\n';

  for (const [eventName, properties] of Object.entries(models)) {
    st += `  final PublishSubject<CustomEventOccurred<${eventName}>> _${pascalToCamel(
      eventName,
    )} = PublishSubject();\n`;
    st += `  Stream<CustomEventOccurred<${eventName}>> get ${pascalToCamel(
      eventName,
    )} => _${pascalToCamel(eventName)}.stream;\n`;
    st += '\n';
  }

  st += '\n';
  st += getDispatchEventFunction(models);
  st += '\n';

  st += '}\n';
  return st;
}

function buildCustomEventEnum(models: Models) {
  let st = 'enum CustomEvent { ';
  st += Object.keys(models)
    .map((eventName) => eventName)
    .join(', ');
  st += ' }\n';
  st += '\n';

  return st;
}

function buildBaseEvent(models: Models) {
  let st = '';
  st += `abstract class BaseEvent {\n`;
  st += `  String get className => runtimeType.toString();\n`;
  st += ` \n`;
  st += `  BaseEvent();\n`;
  st += ` \n`;
  st += `  Map<String, dynamic> toMap();\n`;
  st += ` \n`;
  st += `  factory BaseEvent.messageFactory(\n`;
  st += `      String className, Map<String, dynamic> parsedJson) {\n`;
  st += `    switch (className) {\n`;

  for (const eventName of Object.keys(models)) {
    st += `      case '${eventName}':\n`;
    st += `        return ${eventName}.fromMap(parsedJson);\n`;
  }

  st += `      default:\n`;
  st += `        throw Exception('$className factory does not exist');\n`;
  st += `    }\n`;
  st += `  }\n`;
  st += ` }\n`;
  st += '\n';

  return st;
}

function buildDartModels(models: Models) {
  let st = '';
  let notificationId = 0;

  for (const [eventName, properties] of Object.entries(models)) {
    const propertyNames = properties.map((prop) => prop.name);

    st += `class ${eventName} extends BaseEvent {\n`;

    st += properties
      .map((prop) => `  ${tsTypeToDartType[prop.type]} ${prop.name};`)
      .join('\n');
    st += '\n';
    st += `final int notificationId = ${notificationId};\n`;
    notificationId += 1;

    st += '\n';

    st += `  ${eventName}(${propertyNames
      .map((name) => `this.${name}`)
      .join(', ')});\n`;

    st += `\n`;

    st += `  ${eventName}.fromMap(Map<String, dynamic> parsedJson) :\n`;
    st += propertyNames
      .map((name) => `        ${name} = parsedJson['${name}']`)
      .join(',\n');
    st += ';';

    st += `\n\n`;
    st += `  @override\n`;
    st += `  Map<String, dynamic> toMap() {\n`;
    st += `    return {\n`;

    st += properties
      .map((prop) => `      '${prop.name}': ${prop.name},`)
      .join('\n');
    st += '\n';

    st += `    };\n`;
    st += `  }\n`;
    st += `}\n`;
    st += '\n';
  }

  return st;
}

function handleEventData(
  checker: ts.TypeChecker,
  eventData: ts.TypeAliasDeclaration,
) {
  const eventType = checker.getTypeAtLocation(eventData);

  let models: {
    [eventName: string]: {
      name: string;
      type: keyof typeof tsTypeToDartType;
    }[];
  } = {};

  eventType.getProperties().forEach((prop) => {
    const type = prop.valueDeclaration
      ? checker.getTypeOfSymbolAtLocation(prop, prop.valueDeclaration)
      : checker.getTypeOfSymbolAtLocation(prop, eventData);

    models[prop.name] = type.getProperties().map((pr) => {
      const type = pr.valueDeclaration
        ? checker.getTypeOfSymbolAtLocation(pr, pr.valueDeclaration)
        : checker.getTypeOfSymbolAtLocation(pr, eventData);

      return {
        name: pr.name,
        // @ts-ignore
        type: type['intrinsicName'],
      };
    });
  });

  return models;
}

function generateDocumentation(
  fileNames: string[],
  options: ts.CompilerOptions,
): void {
  const program = ts.createProgram(
    ['../../src/utilities/custom-event/definitions/events.definitions.ts'],
    options,
  );
  const checker = program.getTypeChecker();

  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) {
      ts.forEachChild(sourceFile, visit);
    }
  }

  // print out the doc
  fs.writeFileSync('event_definitions.dart', eventDefString);
  fs.writeFileSync('event_stream.dart', eventStreamString);

  return;

  /** visit nodes finding exported classes */
  function visit(node: ts.Node) {
    if (ts.isTypeAliasDeclaration(node) && node.name) {
      // This is a top level class, get its symbol
      const type = checker.getTypeAtLocation(node);
      console.log(node.name.text);

      if (
        node.name.text === 'EventMessageData' ||
        false // node.name.text === 'EventMatchData'
      ) {
        const models = handleEventData(checker, node);

        eventDefString += buildCustomEventEnum(models);
        eventDefString += buildBaseEvent(models);
        eventDefString += buildDartModels(models);
        eventStreamString += buildEventStream(models);
      }

      // console.log(type.getProperties().map((prop) => prop.name));

      node.forEachChild(visit);
    } else if (ts.isModuleDeclaration(node)) {
      // This is a namespace, visit its children
      ts.forEachChild(node, visit);
    }
  }
}

generateDocumentation(process.argv.slice(2), {
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS,
});
