import { Args } from "./Args";
import { Optional } from "./util";

type Kotlin = {
  kotlin: {
    version: string;
  };
};

type Native = {
  native: {
    buildArgs: Args;
  };
};

type FatJar = {
  fatJar: {};
};

export type Addons = {
  addons?: Optional<Kotlin & Native & FatJar>;
};
