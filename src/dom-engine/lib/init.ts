import { VNode, vnode } from './vnode';
import { htmlDomApi, DOMAPI } from './dom-api';
import { Module } from './modules/module';

import { modules } from './modules'

const hooks: Array<keyof Module> = ['create', 'update', 'remove', 'destroy', 'pre', 'post']

type ArraysOf<T> = {
  [K in keyof T]: Array<T[K]>;
}

type ModuleHooks = ArraysOf<Required<Module>>

type NonUndefined<T> = T extends undefined ? never : T

type VNodeQueue = VNode[];

const emptyNode = vnode('', {}, [], undefined, undefined)

function isVnode (vnode: any): vnode is VNode {
  return vnode.sel !== undefined
}

function sameVnode (vnode1: VNode, vnode2: VNode): boolean {
  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel
}

function isPrimitive (s: any): s is (string | number) {
  return typeof s === 'string' || typeof s === 'number'
}

function isUndef (s: any): boolean {
  return s === undefined
}
function isDef<A> (s: A): s is NonUndefined<A> {
  return s !== undefined
}

type KeyToIndexMap = {[key: string]: number}

function createKeyToOldIdx (children: VNode[], beginIdx: number, endIdx: number): KeyToIndexMap {
  const map: KeyToIndexMap = {}
  for (let i = beginIdx; i <= endIdx; ++i) {
    const key = children[i]?.key
    if (key !== undefined) {
      map[key] = i
    }
  }
  return map
}

export function init() {

  const cbs: ModuleHooks = {
    create: [],
    update: [],
    remove: [],
    destroy: [],
    pre: [],
    post: []
  }

  const api = htmlDomApi;

  for (let i = 0; i < hooks.length; i++) {
    cbs[hooks[i]] = [];
    for (let j = 0; j < modules.length; j++) {
      const hook = modules[j][hooks[i]]
      if (hook !== undefined) {
        (cbs[hooks[i]] as any[]).push(hook)
      }
    }
  }

  function emptyNodeAt(elm) {
    return vnode(api.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }


  function createRmCb (childElm: Node, listeners: number) {
    return function rmCb () {
      if (--listeners === 0) {
        const parent = api.parentNode(childElm) as Node
        api.removeChild(parent, childElm)
      }
    }
  }

  function createElm (vnode: VNode, insertedVNodeQueue: VNodeQueue): Node {

    let i:any;
    let data = vnode.data;

    if(data !== undefined) {
      const init = data.hook?.init
    }

    let sel = vnode.sel;

    if(sel === '!') {

    }else if(sel !== undefined){

      let tag = sel;

      const elm = vnode.elm = isDef(data) && isDef(i = data.ns)?api.createElementNS(i, tag): api.createElement(tag);

      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);

      if(Array.isArray(vnode.children)) {
        
        // console.log('inside child element: ', vnode.children)

        for(let i=0; i< vnode.children.length; i++) {

          const ch = vnode.children[i];
          if(ch != null) {

            if(Array.isArray(ch)) {

              let chArray: VNode[] = normalizeArrayChildren(ch);

              for (let j = 0; j < chArray.length; j++) {
                const ch$1 = chArray[j];
                api.appendChild(elm, createElm(ch$1 as VNode, insertedVNodeQueue));
              }
            }else{
              api.appendChild(elm, createElm(ch as VNode, insertedVNodeQueue));
            }
          }
        }
      }else if (isPrimitive(vnode.text)) {

        elm.innerHTML = vnode.text

        // api.appendChild(elm, api.createTextNode(vnode.text))
      }

    }else {
      vnode.elm = api.createTextNode(vnode.text!)
    }

    return vnode.elm;
  }

  function addVnodes (
    parentElm: Node,
    before: Node | null,
    vnodes: VNode[],
    startIdx: number,
    endIdx: number,
    insertedVnodeQueue: VNodeQueue
  ) {

    vnodes = normalizeArrayChildren(vnodes);

    for (; startIdx <= endIdx; ++startIdx) {
      const ch = vnodes[startIdx]
      if (ch != null) {
        api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before)
      }
    }
  }

  function invokeDestroyHook (vnode: VNode) {
    const data = vnode.data
    if (data !== undefined) {
      data?.hook?.destroy?.(vnode)
      for (let i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode)
      if (vnode.children !== undefined) {
        for (let j = 0; j < vnode.children.length; ++j) {
          const child = vnode.children[j]
          if (child != null && typeof child !== 'string') {
            invokeDestroyHook(child)
          }
        }
      }
    }
  }

  function removeVnodes (parentElm: Node,
    vnodes: VNode[],
    startIdx: number,
    endIdx: number): void {

    for (; startIdx <= endIdx; ++startIdx) {
      let listeners: number
      let rm: () => void
      const ch = vnodes[startIdx]
      if (ch != null) {
        if (isDef(ch.sel)) {
          invokeDestroyHook(ch)
          listeners = cbs.remove.length + 1
          rm = createRmCb(ch.elm!, listeners)
          for (let i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm)
          const removeHook = ch?.data?.hook?.remove
          if (isDef(removeHook)) {
            removeHook(ch, rm)
          } else {
            rm()
          }
        } else { // Text node
          api.removeChild(parentElm, ch.elm!)
        }
      }
    }
  
  }

  
  function updateChildren (parentElm: Node,
    oldCh: VNode[],
    newCh: VNode[],
    insertedVnodeQueue: VNodeQueue) {
    let oldStartIdx = 0
    let newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx: KeyToIndexMap | undefined
    let idxInOld: number
    let elmToMove: VNode
    let before: any

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (oldStartVnode == null) {
        oldStartVnode = oldCh[++oldStartIdx] // Vnode might have been moved left
      } else if (oldEndVnode == null) {
        oldEndVnode = oldCh[--oldEndIdx]
      } else if (newStartVnode == null) {
        newStartVnode = newCh[++newStartIdx]
      } else if (newEndVnode == null) {
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)
        oldStartVnode = oldCh[++oldStartIdx]
        newStartVnode = newCh[++newStartIdx]
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)
        oldEndVnode = oldCh[--oldEndIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)
        api.insertBefore(parentElm, oldStartVnode.elm!, api.nextSibling(oldEndVnode.elm!))
        oldStartVnode = oldCh[++oldStartIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)
        api.insertBefore(parentElm, oldEndVnode.elm!, oldStartVnode.elm!)
        oldEndVnode = oldCh[--oldEndIdx]
        newStartVnode = newCh[++newStartIdx]
      } else {
        if (oldKeyToIdx === undefined) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
        }
        idxInOld = oldKeyToIdx[newStartVnode.key as string]
        if (isUndef(idxInOld)) { // New element
          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm!)
        } else {
          elmToMove = oldCh[idxInOld]
          if (elmToMove.sel !== newStartVnode.sel) {
            api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm!)
          } else {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue)
            oldCh[idxInOld] = undefined as any
            api.insertBefore(parentElm, elmToMove.elm!, oldStartVnode.elm!)
          }
        }
        newStartVnode = newCh[++newStartIdx]
      }
    }
    if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
      if (oldStartIdx > oldEndIdx) {
        before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm
        addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
      } else {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
      }
    }
  }

  function patchVnode (oldVnode: VNode, vnode: VNode, insertedVnodeQueue: VNodeQueue) {

    const hook = vnode.data?.hook
    
    hook?.prepatch?.(oldVnode, vnode)
    
    const elm = vnode.elm = oldVnode.elm!
    
    const oldCh = oldVnode.children as VNode[]
    
    const ch = vnode.children as VNode[]
    
    if (oldVnode === vnode) return
    
    if (vnode.data !== undefined) {
      for (let i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
      vnode.data.hook?.update?.(oldVnode, vnode)
    }
    
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) {


          updateChildren(elm, oldCh, ch, insertedVnodeQueue)

          // if(isArray(ch)) {
          //   let ch$1 = normalizeArrayChildren(ch);
          //   updateChildren(elm, oldCh, ch$1, insertedVnodeQueue) 
          // }else{
          //   updateChildren(elm, oldCh, ch, insertedVnodeQueue)
          // }
        } 
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) api.setTextContent(elm, '')
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1)
      } else if (isDef(oldVnode.text)) {
        api.setTextContent(elm, '')
      }
    } else if (oldVnode.text !== vnode.text) {
      if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1)
      }
      api.setTextContent(elm, vnode.text!)
    }
    
    hook?.postpatch?.(oldVnode, vnode)

  }

  return function patch(oldVNode, vnode) {

    let i, elm, parent;
    const insertedVnodeQueue = [];

    if(!isVnode(oldVNode)) {
      oldVNode = emptyNodeAt(oldVNode);
    }

    if(isUndef(vnode)) console.error("No template provided");

    // For same node
    if(sameVnode(oldVNode, vnode)) {
      patchVnode(oldVNode, vnode, insertedVnodeQueue);
    }else{
      elm = oldVNode.elm;
      createElm(vnode, insertedVnodeQueue);

      elm.innerHTML = ""

      api.appendChild(elm, vnode.elm)
    }

    return vnode;

  }
}

function normalizeArrayChildren(children): VNode[]  {
  return children.flat();
}


function isArray(arr: any[]): boolean {
  return Array.isArray(arr);
}