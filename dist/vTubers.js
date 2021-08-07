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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wiki = void 0;
const HermitPurple = require('hermitpurple').default;
const axios_1 = __importDefault(require("axios"));
const wiki = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const obj = {};
    const wikia = new HermitPurple('virtualyoutuber', 1); // fandom, search limit
    try {
        const a = yield wikia.search(data);
        const id = Number(a[0].id);
        const img = a[0].img;
        const { data: resp } = yield axios_1.default.get(`https://virtualyoutuber.fandom.com/api.php?action=query&prop=revisions&pageids=${id}&rvprop=content&format=json`);
        const resdata = resp.query.pages[id].revisions[0]['*'];
        const s = (_a = resdata
            .split('{{')) === null || _a === void 0 ? void 0 : _a.filter((m) => m.includes('channel'))[0].split('|').filter((m) => m.includes('='));
        const s2 = s.filter((m) => !m.includes('}}') && !m.includes('=='));
        s2.push(`description  = ${resdata
            .split('\n')
            .filter((m) => !m.includes('}}') && !m.includes('==') && !m.includes('=') && m.includes(`'''`))[0]
            .replace(` '''`, '* ')
            .replace(`'''`, '*')}`, `image_url  = ${img}`, `more  = ${a[0].url}`);
        for (const key of s2) {
            const e1 = [key][0].split('=');
            const e2 = e1[0].trim();
            obj[e2] = e1[1]
                .replace(`\n`, '')
                .replace('[', '')
                .replace(']', '')
                .replace('\n', '')
                .trim();
        }
        return obj;
    }
    catch (err) {
        return null;
    }
});
exports.wiki = wiki;
//# sourceMappingURL=vTubers.js.map