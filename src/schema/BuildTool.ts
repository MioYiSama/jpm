type BuildToolBase<T extends string> = {
  buildTool: T;
};

type Gradle = BuildToolBase<"gradle"> & {
  gradle: {};
};

type Maven = BuildToolBase<"maven"> & {
  maven: {};
};

export type BuildTool = Gradle | Maven;
