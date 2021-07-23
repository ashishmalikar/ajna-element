/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

export default function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    // var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          // warn$$1(
          //   'It seems you are using the standalone build of Vue.js in an ' +
          //   'environment with Content Security Policy that prohibits unsafe-eval. ' +
          //   'The template compiler cannot work in this environment. Consider ' +
          //   'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
          //   'templates into render functions.'
          // );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (process.env.NODE_ENV !== 'production') {
      if (compiled.errors && compiled.errors.length) {
        if (options.outputSourceRange) {
          // compiled.errors.forEach(function (e) {
          //   warn$$1(
          //     "Error compiling template:\n\n" + (e.msg) + "\n\n" +
          //     generateCodeFrame(template, e.start, e.end),
          //     vm
          //   );
          // });
        } else {
          // warn$$1(
          //   "Error compiling template:\n\n" + template + "\n\n" +
          //   compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          //   vm
          // );
        }
      }
      if (compiled.tips && compiled.tips.length) {
        if (options.outputSourceRange) {
          compiled.tips.forEach(function (e) { return tip(e.msg, vm); });
        } else {
          compiled.tips.forEach(function (msg) { return tip(msg, vm); });
        }
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        // warn$$1(
        //   "Failed to generate render function:\n\n" +
        //   fnGenErrors.map(function (ref) {
        //     var err = ref.err;
        //     var code = ref.code;

        //     return ((err.toString()) + " in\n\n" + code + "\n");
        // }).join('\n'),
        //   vm
        // );
      }
    }

    return (cache[key] = res)
  }
}

function createFunction (code, errors) {
  try {
    return new Function('$api',code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}