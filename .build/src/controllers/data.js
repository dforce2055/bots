"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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
var data_exports = {};
__export(data_exports, {
  DataController: () => DataController,
  DataControllerInstance: () => DataControllerInstance,
  getDummyData: () => getDummyData
});
module.exports = __toCommonJS(data_exports);
var import_tsoa = require("tsoa");
var import_dummy_data = __toESM(require("../../public/data/dummy.data.json"));
let DataController = class {
  async getDummyData() {
    return {
      message: "Here is the dummy data",
      data: import_dummy_data.default
    };
  }
};
__decorateClass([
  (0, import_tsoa.Get)("/")
], DataController.prototype, "getDummyData", 1);
DataController = __decorateClass([
  (0, import_tsoa.Route)("/api/v1/data")
], DataController);
const getDummyData = async (req, res) => {
  const controller = new DataController();
  const response = await controller.getDummyData();
  return res.send(response);
};
const DataControllerInstance = {
  getDummyData
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DataController,
  DataControllerInstance,
  getDummyData
});
//# sourceMappingURL=data.js.map
