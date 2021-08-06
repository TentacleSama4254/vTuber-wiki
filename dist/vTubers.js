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
    let obj = {};
    const wikia = new HermitPurple("virtualyoutuber", 1); // fandom, search limit
    try {
        yield wikia.search(data).then((a) => __awaiter(void 0, void 0, void 0, function* () {
            yield a;
            //console.log(a[0])
            let id = Number(a[0].id);
            let img = a[0].img;
            yield axios_1.default(`https://virtualyoutuber.fandom.com/api.php?action=query&prop=revisions&pageids=${id}&rvprop=content&format=json`).then((rp) => __awaiter(void 0, void 0, void 0, function* () {
                var data = rp.data.query.pages[id].revisions[0]['*'];
                //console.log(data)
                var s1 = data.split('{{');
                //console.log(s1)
                var s2 = s1.filter((m) => m.includes('channel'));
                //console.log(s2)
                var s3 = s2[0].split('|');
                var s4 = s3.filter((m) => m.includes('='));
                //console.log(s4)
                var s5 = s4.filter((m) => !m.includes('}}') && !m.includes('=='));
                //console.log(s5)
                var s6 = data.split('\n');
                var s7 = s6.filter((m) => !m.includes('}}') && !m.includes('==') && !m.includes('=') && m.includes(`'''`));
                s5.push(`description  = ${s7[0].replace(` '''`, '* ').replace(`'''`, '*')}`);
                s5.push(`image_url  = ${img}`);
                s5.push(`more  = ${a[0].url}`);
                for (const key of s5) {
                    var e1 = [key][0].split('=');
                    var e2 = e1[0].trim();
                    obj[e2] = e1[1].replace(`\n`, '').replace('[', '').replace(']', '').replace('\n', '').trim();
                }
                //console.log(obj)
                return obj;
            }));
        }));
    }
    catch (err) {
        console.log("vTuber not Found");
        obj = null;
    }
    return obj;
});
exports.wiki = wiki;
//# sourceMappingURL=vTubers.js.map