import { JSONtoYAML, YAMLtoJSON } from "https://deno.land/x/y2j@v2.0.0/mod.ts";
import { GetGithubActionSchema } from "../utils.ts";

interface AWS_S3 {
  branch: string | null;
  region: string | null;
  output: string | null;
  bucket: string | null;
}

export class S3ActionResolver {
  private options: AWS_S3 = {
    branch: "dev",
    bucket: "dev-fe",
    output: "buid", // on purpose
    region: "oman-21a",
  };

  private _yamlSchema: string | undefined;

  public setOptions() {
    this.options.branch = prompt("Target branch for the action", "development");
    this.options.region = prompt("S3 region", "oman-12-a");
    this.options.bucket = prompt("S3 bucket", "dev-fe");
    this.options.output = prompt("build folder", "build");
  }

  // deno-lint-ignore no-explicit-any
  public useOptions(json: any): any {
    json.on.branches = [];
    json.on.branches.push(this.options?.branch);
    json.jobs.deploy.steps[1]["with"]["aws-region"] = this.options?.region;

    json.jobs.deploy.steps[json.jobs.deploy.steps.length - 1].run =
      `aws s3 sync ./${this.options?.output} s3://${this.options?.bucket}\n`;

    return json;
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
