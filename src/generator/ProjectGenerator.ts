import { Schema } from "../schema";
import { BuildGenerator } from "./BuildGenerator";
import { Generator } from "./Generator";
import { SourcesGenerator } from "./SourcesGenerator";

class ProjectGenerator extends Generator {
  sourcesGenerator: SourcesGenerator;
  buildGenerator: BuildGenerator;

  constructor(schema: Schema) {
    super(schema);

    this.sourcesGenerator = SourcesGenerator.construct(schema);
    this.buildGenerator = BuildGenerator.construct(schema);
  }

  override async generate(dir: string): Promise<void> {
    await Promise.all([
      this.sourcesGenerator.generate(dir),
      this.buildGenerator.generate(dir),
    ]);
  }
}

export { ProjectGenerator };
