export function data (classPrototype, prop, descriptor) {

  // console.log('tabs: ', classPrototype[prop])

  if (descriptor.initializer)
  classPrototype['_' + prop] = descriptor.initializer();

  delete descriptor.writable;
  delete descriptor.initializer;

  descriptor.get = function () { return this['_' + prop] };
  descriptor.set = function (val) { 
    this['_'+prop] = val;
    this._reRender()
  };

  observe(classPrototype['_'+prop])

}


function observe(value) {
  console.log("observing vale: ", value)
}