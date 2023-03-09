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
var database_exports = {};
__export(database_exports, {
  DataBase: () => DataBase
});
module.exports = __toCommonJS(database_exports);
var dotenv = __toESM(require("dotenv"));
dotenv.config();
const { MongoStore } = require("wwebjs-mongo");
const mongoose = require("mongoose");
class DataBase {
  #mongoose;
  constructor(mongooseStore, mongoose2) {
    this.mongooseStore = mongooseStore;
    this.#mongoose = mongoose2;
  }
  static async start() {
    try {
      mongoose.set("strictQuery", false);
      await mongoose.connect(process.env["MONGO_URI"], {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("Data Base connection successful");
      const mongooseStore = await new MongoStore({ mongoose });
      return new DataBase(mongooseStore, mongoose);
    } catch (err) {
      console.error("Data Base connection error");
      console.log(err);
    }
  }
  async getMongooseStore() {
    return this.mongooseStore;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DataBase
});
//# sourceMappingURL=database.js.map
