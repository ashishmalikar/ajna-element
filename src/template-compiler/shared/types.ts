export interface ASTElement {
  
}

export interface CompileResult {
  ast: ASTElement;
  render: string;
  errors: string[];
  warnings: string[]
}

export interface CompileResultFunction {
  render: Function;
  errors: string[];
  warnings: string[]
}