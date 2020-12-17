import { init } from '../../dom-engine/index';
import compiler from 'ajna-template-compiler';
import { $api } from '../../dom-engine/lib/helpers/index';
function bindMethods() {
    Object.getOwnPropertyNames(Object.getPrototypeOf(this))
        .map(key => {
        if (this[key] instanceof Function && key !== 'constructor')
            this[key] = this[key].bind(this);
    });
}
export function elementMixin(baseType) {
    console.log("element mixin called");
    return class AjnaElement extends baseType {
        constructor() {
            super();
            console.log("constructr caled");
            bindMethods.call(this);
            this.initTemplate();
            this.compileTemplate();
        }
        get domEngine() {
            return this.initVDomEngine();
        }
        get _template() {
            return this.template;
        }
        set _template(tmp) {
            this.template = tmp;
        }
        render($api) {
            return;
        }
        template() {
            return;
        }
        initTemplate() {
            if (this.render($api) === undefined) {
                if (this.template !== undefined) {
                    this._template = this.template();
                }
            }
        }
        compileTemplate() {
            if (this._template) {
                let compiled = compiler.compileToFunctions(this._template);
                this.render = compiled.render;
            }
        }
        initVDomEngine() {
            let patch = init();
            return {
                patch: patch
            };
        }
        connectedCallback() {
            this._render();
        }
        _render() {
            console.log("rendering content");
            if (this.render) {
                this.oldVNode = this.render($api);
                this.oldVNode = this.domEngine.patch(this, Array.isArray(this.oldVNode) ? this.oldVNode[0] : this.oldVNode);
            }
        }
        _reRender() {
            this.oldVNode = this.domEngine.patch(this.oldVNode, this.render($api)[0]);
        }
    };
}
