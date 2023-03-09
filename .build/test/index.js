"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_node_test = __toESM(require("node:test"));
var import_strict = __toESM(require("assert/strict"));
var import_node_test2 = require("node:test");
(0, import_node_test2.describe)("Dummy Tests", () => {
  (0, import_node_test.default)("synchronous passing test", (t) => {
    import_strict.default.strictEqual(1, 1);
  });
  (0, import_node_test.default)("Fetch asynchronous test", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const json = await response.json();
    import_strict.default.equal(json.name, "Leanne Graham");
  });
});
//# sourceMappingURL=index.js.map
