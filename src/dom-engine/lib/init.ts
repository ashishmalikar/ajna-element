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

function samevNode(oldVnode, newVnode) {
  return oldVnode.sel === newVnode;
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

      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode)

      if(Array.isArray(vnode.children)) {
        
        for(let i=0; i< vnode.children.length; i++) {

          const ch = vnode.children[i];

          if(ch != null) {
            api.appendChild(elm, createElm(ch as VNode, insertedVNodeQueue));
          }else if (isPrimitive(vnode.text)) {
            api.appendChild(elm, api.createTextNode(vnode.text))
          }

        }

      }else{

      }

    }else {
      vnode.elm = api.createTextNode(vnode.text!)
    }

    return vnode.elm;
  }

  return function patch(oldVNode, vnode) {

    let i, elm, parent;
    const insertedVNodeQueue = [];

    if(!isVnode(oldVNode)) {
      oldVNode = emptyNodeAt(oldVNode);
    }

    // For same node
    if(samevNode(oldVNode, vnode)) {
      
    }else{
      elm = oldVNode.elm;
      createElm(vnode, insertedVNodeQueue);
      api.appendChild(elm, vnode.elm)
    }

    return vnode;

  }
}
