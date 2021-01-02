export interface ElementRegistrationOptions {
  namespace?: string;
  tag: string;
  element: CustomElementConstructor
}

export interface RegisteredElementProperties {
  namespace: string;
  tag: string;
}

/**
 * For Single element
 * @param options 
 */
export function registerElement (options: ElementRegistrationOptions): RegisteredElementProperties {
  
  let { namespace, tag, element } = options;

  namespace = namespace || "c";

  let tagName: string = namespace+"-"+tag;

  tagName = tagName.toLowerCase();

  if(!exists(tagName)) {
    window.customElements.define(tagName, element);
  }

  return {
    namespace: namespace,
    tag: tagName,
  }

}

export function registerElements (elements: ElementRegistrationOptions[]): void {

  let elm: ElementRegistrationOptions;

  for(elm of elements) {
    registerElement(elm);
  }
}

/**
 * Checks if the element is already registered
 * @param tagName string
 */
function exists (tagName: string): boolean {
  return window.customElements.get(tagName) !== undefined;
}