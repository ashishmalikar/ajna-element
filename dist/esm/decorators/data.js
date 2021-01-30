export function data(classPrototype, prop, descriptor) {
    // if(descriptor) {
    //   console.log("Descriptor availabel for: ", classPrototype.constructor.name)
    // }
    const callback = classPrototype["_reRender"];
    Object.defineProperty(classPrototype, prop, {
        enumerable: true,
        configurable: true,
        set: function (next) {
            let isInitialized = this.hasOwnProperty("_" + prop);
            this["_" + prop] = next;
            if (isInitialized) {
                callback.call(this);
            }
            // console.log("Set function called")
        },
        get: function () {
            return this["_" + prop];
        },
    });
}
