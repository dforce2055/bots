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
var whatsapp_bot_exports = {};
__export(whatsapp_bot_exports, {
  WhatssAppBot: () => WhatssAppBot
});
module.exports = __toCommonJS(whatsapp_bot_exports);
var import_whatsapp_web = require("whatsapp-web.js");
var qrcode = __toESM(require("qrcode-terminal"));
var import_utils = require("./utils");
var import_types = require("../@types");
class WhatssAppBot {
  constructor({ store, clientId }) {
    this.clientId = clientId || "5492254620036";
    this.bot = new import_whatsapp_web.Client({
      authStrategy: new import_whatsapp_web.RemoteAuth({
        clientId,
        store,
        backupSyncIntervalMs: 6e4
      })
    });
  }
  async start() {
    var _a;
    this.bot.on("qr", (qr) => {
      qrcode.generate(qr, { small: true });
    });
    this.bot.on("authenticated", async (session) => {
      console.log("Saving session...");
    });
    this.bot.on("remote_session_saved", () => {
      console.log("Remote session saved!!!");
    });
    this.bot.on("ready", async () => {
      var _a2;
      console.log("Client is ready!");
      const chatId = this.clientId + "@c.us";
      await ((_a2 = this.bot) == null ? void 0 : _a2.sendMessage(chatId, "\xA1Bot ACTIVO!\u{1F9BE}\u{1F916}"));
    });
    this.bot.on("message", async (message) => {
      var _a2;
      await (0, import_utils.saveChat)({
        chat: message,
        type: import_types.CHAT_TYPE.WHATSAPP
      });
      if (message.body === "!ping")
        message.reply("pong");
      if (message.body.toLowerCase() === "hola")
        (_a2 = this.bot) == null ? void 0 : _a2.sendMessage(message.from, "Hola soy un Bot!\u{1F9BE}\u{1F916}");
    });
    await ((_a = this.bot) == null ? void 0 : _a.initialize());
  }
  async getClient() {
    return this.client;
  }
  async sendMessage({ clientId, message }) {
    var _a;
    if (!message || !clientId)
      return "Invalid message or clientId";
    const chatId = clientId + "@c.us";
    return await ((_a = this.client) == null ? void 0 : _a.sendMessage(chatId, message));
  }
  async getContacts() {
    var _a;
    if (!this.contacts)
      this.contacts = await ((_a = this.client) == null ? void 0 : _a.getContacts());
    return this.contacts || [];
  }
  async getBusinessContacts() {
    var _a, _b;
    if (!this.contacts)
      this.contacts = await ((_a = this.client) == null ? void 0 : _a.getContacts());
    const businessContacts = (_b = this.contacts) == null ? void 0 : _b.filter((contact) => contact.isBusiness);
    return businessContacts || [];
  }
  async getBlockedContacts() {
    var _a, _b;
    if (!this.contacts)
      this.contacts = await ((_a = this.client) == null ? void 0 : _a.getContacts());
    const blockedContacts = (_b = this.contacts) == null ? void 0 : _b.filter((contact) => contact.isBlocked);
    return blockedContacts || [];
  }
  async getFilteredContacsByName(name) {
    var _a, _b;
    if (!this.contacts)
      this.contacts = await ((_a = this.client) == null ? void 0 : _a.getContacts());
    const contacts = (_b = this.contacts) == null ? void 0 : _b.filter((contact) => {
      var _a2;
      return (_a2 = contact.name) == null ? void 0 : _a2.includes(name);
    });
    return contacts || [];
  }
  async getChats() {
    var _a;
    if (!this.chats)
      this.chats = await ((_a = this.client) == null ? void 0 : _a.getChats());
    return this.chats || [];
  }
  async logout() {
    var _a;
    return (_a = this.client) == null ? void 0 : _a.logout();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WhatssAppBot
});
//# sourceMappingURL=whatsapp.bot.js.map
