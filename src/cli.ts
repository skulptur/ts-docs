#!/usr/bin/env node

import { program } from "commander";
import { generateDocs, parseDocs } from "./index";

program
  .option("-i, --input <path>", "Input entry path")
  .option("-o, --output <path>", "Output path")
  .parse(process.argv);

const options = program.opts();

console.log(
  generateDocs({
    input: options.input,
    output: options.output,
  })
);
