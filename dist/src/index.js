"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var PORT = 3000;
console.log('qweZXC');
app.get("/", function (req, res) {
    res.send("Application works!");
});
app.listen(PORT, function () {
    console.log("Application started on port 3000!");
});
