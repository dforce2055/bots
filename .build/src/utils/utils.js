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
var utils_exports = {};
__export(utils_exports, {
  appendNewChat: () => appendNewChat,
  getDolarBluePrice: () => getDolarBluePrice,
  saveChat: () => saveChat
});
module.exports = __toCommonJS(utils_exports);
var import_axios = __toESM(require("axios"));
var import_models = require("../models");
var import_types = require("../@types");
const { writeJson, readJson } = require("fs-extra");
const getDolarBluePrice = async () => {
  try {
    const { JWT_DOLAR_BLUE } = process.env;
    const config = {
      method: "get",
      url: "https://www.safetime.com.ar/api/dolar/currentprice",
      headers: {
        "Authorization": `Bearer ${JWT_DOLAR_BLUE}`
      }
    };
    const response = await (0, import_axios.default)(config);
    const { data } = response;
    const { price } = data;
    return price;
  } catch (error) {
    console.log(error);
    return 0;
  }
};
const appendNewChat = async ({ path, chat, filename }) => {
  try {
    path = path || `./public/data/${filename}.json`;
    const dataReaded = await readJson(path);
    const data = [...dataReaded, chat];
    await writeJson(path, data);
    console.log("Data written successfully!");
  } catch (error) {
    console.log(error);
  }
};
const saveChat = async ({ chat, type, botInfo }) => {
  try {
    if (type === import_types.CHAT_TYPE.TELEGRAM)
      await import_models.TelegramChat.create({
        bot_info: botInfo,
        ...chat
      });
    if (type === import_types.CHAT_TYPE.WHATSAPP) {
      const { _data, ...newChat } = chat;
      await import_models.WhatsAppChat.create({
        bot_info: botInfo,
        ...chat
      });
    }
    console.log("Data save successfully!");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  appendNewChat,
  getDolarBluePrice,
  saveChat
});
//# sourceMappingURL=utils.js.map
