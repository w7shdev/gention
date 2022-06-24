import { JSONtoYAML, YAMLtoJSON } from "https://deno.land/x/y2j@v2.0.0/mod.ts";
import { GetGithubActionSchema } from "../utils.ts";

interface AWS_S3 {
  branch: string;
  region: string;
  output: string;
  bucket: string;
}

export class S3ActionResolver {
  private options: AWS_S3 | undefined;

  private _yamlSchema: string | undefined;

  public setOptions() {
    prompt("Target branch for the action", this.options?.branch);
    prompt("S3 region", this.options?.region);
    prompt("S3 bucket", this.options?.bucket);
    prompt("build folder", this.options?.output);
  }

  public async getSchema(): Promise<this> {
    this._yamlSchema = await GetGithubActionSchema("aws-s3");
    return this;
  }

  public toJson(): string {
    if (this._yamlSchema == undefined) {
      throw Error("getSchema need to be invoked");
    }

    return YAMLtoJSON(this._yamlSchema);
  }

  public toYaml(json: string): string {
    try {
      return JSONtoYAML(json);
    } catch (e) {
      throw e;
    }
  }
}
