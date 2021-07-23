import CodegenState from './codegen';
import genElement from './genElement';

export default function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '$api._c("div")';
  return {
    render: ("with(this) { return " + code + "; }"),
    staticRenderFns: state.staticRenderFns
  }
}