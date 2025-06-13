type BuildToolBase<T extends string> = {
  buildTool: T;
};

type Gradle = BuildToolBase<"gradle"> & {};

type Maven = BuildToolBase<"maven"> & {};

type BuildTool = Gradle | Maven;

export { BuildTool };
