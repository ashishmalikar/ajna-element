import { utils } from "./utils/index";
import { install } from './install';
function ajna() {
}
ajna.prototype.mixin = function () {
};
ajna.prototype.install = install;
ajna.prototype.utils = utils;
export const $Ajna = window['$Ajna'] = new ajna();
