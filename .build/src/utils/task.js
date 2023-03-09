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
var task_exports = {};
__export(task_exports, {
  Task: () => Task
});
module.exports = __toCommonJS(task_exports);
var import_node_cron = __toESM(require("node-cron"));
var import_cronstrue = __toESM(require("cronstrue"));
class Task {
  constructor({ expression, action, options }) {
    this.name = (options == null ? void 0 : options.name) || "task" + new Date().getTime();
    this.expression = expression;
    this.frequency = import_cronstrue.default.toString(this.expression);
    this.action = action;
    this.options = options || {};
    this.instance = this.getTaskInstance();
    this.executions = 0;
  }
  getExpression() {
    return this.expression;
  }
  getFrequency() {
    return this.frequency;
  }
  getAction() {
    return this.action;
  }
  getOptions() {
    return this.options;
  }
  getExecutions() {
    return this.executions;
  }
  getTaskInstance() {
    if (!import_node_cron.default.validate(this.expression)) {
      console.error("Invalid expression", this.expression);
      return void 0;
    }
    if (!this.instance) {
      const actionAndLogger = () => {
        this.action();
        this.executions++;
        console.log("\u2705 Running: ", this.executions);
      };
      this.instance = import_node_cron.default.schedule(this.expression, actionAndLogger, this.options);
    }
    return this.instance;
  }
  start() {
    var _a;
    console.log("\u{1F7E2} Starting task \u{1F4C5}: ", this.name);
    (_a = this.instance) == null ? void 0 : _a.start();
  }
  stop() {
    var _a;
    console.log("\u{1F534} Stopping task \u{1F4C5}: ", this.name);
    (_a = this.instance) == null ? void 0 : _a.stop();
  }
  printFrequency() {
    console.log("Frequency \u{1FAA7}: ", this.frequency);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Task
});
//# sourceMappingURL=task.js.map
