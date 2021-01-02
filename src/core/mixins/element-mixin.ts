import { init } from '../../dom-engine/index';
import {compiler, parse, baseOptions} from 'ajna-template-compiler';
import { $api } from '../../dom-engine/lib/helpers/index';
import { VNode } from '../../dom-engine/lib/vnode';


function bindMethods() {
  Object.getOwnPropertyNames(Object.getPrototypeOf(this))
      .map(key => {
          if (this[key] instanceof Function && key !== 'constructor')
              this[key] = this[key].bind(this)
      })
}

export interface AjnaElementBase {
  initTemplate():void;
  domEngine: any;
  initTemplate(): void;
  compileTemplate(): void;
}

export function elementMixin (baseType: any) {

  return class extends (baseType as any) implements AjnaElementBase {
    oldVNode: VNode | undefined;

    constructor () {
      super();
      
      bindMethods.call(this);

      this.initAttributes ()

      this.initTemplate();    

      this.processSlot$1()
      
      this.compileTemplate(); 
    }  

    connectedCallback() {
      this._render();
    }

    processSlot$1() {

      let template = this._template, innerHTML = this.innerHTML, defautlSlots: [], namedSlots: [];

      // Check if tempalte content has slot property
      if(this.hasSlot(template)) {

        // generate ast for inner html
        // generate ast for template content 

        let htmlAST = parse(innerHTML, baseOptions), templateAST = parse(template, baseOptions);

      }

      
    }

    /**
     * Function should return the template with replaced slot content
     * @param html string
     */
    hasSlot(html) {

      let index, hasSlotContent: boolean = false, template = html;

      var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
      var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + (unicodeRegExp.source) + "]*";
      var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
      var startTagOpen = new RegExp(("^<" + qnameCapture));

      while(html) {
        hasSlotContent = hasSlotTag();
        if(hasSlotContent) break;
        advance(1);
      }

      function advance (n) {
        index += n;
        html = html.substring(n);
      }

      function hasSlotTag (): any {
        let hasSlotContent: boolean = false
        var start = html.match(startTagOpen);
        if(start) {
          if(isSlot(start[1])) {
            hasSlotContent = true;
          }
        }
        return hasSlotContent;
      }

      function isSlot(v): boolean {
        return v && v === 'slot';
      }

      return hasSlotContent;
    }

    get defaultSlot () {
      return this._defaultSlot;
    }

    set defaultSlot(slot) {
      this._defaultSlot = slot;
    }
    
    get hasSlots () {
      return this._hasSlots;
    }

    set hasSlots (hasSlots) {
      this._hasSlots = hasSlots;  
    }

    get domEngine() {
      return this.initVDomEngine();
    }

    get _template () {
      return this.template;
    }

    set _template (tmp) {
      this.template = tmp;
    }

    render ($api): any {
      return;
    }

    template (): any {
      return;
    }

    initTemplate () {

      if(this.render($api) === undefined) {
        if(this.template !== undefined) {
          this._template = (this.template() as any);
        }
      }
    }

    compileTemplate () {
      
      if(this._template) {
        let compiled = compiler.compileToFunctions(this._template);
        this.render = compiled.render;
      }
      
    }

    initVDomEngine () {
      let patch = init();
      return {
        patch: patch
      }
    }

    _render () {

      if(this.render) {
        this.oldVNode = this.render($api);

        if(!this.oldVNode) {
          throw new Error("No Templte or render function found in class - "+this.constructor.name+", please make sure template or render function is there and must return the value")
        }
        
        this.oldVNode = this.domEngine.patch(this, Array.isArray(this.oldVNode)?this.oldVNode[0]:this.oldVNode);
      }
    }

    _reRender () {
      this.oldVNode = this.domEngine.patch(this.oldVNode, this.render($api)[0]);
    }

    initAttributes () {
      
      let attrs = this.attributes;

      if(this.constructor.name === 'AjnaButtonElement') {

        for(const attr of attrs) {

          let camelizedName = camelize(attr.name);

          let exists = this.hasOwnProperty(camelizedName);

          this[camelizedName] = attr.value

        }        
      }
    }
  }
}

  /**
   * Camelize a hyphen-delimited string.
   */
  var camelizeRE = /-(\w)/g;
  var camelize = cached(function (str) {
    return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
  });

    /**
   * Create a cached version of a pure function.
   */
  function cached (fn) {
    var cache = Object.create(null);
    return (function cachedFn (str) {
      var hit = cache[str];
      return hit || (cache[str] = fn(str))
    })
  }