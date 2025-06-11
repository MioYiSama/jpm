import { program } from "commander";
import * as path from "node:path";
import { createBuild } from "./fs/build";
import { readSchema } from "./fs/schema";
import { createSrc } from "./fs/src";

program.argument("[file]", "Path to the schema file", "jpm.json");
program.parse();

const [file] = program.args;

const schema = await readSchema(file);
const dir = path.dirname(path.resolve(file));

await createSrc(dir, schema);
await createBuild(dir, schema);
