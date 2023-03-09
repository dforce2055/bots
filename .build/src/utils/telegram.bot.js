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
var telegram_bot_exports = {};
__export(telegram_bot_exports, {
  TelegramBot: () => TelegramBot
});
module.exports = __toCommonJS(telegram_bot_exports);
var import_axios = __toESM(require("axios"));
var import_index = require("./index");
var import_telegraf = require("telegraf");
var import_utils = require("./utils");
var import_models = require("../models");
var import_types = require("../@types");
const loggerMiddelware = () => async (ctx, next) => {
  const t = ctx.myProp;
  await (0, import_utils.saveChat)({
    botInfo: ctx.botInfo,
    chat: ctx.message,
    type: import_types.CHAT_TYPE.TELEGRAM
  });
  return next();
};
class TelegramBot {
  constructor({ clientId }) {
    this.clientId = clientId;
    this.token = clientId;
    this.TELEGRAM_API = `https://api.telegram.org/bot${this.token}`;
    this.bot = new import_telegraf.Telegraf(this.token);
    this.bot.use(import_telegraf.Telegraf.log());
  }
  async start() {
    const customer = await this._getCustomerByBootClientId(this.clientId);
    if (!customer) {
      console.log("No customer found or customer is inactive");
      return;
    }
    this.bot.use(loggerMiddelware());
    this.bot.start((ctx) => {
      const { startPayload } = ctx;
      if (startPayload)
        return ctx.reply(`Deep link payload: ${startPayload}`);
      ctx.reply("Welcome");
    });
    this.bot.help((ctx) => {
      ctx.reply("Send me a sticker");
    });
    this.bot.on("sticker", (ctx) => {
      ctx.reply("\u{1F44D}");
    });
    this.bot.hears("botonera", (ctx) => {
      const { from } = ctx;
      const chat = ctx.chat;
      ctx.reply(
        "Botones",
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "SI \u{1F60E}", callback_data: "my_fancy_event_1" }],
              [{ text: "NO \u{1F465}", callback_data: "my_fancy_event_2" }]
            ]
          }
        }
      );
    });
    this.bot.command("/botonera", async (ctx) => {
      return await ctx.reply(
        "Custom buttons keyboard",
        import_telegraf.Markup.keyboard([
          ["\u{1F50D} Search", "\u{1F60E} Popular"],
          ["\u2638 Setting", "\u{1F4DE} Feedback"],
          ["\u{1F4E2} Ads", "\u2B50\uFE0F Rate us", "\u{1F465} Share"]
        ]).oneTime().resize()
      );
    });
    this.bot.command("start", async (ctx) => {
      const message = `Bien, para comenzara a operar necesito ingreses tu token de acceso\u{1F511}.
      ingresa /token=TU_TOKEN_DE_ACCESO`;
      return await ctx.reply(message);
    });
    this.bot.command("hola", async (ctx) => {
      const { from } = ctx;
      const { first_name: firstName, username } = from;
      const message = `Hola ${firstName || username}, 
      soy un bot \u{1F916} trader, estoy en desarrollo. 
      \u{1F680} Pronto tendr\xE1s m\xE1s novedades...`;
      return await ctx.reply(message);
    });
    this.bot.command("token", async (ctx) => {
      const message = `\u{1F511} Ingresa tu token de acceso a la plataforma, deber\xEDa ser algo parecido a esto XXErgW222NohksffsadZrN2055PKxbl_bot.
      Si todav\xEDa no tenes tu token de accesso, registrate primero para obtenerlo.`;
      return await ctx.reply(message);
    });
    this.bot.command("sent", async (ctx) => {
      var _a;
      const { from, message } = ctx;
      const token = (_a = message == null ? void 0 : message.text) == null ? void 0 : _a.split("=")[1];
      const replyMessage = `\u{1F511} \u2705 \xA1Token recibido y validado! Ahora puedes comenzar a operar.`;
      return await ctx.reply(replyMessage);
    });
    this.bot.command("dolarblue", async (ctx) => {
      const price = await this.getDolarBluePrice();
      const message = `\u{1F4B5} Cotizaci\xF3n d\xF3lar blue en este momento: $ ${price}`;
      return await ctx.reply(message);
    });
    this.bot.launch();
    process.once("SIGINT", () => this.bot.stop("SIGINT"));
    process.once("SIGTERM", () => this.bot.stop("SIGTERM"));
  }
  async _getCustomerByBootClientId(botClientId) {
    if (!botClientId)
      return null;
    const customer = await import_models.Customer.findOne({
      telegram_bot_client_id: botClientId
    });
    return customer;
  }
  async sendMessage({ message, chatId }) {
    try {
      if (!chatId || !message)
        throw new Error("Invalid chatId or message");
      return await import_axios.default.post(`${this.TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: message,
        reply_markup: {
          inline_keyboard: [
            [{ text: "SI", callback_data: "my_fancy_event_1" }],
            [{ text: "NO", callback_data: "my_fancy_event_2" }]
          ]
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
  async getDolarBluePrice() {
    return await (0, import_index.getDolarBluePrice)();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TelegramBot
});
//# sourceMappingURL=telegram.bot.js.map
