import { Addons } from "./Addons";
import { BuildTool } from "./BuildTool";
import { Dependencies } from "./Dependencies";
import { Project } from "./Project";
import { ProjectType } from "./ProjectType";

export type Schema = Project &
  ProjectType &
  Dependencies &
  BuildTool &
  Addons & {
    $schema?: string;
  };
