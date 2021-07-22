export function propsMixin (baseType: any) {

  return class extends (baseType as any) {
    constructor () {
      super();
      this._initProps();
    }
    
    _initProps () {

      let definedAttributes = this.props?.call(this);
      let props = {};
      let valuePassed = this.getElementAttributes()

      for (let attrName in definedAttributes) {

        // if its in the defined atttributes
        // Make camel case to - saperate values
        if(valuePassed.hasOwnProperty(attrName)) {
          props[attrName] = valuePassed[attrName].textContent //valuePassed[attrName].textContent
        }else {
          props[attrName] = undefined
        }

      }

      this._makeReactive(props);
    }

    getElementAttributes () {

      let attrsToReturn = {};
      let attrs = this.attributes;

      for(let attr of attrs) {
        attrsToReturn[camelize(attr.name)] = {
          textContent: attr.value
        }
      }
      return attrsToReturn;
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