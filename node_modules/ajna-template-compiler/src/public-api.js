import {createCompilerCreator} from './compilers/createCompileCreator';
import baseCompile from './compilers/baseCompile';
import baseOptions from './shared/baseOptions';

export default createCompilerCreator(baseCompile)(baseOptions);