export function reactiveMembraneMixin (baseType: any) {
  return class extends (baseType as any) {
    constructor () {
      super();
    }
    _makeReactive (data) {

      if(!data) return;
    
      for (let dataKey in data) {
        Object.defineProperty(this.constructor.prototype, dataKey, {
          enumerable: false,
          configurable: true,
          set: (next) => {
            this.constructor.prototype['_'+dataKey] = next
            this._reRender()
          },
          get:  () => {
            return this.constructor.prototype['_'+dataKey] ?  this.constructor.prototype['_'+dataKey]: data[dataKey]
          }
        })
      }
    }
  }

}