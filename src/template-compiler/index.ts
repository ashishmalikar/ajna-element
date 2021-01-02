import { CompileResult, CompileResultFunction } from "./shared/types";

function compile (template: string): CompileResult {
  return {
    ast: {

    },
    render: "",
    errors: [],
    warnings: []
  }
}

function compileToFunctions (template: string): CompileResultFunction {
  return {
    render: new Function("code"),
    errors: [],
    warnings: []
  }
}

exports.compile = compile;
exports.compileToFunctions = compileToFunctions;