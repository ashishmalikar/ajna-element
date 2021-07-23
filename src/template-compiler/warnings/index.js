/* eslint-disable no-unused-vars */
export function baseWarn (msg, range) {
  console.error(("[Ajna compiler]: " + msg));
}

export function warn (msg, range, tip) {
  (tip ? tips : errors).push(msg);
};