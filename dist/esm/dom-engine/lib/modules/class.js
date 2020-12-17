function updateClass(oldVNode, vnode) {
    var _a, _b;
    var cur;
    var name;
    var elm = vnode.elm;
    var oldClass = oldVNode.data.class;
    var klass = vnode.data.class;
    var oldStaticClassNames = (_a = oldVNode.data.staticClass) === null || _a === void 0 ? void 0 : _a.split(' ');
    var staticklassNames = (_b = vnode.data.staticClass) === null || _b === void 0 ? void 0 : _b.split(' ');
    if (oldStaticClassNames && oldClass) {
        oldClass = oldClass || {};
        for (let i = 0; i < oldStaticClassNames.length; i++) {
            const oldClsName = oldStaticClassNames[i];
            oldClass[oldClsName] = true;
        }
    }
    if (staticklassNames) {
        klass = klass || {};
        for (let i = 0; i < staticklassNames.length; i++) {
            const clsName = staticklassNames[i];
            klass[clsName] = true;
        }
    }
    if (!oldClass && !klass)
        return;
    if (oldClass === klass)
        return;
    oldClass = oldClass || {};
    klass = klass || {};
    for (name in oldClass) {
        if (oldClass[name] &&
            !Object.prototype.hasOwnProperty.call(klass, name)) {
            // was `true` and now not provided
            elm.classList.remove(name);
        }
    }
    for (name in klass) {
        cur = klass[name];
        if (cur !== oldClass[name]) {
            if (name.includes(' ')) {
                let clsNames = name.split(' ');
                for (let i = 0; i < clsNames.length; i++) {
                    const clsName = clsNames[i];
                    elm.classList[cur ? 'add' : 'remove'](clsName);
                }
            }
            else {
                elm.classList[cur ? 'add' : 'remove'](name);
            }
        }
    }
}
export const classModule = { create: updateClass, update: updateClass };
