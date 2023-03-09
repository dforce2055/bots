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
var WhatsAppChat_exports = {};
__export(WhatsAppChat_exports, {
  WhatsAppChat: () => WhatsAppChat
});
module.exports = __toCommonJS(WhatsAppChat_exports);
var import_mongoose = require("mongoose");
const IDSchema = new import_mongoose.Schema({
  fromMe: { type: Boolean, required: false },
  remote: { type: String, required: false },
  id: { type: String, required: false },
  _serialized: { type: String, required: false }
});
const WhatssAppChatSchema = new import_mongoose.Schema({
  id: IDSchema,
  ack: { type: Number, required: false },
  hasMedia: { type: Boolean, required: false },
  body: { type: String, required: false },
  type: { type: String, required: false },
  timestamp: { type: Number, required: false },
  from: { type: String, required: false },
  to: { type: String, required: false },
  deviceType: { type: String, required: false },
  isForwarded: { type: Boolean, required: false },
  forwardingScore: { type: Number, required: false },
  isStatus: { type: Boolean, required: false },
  isStarred: { type: Boolean, required: false },
  broadcast: { type: Boolean, required: false },
  fromMe: { type: Boolean, required: false },
  hasQuotedMsg: { type: Boolean, required: false },
  vCards: [
    { type: Array, required: false }
  ],
  mentionedIds: [
    { type: Array, required: false }
  ],
  isGif: { type: Boolean, required: false },
  isEphemeral: { type: Boolean, required: false },
  links: [
    { type: Array, required: false }
  ]
});
const WhatsAppChat = (0, import_mongoose.model)("WhatsAppChat", WhatssAppChatSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WhatsAppChat
});
//# sourceMappingURL=WhatsAppChat.js.map
