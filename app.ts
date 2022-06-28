import {Args , parse} from "./dept.ts"
import { S3ActionResolver } from "./resolvers/aws-s3.ts";
import { Resolver } from "./Resolver.ts";

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

  const resolver = new Resolver(new S3ActionResolver());
  await resolver.run();
  console.log(`%c\nGenerated github action\n`, "color:green");
  console.log(resolver.toYaml());
} else {
  console.log(
    "%cTo run this tool add the flags  --aws --s3",
    "color:red",
  );
}
