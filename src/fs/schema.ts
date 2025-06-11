import * as fs from "node:fs/promises";
import { Schema } from "../schema";

export async function readSchema(file: string): Promise<Schema> {
  const text = await fs.readFile(file, {
    encoding: "utf-8",
  });

  return JSON.parse(text) as Schema;
}
