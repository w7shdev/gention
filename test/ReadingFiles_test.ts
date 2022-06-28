import { GetGithubActionSchema } from "../utils.ts";
import { YAMLtoJSON } from "../dept.ts";
import { assertEquals } from "https://deno.land/std@0.145.0/testing/asserts.ts";

Deno.test("Read and Converting yaml file to JSON", async () => {
  const yamlString = await GetGithubActionSchema("aws-s3");
  const toJson = YAMLtoJSON(yamlString);
  // if the YAMLtoJSON works then we are sure that we are converting it JSON
  assertEquals(typeof "", typeof toJson);
});
