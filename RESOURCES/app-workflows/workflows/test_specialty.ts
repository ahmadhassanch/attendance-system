import { ApiClient } from "../lib/api-client";

async function checkSpecialty(name: String): Promise<string> {
  const req = {
    specialty: name,
  };

  let data: { [key: string]: any } = await ApiClient.get("/specialty", {
    search: name,
  });

  if (data["records"].length == 1) {
    return data["records"][0]["specialtyId"];
  }
  return "FALSE";
}

export async function createSpecialty(name: String): Promise<string> {
  let specId: string = await checkSpecialty(name);
  if (specId != "FALSE") return specId;
  const req = { specialty: name };
  let data: { [key: string]: any } = await ApiClient.post("/specialty", req);
  return data["specialtyId"];
}
