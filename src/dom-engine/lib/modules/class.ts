import { VNode, vnode, VNodeData } from '../vnode';
import { Module } from './module';

export type Classes = Record<string, boolean>;

function updateClass (oldVNode: VNode, vnode: VNode) {

  var cur: any;
  var name: string;
  var elm: Element = vnode.elm as Element;

  var oldClass = (oldVNode.data as VNodeData).class;
  var klass = (vnode.data as VNodeData).class;

  var oldStaticClassNames = (oldVNode.data as VNodeData).staticClass?.split(' ');
  var staticklassNames = (vnode.data as VNodeData).staticClass?.split(' ');


  if(oldStaticClassNames && oldClass) {

    oldClass = oldClass || {}

    for (let i = 0; i < oldStaticClassNames.length; i++) {
      const oldClsName = oldStaticClassNames[i];
      oldClass[oldClsName] = true;
    }
  }
  
  if(staticklassNames) {

    klass = klass || {};

    for (let i = 0; i < staticklassNames.length; i++) {
      const clsName = staticklassNames[i];
      klass[clsName] = true;
    }
  }

  if (!oldClass && !klass) return
  if (oldClass === klass) return
  oldClass = oldClass || {}
  klass = klass || {}

  for (name in oldClass) {
    if (
      oldClass[name] &&
      !Object.prototype.hasOwnProperty.call(klass, name)
    ) {
      // was `true` and now not provided
      elm.classList.remove(name)
    }
  }

  for (name in klass) {

    cur = klass[name]
    if (cur !== oldClass[name]) {

      if(name.includes(' ')) {

        let clsNames = name.split(' ');

        for (let i = 0; i < clsNames.length; i++) {
          const clsName = clsNames[i];
          (elm.classList as any)[cur ? 'add' : 'remove'](clsName) 
        }
      }else{
        (elm.classList as any)[cur ? 'add' : 'remove'](name)
      }
    }
  }

}

export const classModule: Module = { create: updateClass, update: updateClass }