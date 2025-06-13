import type { ProjectID } from "./Project";

type Dependency = ProjectID & {
  version?: string;
};

type Dependencies = {
  dependencies?: {
    main?: Dependency[];
    test?: Dependency[];
    versions?: Record<string, string>;
  };
};

export { Dependencies };
