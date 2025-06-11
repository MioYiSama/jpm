import type { ProjectID } from "./Project";

type Dependency = ProjectID & {
  version?: string;
};

export type Dependencies = {
  dependencies?: {
    main?: Dependency[];
    test?: Dependency[];
    versions: Record<string, string>;
  };
};
