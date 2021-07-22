export function data (classPrototype: Object, prop: string, descriptor: PropertyDescriptor) {

  const callback = classPrototype["_reRender"];

  Object.defineProperty(classPrototype.constructor.prototype, prop, {
    enumerable: true,
    configurable: true,
    set (next) {

       console.log('setter called') 

      let isInitialized = this.hasOwnProperty("_"+prop);
      this.constructor.prototype["_"+prop] = next;

      console.log('isInitialized: ', isInitialized)

      if(isInitialized) {
        callback.call(this);
      }

      // console.log("Set function called")

    },
    get: function() {
      console.log('Getter called')
      return this.constructor.prototype["_"+prop];
    },
  });
}
