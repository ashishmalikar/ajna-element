import { htmlDomApi } from '../../dom-engine/lib/dom-api/index';
import { registerElement } from './register-element';
function renderElement({ tag, namespace, element, props }) {
    const registerdElement = registerElement({ tag, namespace, element });
    function mount(container) {
        const mountPoint = (typeof container === 'string') ? document.querySelector(container) : container;
        if (mountPoint) {
            let elm = htmlDomApi.createElement(registerdElement.tag);
            mountPoint.appendChild(elm);
        }
        else {
            throw new Error("Not able to mount Element, passed query/node is not present or accessible");
        }
    }
    return mount;
}
function applyProperties() {
}
exports.renderElement = renderElement;
