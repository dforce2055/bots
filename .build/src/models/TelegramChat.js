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
var TelegramChat_exports = {};
__export(TelegramChat_exports, {
  TelegramChat: () => TelegramChat
});
module.exports = __toCommonJS(TelegramChat_exports);
var import_mongoose = require("mongoose");
const BotInfoSchema = new import_mongoose.Schema({
  id: { type: Number, required: false },
  client_id: { type: Number, required: false },
  is_bot: { type: Boolean, required: false },
  first_name: { type: String, required: false },
  username: { type: String, required: false },
  can_read_all_group_messages: { type: Boolean, required: false },
  supports_inline_queries: { type: Boolean, required: false }
});
const ChatSchema = new import_mongoose.Schema({
  id: { type: Number, required: false },
  first_name: { type: String, required: false },
  username: { type: String, required: false },
  type: { type: String, required: false }
});
const EntitySchema = new import_mongoose.Schema({
  offset: { type: Number, required: false },
  length: { type: Number, required: false },
  type: { type: String, required: false }
});
const FromSchema = new import_mongoose.Schema({
  id: { type: Number, required: false },
  is_bot: { type: Boolean, required: false },
  first_name: { type: String, required: false },
  username: { type: String, required: false },
  language_code: { type: String, required: false }
});
const telegramChatSchema = new import_mongoose.Schema({
  bot_info: BotInfoSchema,
  message_id: { type: Number, required: false },
  from: FromSchema,
  chat: ChatSchema,
  date: { type: Number, required: false },
  text: { type: String, required: false },
  entities: [EntitySchema]
});
const TelegramChat = (0, import_mongoose.model)("TelegramChat", telegramChatSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TelegramChat
});
//# sourceMappingURL=TelegramChat.js.map
