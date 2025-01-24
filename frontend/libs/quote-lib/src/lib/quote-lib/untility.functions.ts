export function obectKeys(obj: Record<string, any>): string[] {
  return Object.keys(obj);
}

export function transformToTitleCase(input: string): string {
  return input
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lowercase and uppercase
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2') // Handle consecutive uppercase followed by lowercase
    .replace(/([A-Z])([A-Z]+$)/g, '$1 $2') // Handle final consecutive uppercase letters
    .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first letter
}