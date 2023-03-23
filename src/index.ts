import * as fs from "fs";
import { generateJSON } from "./generateJSON";
import { generateMarkdown } from "./generateMarkdown";

export type ParseDocsOptions = {
  input: string;
  output: string;
};

/**
 * Parses comments in TypeScript files and writes the resulting JSON object to a file.
 * @param options - An object containing input and output file paths.
 * @param options.input - The path to the TypeScript file to be parsed.
 * @param options.output - The path to write the resulting JSON object to.
 * @returns The resulting JSON object.
 */
export const parseDocs = ({ input, output }: ParseDocsOptions) => {
  const outputJson = generateJSON(input);

  // Write the JSON output to a file
  fs.writeFileSync(output, JSON.stringify(outputJson, null, 2));

  return outputJson;
};

export const generateDocs = ({ input, output }: ParseDocsOptions) => {
  const json = generateJSON(input);
  const markdownArr = generateMarkdown(json);
  // Write the JSON output to a file
  fs.writeFileSync(output, markdownArr);

  return markdownArr;
};
