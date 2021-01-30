export function prop (classPrototype: Object, prop: string, descriptor: PropertyDescriptor) {

  const callback = classPrototype["_reRender"];


  Object.defineProperty(classPrototype, prop, {
    enumerable: true,
    configurable: true,
    set: function(next) {
      let isInitialized = this.hasOwnProperty("_"+prop);
      
      this["_"+prop] = next;

      if(isInitialized) {
        callback.call(this);
      }
    },
    get: function() {
      return this["_"+prop];
    },
  });
}