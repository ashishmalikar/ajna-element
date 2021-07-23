import {createCompilerCreator} from './compilers/createCompileCreator';
import baseCompile from './compilers/baseCompile';
import baseOptions from './shared/baseOptions';
import parse from './parser/index';

export const compiler = createCompilerCreator(baseCompile)(baseOptions);
export {
  baseOptions,
  parse
}