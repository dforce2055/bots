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
var app_exports = {};
__export(app_exports, {
  default: () => app_default
});
module.exports = __toCommonJS(app_exports);
var import_express = __toESM(require("express"));
var import_path = __toESM(require("path"));
var dotenv = __toESM(require("dotenv"));
var import_morgan = __toESM(require("morgan"));
var import_database = require("./db/database");
var import_bots = require("./controllers/bots");
var import_routes = require("./routes");
var import_swagger_ui_express = __toESM(require("swagger-ui-express"));
var import_cors = __toESM(require("cors"));
dotenv.config();
const { TELEGRAM_TOKEN, TELEGRAM_TOKEN2 } = process.env;
const app = (0, import_express.default)();
const loggerConfig = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]';
app.set("env", process.env.NODE_ENV || "development");
app.set("port", process.env.PORT || 3e3);
app.use(import_express.default.json());
app.use(import_express.default.urlencoded({ extended: true }));
app.use((0, import_cors.default)());
app.use((0, import_morgan.default)(loggerConfig));
app.use(
  import_express.default.static(
    import_path.default.join(__dirname, "../public"),
    { maxAge: 315576e5 }
  )
);
app.use(
  "/api/v1/docs",
  import_swagger_ui_express.default.serve,
  import_swagger_ui_express.default.setup(void 0, {
    swaggerOptions: {
      url: "/swagger.json"
    }
  })
);
(0, import_routes.loadApiEndpoints)(app);
import_database.DataBase.start().then(async (dbInstance) => {
  await (0, import_bots.startBots)(app, dbInstance);
});
var app_default = app;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=app.js.map
