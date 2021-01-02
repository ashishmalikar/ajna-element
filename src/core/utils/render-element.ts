import { AjnaElement } from '../../ajna-element';
import { htmlDomApi } from '../../dom-engine/lib/dom-api/index';
import { RegisteredElementProperties, registerElement } from './register-element';

export interface RenderElementOptions {
  tag: string;
  namespace: string;
  element: CustomElementConstructor;
  props: any
}

function renderElement ({ tag, namespace, element, props }: RenderElementOptions) {

  const registerdElement: RegisteredElementProperties = registerElement({ tag, namespace, element });

  function mount (container) {

    const mountPoint = (typeof container === 'string')?document.querySelector(container):container;

    if(mountPoint) {

      let elm = htmlDomApi.createElement(registerdElement.tag)

      mountPoint.appendChild(elm);
    }else{
      throw new Error("Not able to mount Element, passed query/node is not present or accessible");
    }

  }

  return mount;
}

function applyProperties (){

}


exports.renderElement = renderElement;