function compile(template) {
    return {
        ast: {},
        render: "",
        errors: [],
        warnings: []
    };
}
function compileToFunctions(template) {
    return {
        render: new Function("code"),
        errors: [],
        warnings: []
    };
}
exports.compile = compile;
exports.compileToFunctions = compileToFunctions;
export {};
