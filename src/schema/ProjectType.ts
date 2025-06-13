import { Args } from "./util";

type ProjectTypeBase<T extends string> = {
  type: T;
};

type Application = ProjectTypeBase<"application"> & {
  application: {
    mainClass?: string;
    jvmArgs?: Args;
    runtimeArgs?: Args;
  };
};

type Library = ProjectTypeBase<"library"> & {};

type ProjectType = Application | Library;

export { ProjectType };
