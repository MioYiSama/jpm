import fs from "node:fs/promises";
import path from "node:path";
import { Schema } from "../schema";
import { Generator } from "./Generator";
import { writeLines } from "./util";

abstract class SourcesGenerator extends Generator {
  override async generate(dir: string): Promise<void> {
    const mainDir = this.getMainDir(dir);
    const testDir = this.getTestDir(dir);

    await Promise.all([
      fs.mkdir(mainDir, { recursive: true }),
      fs.mkdir(testDir, { recursive: true }),
    ]);

    switch (this.schema.type) {
      case "application":
        await this.generateApplication(mainDir);
        break;
      case "library":
        await Promise.all([
          this.generateLibraryMain(mainDir),
          this.generateLibraryTest(testDir),
        ]);
        break;
    }
  }

  abstract getMainDir(dir: string): string;
  abstract getTestDir(dir: string): string;

  abstract generateApplication(dir: string): Promise<void>;
  abstract generateLibraryMain(dir: string): Promise<void>;
  abstract generateLibraryTest(dir: string): Promise<void>;

  static construct(schema: Schema): SourcesGenerator {
    if (schema.addons?.kotlin) {
      return new KotlinSourcesGenerator(schema);
    }

    return new JavaSourcesGenerator(schema);
  }
}

class JavaSourcesGenerator extends SourcesGenerator {
  packageDir: string;

  constructor(schema: Schema) {
    super(schema);

    this.packageDir = path.join(...schema.group.split("."));
  }

  getMainDir(dir: string): string {
    return path.join(dir, "src", "main", "java", this.packageDir);
  }

  getTestDir(dir: string): string {
    return path.join(dir, "src", "test", "java", this.packageDir);
  }

  override async generateApplication(dir: string): Promise<void> {
    await fs.writeFile(
      path.join(dir, "Main.java"),
      writeLines([
        `package ${this.schema.group};`,
        "",
        "public class Main {",
        [
          "public static void main(String[] args) {",
          ['System.out.println("Hello, World!");'],
          "}",
        ],
        "}",
      ])
    );
  }

  override async generateLibraryMain(dir: string): Promise<void> {
    await fs.writeFile(
      path.join(dir, "Util.java"),
      writeLines([
        `package ${this.schema.group};`,
        "",
        "public class Util {",
        ["public static int add(int a, int b) {", ["return a + b;"], "}"],
        "}",
      ])
    );
  }

  override async generateLibraryTest(dir: string): Promise<void> {
    await fs.writeFile(
      path.join(dir, "Test.java"),
      writeLines([
        `package ${this.schema.group};`,
        "",
        "import org.junit.jupiter.api.Test;",
        "import static org.junit.jupiter.api.Assertions.assertEquals;",
        "",
        "public class UtilTest {",
        [
          "@Test",
          "void testAdd() {",
          ["assertEquals(5, Util.add(2, 3));"],
          "}",
        ],
        "}",
      ])
    );
  }
}

class KotlinSourcesGenerator extends SourcesGenerator {
  getMainDir(dir: string): string {
    return path.join(dir, "src", "main", "kotlin");
  }

  getTestDir(dir: string): string {
    return path.join(dir, "src", "test", "kotlin");
  }

  override async generateApplication(dir: string): Promise<void> {
    await fs.writeFile(
      path.join(dir, "Main.kt"),
      writeLines([
        `package ${this.schema.group}`,
        "",
        "fun main() {",
        ['println("Hello, World!")'],
        "}",
      ])
    );
  }

  override async generateLibraryMain(dir: string): Promise<void> {
    await fs.writeFile(
      path.join(dir, "Util.kt"),
      writeLines([
        `package ${this.schema.group}`,
        "",
        "fun add(a: Int, b: Int) = a + b",
      ])
    );
  }

  override async generateLibraryTest(dir: string): Promise<void> {
    await fs.writeFile(
      path.join(dir, "Test.kt"),
      writeLines([
        `package ${this.schema.group}`,
        "",
        "import kotlin.test.Test",
        "import kotlin.test.assertEquals",
        "",
        "class UtilTest {",
        ["@Test", "fun testAdd() {", ["assertEquals(5, add(2, 3))"], "}"],
        "}",
      ])
    );
  }
}

export { SourcesGenerator };
