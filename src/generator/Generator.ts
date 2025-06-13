import { Schema } from "../schema";

abstract class Generator {
  schema: Schema;

  constructor(schema: Schema) {
    this.schema = schema;
  }

  abstract generate(dir: string): Promise<void>;
}

export { Generator };
