import {createCompilerCreator} from './compilers/createCompileCreator';
import baseCompile from './compilers/baseCompile';
import baseOptions from './shared/baseOptions';
import parse from './parser/index';

export const compiler = createCompilerCreator(baseCompile)(baseOptions);
export {
  baseOptions,
  parse
}

// export compile
// Export CompileToFunctions

// Compiler will return compiled code string
/**
 * Compiler to function will create compiler functions
 * 
 * First generate AST Code
 * Second Generate code string 
 * and then generate function with build string
 */

/**
 * Directives
 * 
 */