type ProjectID = {
  group: string;
  name: string;
};

type Project = ProjectID & {
  version: string;
  jdk: number;
};

export { Project, ProjectID };
