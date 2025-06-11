import * as fs from "node:fs/promises";
import * as path from "node:path";
import { Schema } from "../schema";
import { writeLines } from "./util";

async function createJavaApplication(dir: string, schema: Schema) {
  await fs.writeFile(
    path.join(dir, "Main.java"),
    writeLines([
      `package ${schema.group};`,
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

async function createKotlinApplication(dir: string, schema: Schema) {
  await fs.writeFile(
    path.join(dir, "Main.kt"),
    writeLines([
      `package ${schema.group}`,
      "",
      "fun main() {",
      ['println("Hello, World!")'],
      "}",
    ])
  );
}

async function createJavaLibrary(dir: string, testDir: string, schema: Schema) {
  await fs.writeFile(
    path.join(dir, "Util.java"),
    writeLines([
      `package ${schema.group};`,
      "",
      "public class Util {",
      ["public static int add(int a, int b) {", ["return a + b;"], "}"],
      "}",
    ])
  );

  await fs.writeFile(
    path.join(testDir, "Test.java"),
    writeLines([
      `package ${schema.group};`,
      "",
      "import org.junit.jupiter.api.Test;",
      "import static org.junit.jupiter.api.Assertions.assertEquals;",
      "",
      "public class UtilTest {",
      ["@Test", "void testAdd() {", ["assertEquals(5, Util.add(2, 3));"], "}"],
      "}",
    ])
  );
}

async function createKotlinLibrary(
  dir: string,
  testDir: string,
  schema: Schema
) {
  await fs.writeFile(
    path.join(dir, "Util.kt"),
    writeLines([
      `package ${schema.group}`,
      "",
      "fun add(a: Int, b: Int) = a + b",
    ])
  );

  await fs.writeFile(
    path.join(testDir, "Test.kt"),
    writeLines([
      `package ${schema.group}`,
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

export async function createSrc(workingDir: string, schema: Schema) {
  if (schema.addons?.kotlin) {
    const dir = path.join(workingDir, "src", "main", "kotlin");
    const testDir = path.join(workingDir, "src", "test", "kotlin");

    await fs.mkdir(dir, { recursive: true });
    await fs.mkdir(testDir, { recursive: true });

    switch (schema.type) {
      case "application":
        await createKotlinApplication(dir, schema);
        break;
      case "library":
        await createKotlinLibrary(dir, testDir, schema);
        break;
    }
  } else {
    const packageDir = path.join(...schema.group.split("."));
    const dir = path.join(workingDir, "src", "main", "java", packageDir);
    const testDir = path.join(workingDir, "src", "test", "java", packageDir);

    await fs.mkdir(dir, { recursive: true });
    await fs.mkdir(testDir, { recursive: true });

    switch (schema.type) {
      case "application":
        await createJavaApplication(dir, schema);
        break;
      case "library":
        await createJavaLibrary(dir, testDir, schema);
        break;
    }
  }
}
