"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var testMiddleware_exports = {};
__export(testMiddleware_exports, {
  requestTimestamp: () => requestTimestamp
});
module.exports = __toCommonJS(testMiddleware_exports);
const requestTimestamp = (req, res, next) => {
  req.requestTimestamp = new Date().toISOString();
  res.on("finish", () => {
    console.log(req.method, decodeURI(req.url), res.statusCode, res.statusMessage, req.requestTimestamp);
  });
  next();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  requestTimestamp
});
//# sourceMappingURL=testMiddleware.js.map
