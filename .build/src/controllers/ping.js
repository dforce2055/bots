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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var ping_exports = {};
__export(ping_exports, {
  PingController: () => PingController,
  PingControllerInstance: () => PingControllerInstance,
  getById: () => getById,
  getMessage: () => getMessage
});
module.exports = __toCommonJS(ping_exports);
var import_tsoa = require("tsoa");
let PingController = class {
  async getById(id) {
    return {
      message: `pong id ${id}`
    };
  }
  async getMessage() {
    return {
      message: "pong"
    };
  }
};
__decorateClass([
  (0, import_tsoa.Get)("{id}")
], PingController.prototype, "getById", 1);
__decorateClass([
  (0, import_tsoa.Get)("/")
], PingController.prototype, "getMessage", 1);
PingController = __decorateClass([
  (0, import_tsoa.Route)("/api/v1/ping")
], PingController);
const getById = async (req, res) => {
  const { id } = req.params ?? "1";
  if (!id)
    return res.status(400).send({
      message: "id is required"
    });
  const controller = new PingController();
  const response = await controller.getById(id);
  return res.send(response);
};
const getMessage = async (req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
};
const PingControllerInstance = {
  getMessage,
  getById
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PingController,
  PingControllerInstance,
  getById,
  getMessage
});
//# sourceMappingURL=ping.js.map
