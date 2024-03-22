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
exports.scraper = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const page_1 = require("./page");
class scraper {
    constructor() { }
    scrapeSite(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(url);
            const html = response.data;
            const $ = cheerio_1.default.load(html);
            const title1 = $('.mergedtoprow td:contains(title) + span').text().trim();
            const titles = $('.title .titleline a').map((index, element) => {
                const titleText = $(element).clone().children().remove().end().text().trim();
                return titleText;
            }).get();
            const links = $('.titleline a:first-of-type').map((index, element) => {
                return $(element).attr('href');
            }).get();
            let pages = [];
            //Check if valid link exists, and title not empty, then add new page to list
            for (let i = 0; i < titles.length; i++) {
                if (links[i].startsWith("http") && titles[i].length != 0) {
                    pages.push(new page_1.Page(titles[i], links[i]));
                }
            }
            return pages;
        });
    }
    static csvFormat(pages) {
        let result = [];
        for (let page of pages) {
            let single = {};
        }
    }
}
exports.scraper = scraper;
