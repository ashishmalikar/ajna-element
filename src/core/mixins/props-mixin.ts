export function propsMixin (baseType: any) {

  return class extends (baseType as any) {
    constructor () {
      super();
      this._initProps();
      // console.log('props mixin called')
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
        }

      }

      this._makeReactive(props);
    }

    getElementAttributes () {
      return this.attributes;
    }
  }

  

}