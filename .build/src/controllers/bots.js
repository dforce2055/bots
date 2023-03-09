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
var bots_exports = {};
__export(bots_exports, {
  startBots: () => startBots
});
module.exports = __toCommonJS(bots_exports);
var import_database = require("../db/database");
var import_utils = require("../utils");
var import_models = require("../models");
const {
  TELEGRAM_TOKEN,
  TELEGRAM_TOKEN2,
  PHONE,
  PHONE2
} = process.env;
const addCustomers = async () => {
  try {
    const customer = new import_models.Customer({
      name: "Bigote",
      email: "deperez2055@gmail.com",
      phone: PHONE,
      telegram_bot_client_id: TELEGRAM_TOKEN,
      whatsapp_bot_client_id: PHONE
    });
    const customer2 = new import_models.Customer({
      name: "Open House Padel Pinamar",
      email: "openhouse@gmail.com",
      phone: PHONE2,
      telegram_bot_client_id: TELEGRAM_TOKEN2,
      whatsapp_bot_client_id: PHONE2
    });
    await customer.save();
    await customer2.save();
    console.log("\u{1F7E2} Customers added to Data Base!");
  } catch (error) {
    console.log("\u{1F7E2} Customers already in Data Base!");
  }
};
const startBots = async (app, dbInstance) => {
  const db = dbInstance || await import_database.DataBase.start();
  app.set("db", db);
  const telegramBot = new import_utils.TelegramBot({
    clientId: TELEGRAM_TOKEN || ""
  });
  telegramBot.start();
  const telegramBot2 = new import_utils.TelegramBot({
    clientId: TELEGRAM_TOKEN2 || ""
  });
  telegramBot2.start();
  console.log("\u{1F7E2} Telegram Bots are ready!");
  const store = await (db == null ? void 0 : db.getMongooseStore());
  const whatsAppBot = new import_utils.WhatssAppBot({
    store,
    clientId: "5492254620036"
  });
  await whatsAppBot.start();
  console.log("\u{1F7E2} WhatsApp Bots are ready!");
  const action = async () => {
    whatsAppBot.sendMessage({ clientId: "5492254620036", message: "Hola Bigote! " + new Date().toISOString() });
    await telegramBot.sendMessage({
      chatId: "1266264139",
      message: "Hola Bigote! " + new Date().toISOString()
    });
  };
  const task = new import_utils.Task({
    expression: "* * * * * *",
    action,
    options: {
      name: "test-task-1",
      scheduled: false,
      timeZone: "America/Argentina/Buenos_Aires"
    }
  });
  task.printFrequency();
  task.start();
  setTimeout(() => {
    task == null ? void 0 : task.stop();
  }, 2e3);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  startBots
});
//# sourceMappingURL=bots.js.map
