export interface IResolver {
  setOptions(): void;
  // deno-lint-ignore no-explicit-any
  useOptions(json: any): any;
}

export class Resolver {
  resolver: IResolver;
  public constructor(_resolver: IResolver) {
    this.resolver = _resolver;
  }

  public run(): void {
    this.resolver.setOptions();
  }
}
