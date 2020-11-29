# Template Compiler

Compile templates to javascript function to further use in virtual dom.

~~~ javascript
import compiler from 'tempalte-compiler'

let template = 
`<template>
  <div id="App">

  </div>
</template>`

let ast = compiler.compile(defaultTemplate);

let code = compiler.compileToFunctions(defaultTemplate);

console.log('Code', code);
~~~