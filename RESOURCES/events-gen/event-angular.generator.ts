import * as ts from 'typescript';
import * as fs from 'fs';
import { pascalToCamel } from '../../utils/case.converter';

const tsTypes = {
  string: 'string',
  number: 'number',
  boolean: 'boolean',
};

let eventStreamString = `import { Subject } from 'rxjs';

import { CustomEventOccurred } from './event-occurred.interface';
import { CustomEvent } from './events.definitions';

`;

type Models = {
  [eventName: string]: {
    name: string;
    type: keyof typeof tsTypes;
  }[];
};

function getDispatchEventFunction(models: Models) {
  let st = '';
  st += `  dispatchEvent<T extends CustomEvent>(message: CustomEventOccurred<T>) {\n`;
  st += `    switch (message.event) {\n`;

  for (const eventName of Object.keys(models)) {
    st += `      case CustomEvent.${eventName}:\n`;
    st += `        this._${pascalToCamel(
      eventName,
    )}.next(message as CustomEventOccurred<'${eventName}'>);\n`;
    st += `        break;\n`;
    st += `\n`;
  }

  st += `      default:\n`;
  st += `        throw new Error(message.event + ' not registered in dispatchEvent');\n`;
  st += `    }\n`;
  st += `  }\n`;

  return st;
}

function buildEventStream(models: Models) {
  let st = `export class EventStream {`;
  st += '\n';

  for (const [eventName, properties] of Object.entries(models)) {
    st += `  private _${pascalToCamel(
      eventName,
    )} = new Subject<CustomEventOccurred<'${eventName}'>>();\n`;

    st += `  get ${pascalToCamel(eventName)}() {\n`;
    st += `    return this._${pascalToCamel(eventName)}.asObservable();\n`;
    st += '  }\n';
    st += '\n';
  }

  st += '\n';
  st += getDispatchEventFunction(models);
  st += '\n';

  st += '}\n';
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
      type: keyof typeof tsTypes;
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
  fs.writeFileSync('event.stream.ts', eventStreamString);

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
