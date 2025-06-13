import { program } from "commander";
import fs from "node:fs/promises";
import path from "node:path";
import { ProjectGenerator } from "./generator/ProjectGenerator";
import { Schema } from "./schema";

program.argument("[file]", "Path to the schema file", "jpm.json");
program.parse();

const [file] = program.args;

const text = await fs.readFile(file, {
  encoding: "utf-8",
});

const schema = JSON.parse(text) as Schema;
const dir = path.dirname(path.resolve(file));

new ProjectGenerator(schema).generate(dir);
