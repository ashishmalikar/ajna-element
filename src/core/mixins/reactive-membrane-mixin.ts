export function reactiveMembraneMixin (baseType: any) {
  return class extends (baseType as any) {
    constructor () {
      super();
    }
    _makeReactive (data) {

      if(!data) return;
    
      for (let dataKey in data) {
        Object.defineProperty(this, dataKey, {
          enumerable: false,
          configurable: true,
          set: (next) => {
            this['_'+dataKey] = next
            this._reRender()
          },
          get:  () => {
            return this['_'+dataKey] ?  this['_'+dataKey]: data[dataKey]
          }
        })
      }
    }
  }

}