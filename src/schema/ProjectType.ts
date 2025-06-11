import { Args } from "./Args";

type ProjectTypeBase<T extends string> = {
  type: T;
};

type Application = ProjectTypeBase<"application"> & {
  application: {
    mainClass: string;
    jvmArgs?: Args;
    runtimeArgs?: Args;
  };
};

type Library = ProjectTypeBase<"library"> & {
  library: {};
};

// type Workspace = ProjectTypeBase<"workspace"> & {
//   workspace: {
//     members: string[];
//   };
// };

// export type ProjectType = Application | Library | Workspace;
export type ProjectType = Application | Library;
