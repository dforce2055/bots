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
var routes_exports = {};
__export(routes_exports, {
  loadApiEndpoints: () => loadApiEndpoints
});
module.exports = __toCommonJS(routes_exports);
var import_controllers = require("../controllers");
var import_middlewares = require("../middlewares");
const loadApiEndpoints = (app) => {
  app.get("/api/v1/data", import_middlewares.requestTimestamp, import_controllers.DataControllerInstance.getDummyData);
  app.get("/api/v1/ping", import_middlewares.requestTimestamp, import_controllers.PingControllerInstance.getMessage);
  app.get("/api/v1/ping/:id", import_middlewares.requestTimestamp, import_controllers.PingControllerInstance.getById);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  loadApiEndpoints
});
//# sourceMappingURL=index.js.map
