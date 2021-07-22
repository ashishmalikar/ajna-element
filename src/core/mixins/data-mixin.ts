export function dataMixin (baseType: any) {
  return class extends (baseType as any) {
    constructor () {
      super();
      this._initData();
    }
    _initData () {
      let data = this.data?.call(this);
      this._makeReactive(data);
    }
  }

}