export function childAttacherMixin (baseType: any) {
  return class extends (baseType as any) {
    constructor () {
      super();
      // this._attachChildrens()
    }
  }
}