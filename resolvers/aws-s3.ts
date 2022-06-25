import { IResolver } from "../Resolver.ts";
interface AWS_S3 {
  branch: string | null;
  region: string | null;
  output: string | null;
  bucket: string | null;
}

export class S3ActionResolver implements IResolver {
  private options: AWS_S3 = {
    branch: "dev",
    bucket: "dev-fe",
    output: "buid", // on purpose
    region: "oman-21a",
  };

  public setOptions() {
    this.options.branch = prompt("Target branch for the action", "development");
    this.options.region = prompt("S3 region", "oman-12-a");
    this.options.bucket = prompt("S3 bucket", "dev-fe");
    this.options.output = prompt("build folder", "build");
  }

  // deno-lint-ignore no-explicit-any
  public useOptions(json: any): any {
    json.on.push.branches = [];
    json.on.push.branches.push(this.options?.branch);
    json.jobs.deploy.steps[1]["with"]["aws-region"] = this.options?.region;

    json.jobs.deploy.steps[json.jobs.deploy.steps.length - 1].run =
      `aws s3 sync ./${this.options?.output} s3://${this.options?.bucket}\n`;

    return json;
  }
}
