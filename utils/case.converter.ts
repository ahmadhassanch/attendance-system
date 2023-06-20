export function sentenceToPascal(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

export function pascalToCamel(word: string): string {
  return word.charAt(0).toLowerCase() + word.slice(1);
}

export function pascalToSnake(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1_$2")
    .toLowerCase();
}

export function pascalToSnake1(str: string): string {
  return str.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`).slice(1);
}

export function snakeToSnakeDash(str: string): string {
  return str.replace(/_/g, "-");
}

export function hyphenToPascal(str: string): string {
  return str
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export function hyphenToCamel(str: string): string {
  const splits = str.split("-");

  return (
    splits[0] +
    splits
      .slice(1)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("")
  );
}
