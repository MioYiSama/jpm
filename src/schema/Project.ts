export type ProjectID = {
  group: string;
  name: string;
};

export type Project = ProjectID & {
  version: string;
  jdk: number;
};
