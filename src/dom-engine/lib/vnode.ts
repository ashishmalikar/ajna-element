import { Hooks } from './hooks'

import { Classes } from './modules/class';
import { Attrs } from './modules/attributes';
import { On } from './modules/eventsListeners';
import { VNodeStyle } from 'snabbdom/build/package/modules/style';
import { Props } from 'snabbdom/build/package/modules/props';
import { Dataset } from 'snabbdom/build/package/modules/dataset';

export type Key = string | number

export interface VNode {
  sel: string | undefined
  data: VNodeData | undefined
  children: Array<VNode | string> | undefined
  elm: Node | undefined
  text: string | undefined
  key: Key | undefined
}

export interface VNodeData {
  props?: Props
  attrs?: Attrs
  class?: Classes
  staticClass?: string
  style?: VNodeStyle;
  staticStyle?: VNodeStyle;
  dataset?: Dataset
  on?: On
  // hero?: Hero
  // attachData?: AttachData
  hook?: Hooks
  // key?: Key
  ns?: string // for SVGs
  // fn?: () => VNode // for thunks
  // args?: any[] // for thunks
  // [key: string]: any // for any other 3rd party module
}

export function vnode (sel: string | undefined,
  data: any | undefined,
  children: Array<VNode | string> | undefined,
  text: string | undefined,
  elm: Element | Text | undefined): VNode {

  const key = data === undefined ? undefined : data.key
  return { sel, data, children, text, elm, key }
}