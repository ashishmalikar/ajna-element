export const dedupingMixin = function (mixin) {

  // console.log('deduping mixin: ', mixin)
  
  let mixinApplications = /** @type {mixinfuntion}*/ (mixin).__mixinApplications;

  if (!mixinApplications) {
    mixinApplications = new WeakMap();
    // /** @type {!MixinFunction} */(mixin).__mixinApplications = mixinApplications;
  }

  // console.log('Mixin Applications: ', mixinApplications)

  function dedupingMixin(base) {

    let extended = (mixin)(base);

    console.log('Extended: ', extended)

    let obj = Object.create(extended);

    // let mixinSet = Object.create( (extended).__mixinSet || baseSet || null);

    return obj;
  }

  return dedupingMixin;

}