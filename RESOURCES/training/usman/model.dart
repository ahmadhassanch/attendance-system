class ResultableList {
  List<Resultables> resultables = [];

  ResultableList({required this.resultables});

  ResultableList.fromJson(List? json) {
    if (json != null) {
      resultables = <Resultables>[];
      json.forEach((v) {
        resultables.add(new Resultables.fromJson(v));
      });
    }
  }

  List toJson() {
    List data = [];
    data = this.resultables.map((v) => v.toJson()).toList();
    return data;
  }
}

class Resultables {
  String? name;
  String? dataType;

  Resultables({this.name, this.dataType});

  Resultables.fromJson(Map<String, dynamic> json) {
    name = json['name'];
    dataType = json['dataType'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['name'] = this.name;
    data['dataType'] = this.dataType;
    return data;
  }
}
