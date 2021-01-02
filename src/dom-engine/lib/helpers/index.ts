import { VNode, vnode } from "../vnode";

function addNS(data, children, sel) {
    data.ns = 'http://www.w3.org/2000/svg';
    if (sel !== 'foreignObject' && children !== undefined) {
        for (let i = 0; i < children.length; ++i) {
            const childData = children[i].data;
            if (childData !== undefined) {
                addNS(childData, children[i].children, children[i].sel);
            }
        }
    }
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function h(sel, b, c) {
    var data = {};
    var children;
    var text;
    var i;

    if (c !== undefined) {
        if (b !== null) {
            data = b;
        }
        if (Array.isArray(c)) {
            children = c;
        }
        else if (isPrimitive(c)) {
            text = c;
        }
        else if (c && c.sel) {
            children = [c];
        }
    }
    else if (b !== undefined && b !== null) {
        if (Array.isArray(b)) {
            children = b;
        }
        else if (isPrimitive(b)) {
            text = b;
        }
        else if (b && b.sel) {
            children = [b];
        }
        else {
            data = b;
        }
    }

    if (children !== undefined) {

        children = children.flat()

        for (i = 0; i < children.length; ++i) {

          if (isPrimitive(children[i])) {
            children[i] = vnode(undefined, undefined, undefined, children[i], undefined);
          }     

        }
    }
    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&
        (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {
        addNS(data, children, sel);
    }
    return vnode(sel, data, children, text, undefined);
};

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function isPrimitive (s) {
  return typeof s === 'string' || typeof s === 'number'
}

  /**
   * Strict object type check. Only returns true
   * for plain JavaScript objects.
   */
  function isPlainObject (obj) {
    return _toString.call(obj) === '[object Object]'
  }

  function isDef (v) {
    return v !== undefined && v !== null
  }

  /* istanbul ignore next */
  function isNative (Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
  }

  var hasSymbol =
    typeof Symbol !== 'undefined' && isNative(Symbol) &&
    typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);


  /**
   * Convert a value to a string that is actually rendered.
   */
  function toString (val) {
    return val == null
      ? ''
      : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
        ? JSON.stringify(val, null, 2)
        : String(val)
  }

    /**
   * Runtime helper for rendering v-for lists.
   */
  function renderList (
    val,
    render
  ) {
    var ret, i, l, keys, key;
    if (Array.isArray(val) || typeof val === 'string') {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = render(val[i], i);
      }
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0; i < val; i++) {
        ret[i] = render(i + 1, i);
      }
    } else if (isObject(val)) {
      if (hasSymbol && val[Symbol.iterator]) {
        ret = [];
        var iterator = val[Symbol.iterator]();
        var result = iterator.next();
        while (!result.done) {
          ret.push(render(result.value, ret.length));
          result = iterator.next();
        }
      } else {
        keys = Object.keys(val);
        ret = new Array(keys.length);
        for (i = 0, l = keys.length; i < l; i++) {
          key = keys[i];
          ret[i] = render(val[key], key, i);
        }
      }
    }
    if (!isDef(ret)) {
      ret = [];
    }
    (ret)._isVList = true;
    return ret
  }

  function renderSlot(
    name,
    content) {

    if(name === 'default') {

      
      let temp = document.createElement("div");

      temp.innerHTML = content;

      temp.querySelectorAll("*").forEach((el)=>{
        if(el.hasAttribute("slot")) {
          temp.removeChild(el);
        }
      });

      return vnode("slot", {}, undefined, temp.innerHTML, undefined);
      
    }else {

      let temp = document.createElement("div");

      temp.innerHTML = content;

      let slotContent = temp.querySelector("[slot="+name+"]");

      return vnode("slot", {
        attrs: {
          name: name
        }
      }, undefined, slotContent?.innerHTML, undefined);
    }
    
  }

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = vnode(undefined, undefined, [], text, undefined);
  node.text = text;
  // node.isComment = true;
  return node
};

export const $api = {
  _c: h,
  _v: createTextVNode,
  _s: toString,
  _l: renderList,
  _t: renderSlot,
  _e: createEmptyVNode
}

function createTextVNode(v) {
  return vnode(undefined, undefined, undefined,v, undefined);
}

