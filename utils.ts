export function setSecret(secret_placeholder: string): string {
  return `{{ ${secret_placeholder} }}`;
}

export async function GetGithubActionSchema(fileName: string): Promise<string> {
  const decode = new TextDecoder("utf-8");
  const ActionYaml = await Deno.readFile(`./github-actions/${fileName}.yaml`);
  return decode.decode(ActionYaml);
}
