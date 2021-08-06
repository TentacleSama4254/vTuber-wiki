"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.wiki = void 0;
var hermitpurple_1 = require("hermitpurple");
var axios_1 = require("axios");
var wiki = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var obj, wikia, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                obj = {};
                wikia = new hermitpurple_1["default"]("virtualyoutuber", 1);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, wikia.search(data).then(function (a) { return __awaiter(void 0, void 0, void 0, function () {
                        var id, img;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, a
                                    //console.log(a[0])
                                ];
                                case 1:
                                    _a.sent();
                                    id = Number(a[0].id);
                                    img = a[0].img;
                                    return [4 /*yield*/, axios_1["default"]("https://virtualyoutuber.fandom.com/api.php?action=query&prop=revisions&pageids=" + id + "&rvprop=content&format=json").then(function (rp) { return __awaiter(void 0, void 0, void 0, function () {
                                            var data, s1, s2, s3, s4, s5, s6, s7, _i, s5_1, key, e1, e2;
                                            return __generator(this, function (_a) {
                                                data = rp.data.query.pages[id].revisions[0]['*'];
                                                s1 = data.split('{{');
                                                s2 = s1.filter(function (m) { return m.includes('channel'); });
                                                s3 = s2[0].split('|');
                                                s4 = s3.filter(function (m) { return m.includes('='); });
                                                s5 = s4.filter(function (m) { return !m.includes('}}') && !m.includes('=='); });
                                                s6 = data.split('\n');
                                                s7 = s6.filter(function (m) { return !m.includes('}}') && !m.includes('==') && !m.includes('=') && m.includes("'''"); });
                                                s5.push("description  = " + s7[0].replace(" '''", '* ').replace("'''", '*'));
                                                s5.push("image_url  = " + img);
                                                s5.push("more  = " + a[0].url);
                                                for (_i = 0, s5_1 = s5; _i < s5_1.length; _i++) {
                                                    key = s5_1[_i];
                                                    e1 = [key][0].split('=');
                                                    e2 = e1[0].trim();
                                                    obj[e2] = e1[1].replace("\n", '').replace('[', '').replace(']', '').replace('\n', '').trim();
                                                }
                                                //console.log(obj)
                                                return [2 /*return*/, obj];
                                            });
                                        }); })];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log("vTuber not Found");
                obj = null;
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, obj];
        }
    });
}); };
exports.wiki = wiki;
