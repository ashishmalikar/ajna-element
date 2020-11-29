export function prop(classPrototype, prop, descriptor) {

  if (descriptor.initializer)
  classPrototype['_' + prop] = descriptor.initializer();

  delete descriptor.writable;
  delete descriptor.initializer;

  descriptor.get = function () { 

    if(this.getAttribute(prop)) {
      let val = this.getAttribute(prop);
      this['_'+prop] = this.getAttribute(prop);
    }

    return this['_' + prop] 
  };
  descriptor.set = function (val) { 

    if(this.getAttribute(prop)) {
      let val = this.getAttribute(prop);
      this['_'+prop] = this.getAttribute(prop);
    }

    this['_'+prop] = val;
    this._reRender()
  };
  
}