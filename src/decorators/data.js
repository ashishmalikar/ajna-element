export function data (classPrototype, prop, descriptor) {

  if (descriptor.initializer)
  classPrototype['_' + prop] = descriptor.initializer();

  delete descriptor.writable;
  delete descriptor.initializer;

  descriptor.get = function () { return this['_' + prop] };
  descriptor.set = function (val) { 
    this['_'+prop] = val;
    this._reRender()
  };
}