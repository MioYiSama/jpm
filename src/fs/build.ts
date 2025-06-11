import * as fs from "node:fs/promises";
import * as path from "node:path";
import { Schema } from "../schema";
import { writeLines } from "./util";

async function createGradleVersionCatalogs(dir: string, schema: Schema) {
  let versions = schema.dependencies?.versions ?? {};
  let plugins: any = {};
  let dependencies = [
    ...(schema.dependencies?.main ?? []),
    ...(schema.dependencies?.test ?? []),
  ];

  if (schema.addons?.kotlin) {
    versions["kotlin"] = schema.addons.kotlin.version;

    plugins["kotlin-jvm"] = {
      id: "org.jetbrains.kotlin.jvm",
      version: "kotlin",
    };
  }

  await fs.writeFile(
    path.join(dir, "libs.versions.toml"),
    writeLines([
      "[versions]",
      ...Object.entries(versions).map(([k, v]) => `${k} = "${v}"`),
      "",
      "[plugins]",
      ...Object.entries(plugins).map(
        ([k, v]) => `${k} = { id = "${v.id}", version.ref = "${v.version}" }`
      ),
      "",
      "[libraries]",
      ...dependencies.map((d) => {
        const version = /^\$\{.*\}$/.test(d.version)
          ? `version.ref = "${d.version.slice(2, -1)}"`
          : `version = "${d.version}"`;
        return `${d.name} = { group = "${d.group}", name = "${d.name}", ${version} }`;
      }),
    ])
  );
}

async function createGradle(dir: string, schema: Schema) {
  const catalogDir = path.join(dir, "gradle");

  await fs.mkdir(catalogDir, {
    recursive: true,
  });

  await createGradleVersionCatalogs(catalogDir!, schema);

  let plugins: string[] = [];

  if (schema.type === "application") {
    plugins.push("application");
  }

  if (schema.addons?.kotlin) {
    plugins.push(`kotlin("jvm") version "${schema.addons.kotlin.version}"`);
  } else {
    plugins.push("java");
  }

  await fs.writeFile(
    path.join(dir, "build.gradle.kts"),
    writeLines([
      "plugins {",
      plugins,
      "}",
      "",
      `group = "${schema.group}"`,
      `version = "${schema.version}"`,
      "",
      "repositories {",
      ["mavenCentral()"],
      "}",
    ])
  );
}

async function createMaven(dir: string, schema: Schema) {}

export async function createBuild(workingDir: string, schema: Schema) {
  switch (schema.buildTool) {
    case "gradle":
      await createGradle(workingDir, schema);
      break;
    case "maven":
      await createMaven(workingDir, schema);
      break;
  }
}
