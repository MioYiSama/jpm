const INDENT = " ".repeat(4);

type Lines = string | Lines[];

export function writeLines(lines: Lines, indent: number = 0): string {
  if (!Array.isArray(lines)) {
    return INDENT.repeat(indent - 1) + lines;
  }

  return lines.map((line) => writeLines(line, indent + 1)).join("\n");
}
