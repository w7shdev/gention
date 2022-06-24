import { Args, parse } from "https://deno.land/std@0.119.0/flags/mod.ts";
import { S3ActionResolver } from "./resolvers/aws-s3.ts";

console.log(`
Automation demo to generate gitub \n\raction with stright farward usage
    `);

const flags: Args = parse(Deno.args, {
  boolean: ["aws", "s3"],
});

if (flags.aws) {
  if (!flags.s3) {
    console.log("%cyou need to have --s3 flag included", "color:red");
    console.log("%cFor now we have s3 CD only for automation", "color:red");

    Deno.exit(1);
  }

  console.log("%cPreparing S3 automation deployment workflow", "color:green");

  const Resolver = new S3ActionResolver();

  const tempalte = await Resolver.getSchema();

  tempalte.setOptions();

  const parsed = JSON.parse(tempalte.toJson());

  const json = tempalte.useOptions(parsed);

  console.log(`\nconverting it back to YAML\n`);
  console.log(tempalte.toYaml(JSON.stringify(json)));

} else {
  console.log(
    "%cTo run this tool add the flags  --aws --s3",
    "color:red",
  );
}
