import { YAMLtoJSON, JSONtoYAML } from "https://deno.land/x/y2j@v2.0.0/mod.ts";
import { GetGithubActionSchema } from "./utils.ts";

export interface IResolver {
  setOptions(): void;
  // deno-lint-ignore no-explicit-any
  useOptions(json: any): any;
}

export class Resolver {

  resolver: IResolver;

  private _yamlSchema: string | undefined;

  public constructor(_resolver: IResolver) {
    this.resolver = _resolver;
  }

  public run(): void {
    this.resolver.setOptions();
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
