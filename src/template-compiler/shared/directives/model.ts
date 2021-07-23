export default function model$1 (
  el,
  dir,
  _warn
) {
  warn$2 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (process.env.NODE_ENV !== 'production') {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      // warn$2(
      //   "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
      //   "File inputs are read only. Use a v-on:change listener instead.",
      //   el.rawAttrsMap['v-model']
      // );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (process.env.NODE_ENV !== 'production') {
    // warn$2(
    //   "<" + (el.tag) + " v-model=\"" + value + "\">: " +
    //   "v-model is not supported on this element type. " +
    //   'If you are working with contenteditable, it\'s recommended to ' +
    //   'wrap a library dedicated for that purpose inside a custom component.',
    //   el.rawAttrsMap['v-model']
    // );
  }

  // ensure runtime directive metadata
  return true
}
