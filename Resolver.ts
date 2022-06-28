import { JSONtoYAML , YAMLtoJSON} from "./dept.ts"

export interface IResolver {
  setOptions(): void;
  // deno-lint-ignore no-explicit-any
  useOptions(json: any): any;
  getSchema(): Promise<string>;
}

export class Resolver {
  resolver: IResolver;

  private _yamlSchema: string | undefined;
  private _json: string | undefined;

  public constructor(_resolver: IResolver) {
    this.resolver = _resolver;
  }

  public async run(): Promise<void> {
    await this.getSchema();
    this.resolver.setOptions();

    const json = JSON.parse(this.toJson());
    this._json = this.resolver.useOptions(json);
  }

  public async getSchema(): Promise<void> {
    this._yamlSchema = await this.resolver.getSchema();
  }

  public toJson(): string {
    if (this._yamlSchema == undefined) {
      throw Error("getSchema need to be invoked");
    }

    return YAMLtoJSON(this._yamlSchema);
  }

  public toYaml(): string {
    try {
      return JSONtoYAML(JSON.stringify(this._json));
    } catch (e) {
      throw e;
    }
  }
}
