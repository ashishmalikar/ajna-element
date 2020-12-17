export interface ElementRegistrationOptions {
  namespace?: string;
  tag: string;
  component: CustomElementConstructor
}

export default function (options: ElementRegistrationOptions) {
  
  let { namespace, tag, component } = options;

  namespace = namespace || "c";

  let tagName: string = namespace+"-"+tag;

  tagName = tagName.toLowerCase();

  if(!exists(tagName)) {
    window.customElements.define(tagName, component);
  }

}

/**
 * Checks if the element is already registered
 * @param tagName string
 */
function exists (tagName: string): boolean {
  return window.customElements.get(tagName) !== undefined;
}