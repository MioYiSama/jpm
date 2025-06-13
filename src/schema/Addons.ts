import { Args, Optional } from "./util";

type Kotlin = {
  kotlin: {
    version: string;
  };
};

type Native = {
  native: {
    version: string;
    buildArgs: Args;
  };
};

type FatJar = {
  fatJar: {};
};

type Addons = {
  addons?: Optional<Kotlin & Native & FatJar>;
};

export { Addons };
