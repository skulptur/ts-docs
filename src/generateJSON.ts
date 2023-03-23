import * as path from "path";
import * as typedoc from "typedoc";

export interface Output {
  [key: string]: any;
}

/**
 * Generates a JSON object from the comments in the specified TypeScript files.
 * @param inputPath - The path to the TypeScript file to be parsed.
 * @returns A JSON object containing the parsed comments.
 */
export function generateJSON(inputPath: string): Output {
  const app = new typedoc.Application();

  // Set TypeDoc configuration options
  app.options.addReader(new typedoc.TSConfigReader());
  app.options.addReader(new typedoc.TypeDocReader());
  app.bootstrap({
    entryPoints: [path.resolve(inputPath)],
    excludeExternals: true,
    excludePrivate: true,
    excludeProtected: true,
    // excludeNotExported: true,
    excludeInternal: true,
    hideGenerator: true,
    readme: "none",
  });

  // Convert TypeScript files to TypeDoc's internal representation
  const program = app.convert();

  // Generate JSON output from TypeDoc's internal representation
  const output = app.serializer.projectToObject(program);

  return output;
}
