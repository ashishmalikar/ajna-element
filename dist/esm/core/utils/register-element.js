/**
 * For Single element
 * @param options
 */
export function registerElement(options) {
    let { namespace, tag, element } = options;
    namespace = namespace || "c";
    let tagName = namespace + "-" + tag;
    tagName = tagName.toLowerCase();
    if (!exists(tagName)) {
        window.customElements.define(tagName, element);
    }
    return {
        namespace: namespace,
        tag: tagName,
    };
}
export function registerElements(elements) {
    let elm;
    for (elm of elements) {
        registerElement(elm);
    }
}
/**
 * Checks if the element is already registered
 * @param tagName string
 */
function exists(tagName) {
    return window.customElements.get(tagName) !== undefined;
}
