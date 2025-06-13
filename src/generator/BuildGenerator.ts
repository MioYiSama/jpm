import { Schema } from "../schema";
import { Generator } from "./Generator";

abstract class BuildGenerator extends Generator {
  static construct(schema: Schema): BuildGenerator {
    switch (schema.buildTool) {
      case "gradle":
        return new GradleBuildGenerator(schema);
      case "maven":
        return new MavenBuildGenerator(schema);
    }
  }
}

class GradleBuildGenerator extends BuildGenerator {
  override async generate(dir: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

class MavenBuildGenerator extends BuildGenerator {
  override async generate(dir: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { BuildGenerator };
