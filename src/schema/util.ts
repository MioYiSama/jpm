type Optional<T> = {
  [key in keyof T]?: T[key];
};

type Args = string[];

export { Args, Optional };
