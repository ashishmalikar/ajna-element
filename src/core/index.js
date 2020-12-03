import { AjnaElementMixin } from './mixins';
// import { init } from 'snabbdom/build/package/init'
import { init } from '../dom-engine'

import compiler from 'ajna-template-compiler';

import { $api } from '../dom-engine/lib/helpers'

function getClassMethods (instance, cls) {
  return Object.getOwnPropertyNames(Object.getPrototypeOf(instance))
    .filter(name => {
      let method = instance[name];
      return !(!(method instanceof Function) || method === cls);
    });
}

export class AjnaElement extends AjnaElementMixin(HTMLElement) {
  constructor () {
    super();

    this.domEngine = this.initVDomEngine();

    let methods = getClassMethods(this);

    methods.forEach(mtd => {
      this[mtd] = this[mtd].bind(this);
    })

    this.initTemplate();
    this.compileTemplate();

  }


  initTemplate () {
    if(!this.render) {
      if(this.template) {
        this._template = this.template();
      }
    }
  }

  compileTemplate () {
    
    
    if(!this.render) {
      let compiled = compiler.compileToFunctions(this._template);

      console.log('Compiled: ', compiled.render)

      this.render = compiled.render;
      this.staticRenderFns = compiled.staticRenderFns;
    }

  }

  initVDomEngine () {
    let patch = init();
    return {
      patch: patch
    }
  }

  connectedCallback() {
    this._render();
  }

  _render () {

    if(this.render) {
      this.oldVNode = this.render($api);
      this.oldVNode = this.domEngine.patch(this, this.oldVNode[0]);
    }

  }

  _reRender () {
    // console.log("before old vnode: ", this.oldVNode)
    this.oldVNode = this.domEngine.patch(this.oldVNode, this.render($api)[0]);
    // console.log("after old vnode: ", this.oldVNode)
  }
}