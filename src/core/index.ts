import { AjnaDataMixin, AjnaElementMixin, AjnaPropsMixin } from './mixins/index';
import { reactiveMembraneMixin } from './mixins/reactive-membrane-mixin';

let baseElement: any = HTMLElement;

baseElement = AjnaElementMixin(baseElement);

// reactive membrane 
baseElement = reactiveMembraneMixin(baseElement);

baseElement = AjnaPropsMixin(baseElement);
baseElement = AjnaDataMixin(baseElement);


export const AjnaElement = baseElement;