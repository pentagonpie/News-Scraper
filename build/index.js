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
Object.defineProperty(exports, "__esModule", { value: true });
const scraper_1 = require("./scraper");
const csv_parse_1 = require("csv-parse");
const page_1 = require("./page");
const page_2 = require("./page");
const Prefrence_1 = require("./Prefrence");
const rater_1 = require("./rater");
const rankPages_1 = require("./rankPages");
const constants_1 = require("./constants");
const constants_2 = require("./constants");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const myscraper = new scraper_1.scraper();
        const { Command } = require("commander");
        const figlet = require("figlet");
        const program = new Command();
        console.log(figlet.textSync("News recommender"));
        program
            .version("1.0.0")
            .description("Hackernews based recommendation engine")
            .option("-n", "show todays news")
            .option("-o", "show old news")
            .option("-l, --like <value>", "like an article")
            .parse(process.argv);
        const options = program.opts();
        //Rate an article as liked
        if (options.like) {
            handleLike(options.like, myscraper);
            // console.log("got: ", options.like);
        }
        //Show old news that got saved to file
        if (options.o) {
            console.log("Old news:");
            getOldNews()
                .then((pages) => {
                let x = 1;
                for (let page of pages) {
                    console.log(x, ": ", page.asString());
                    console.log();
                    x++;
                }
            })
                .catch((err) => {
                console.error('Error getting old news:', err);
            });
        }
        if (options.n) {
            console.log("current news:");
            getNewNews(myscraper);
        }
    });
}
function getNewNews(scraper) {
    return __awaiter(this, void 0, void 0, function* () {
        let pages = yield scraper.scrapeSite("https://news.ycombinator.com/");
        let x = 1;
        let foo;
        getPrefrences()
            .then((prefrences) => {
            for (let page of pages) {
                page.setScore(rater_1.rater.rate(page.title, prefrences));
            }
            pages = rankPages_1.rankPages.rank(pages);
            foo = 5;
            const createCsvWriter = require('csv-writer').createObjectCsvWriter;
            const csvWriter = createCsvWriter({
                path: constants_2.NEWS_PATH,
                header: [
                    { id: 'title', title: 'Title' },
                    { id: 'link', title: 'Link' },
                    { id: 'words', title: 'Words' },
                    { id: 'decision', title: 'Decision' },
                ]
            });
            console.log(foo);
            csvWriter
                .writeRecords(pages)
                .then(() => console.log('The news file was written successfully'));
        })
            .catch((err) => {
            console.error('Error getting prefrences:', err);
        });
    });
}
function writePrefrence(scraper, prefrence, prefrences) {
    if (prefrence.itemInList(prefrences)) {
        console.log("This prefrence already exists");
        return;
    }
    prefrences.push(prefrence);
    const fs = require("fs");
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
        path: constants_1.PREFRENCES_PATH,
        header: [
            { id: 'words', title: 'Words' },
            { id: 'decision', title: 'Decision' },
        ]
    });
    csvWriter
        .writeRecords(prefrences)
        .then(() => console.log("The prefrence file with words\n", prefrence.getWords(), "\nwas written successfully"));
}
function getPrefrences() {
    const fs = require("fs");
    return new Promise((resolve, reject) => {
        let prefrences = [];
        const parseStream = (0, csv_parse_1.parse)({ columns: true }, (err, records) => {
            if (err) {
                console.error('Error parsing CSV in getPrefrences:', err);
                reject(err);
                return;
            }
            for (let onePrefrence of records) {
                prefrences.push(new Prefrence_1.Prefrence(onePrefrence.Decision, onePrefrence.Words));
            }
            //console.log('Parsed CSV records:', records);
            resolve(prefrences);
        });
        fs.createReadStream(constants_1.PREFRENCES_PATH)
            .pipe(parseStream);
    });
}
function getOldNews() {
    const fs = require("fs");
    return new Promise((resolve, reject) => {
        let pages = [];
        const parseStream = (0, csv_parse_1.parse)({ columns: true }, (err, records) => {
            if (err) {
                console.error('Error parsing CSV:', err);
                reject(err);
                return;
            }
            for (let oneNews of records) {
                pages.push(new page_1.Page(oneNews.Title, oneNews.Link, oneNews.Words, oneNews.Decision));
            }
            //console.log('Parsed CSV records:', records);
            resolve(pages);
        });
        fs.createReadStream(constants_2.NEWS_PATH)
            .pipe(parseStream);
    });
}
function handleLike(index, scraper) {
    let oldNews = [];
    getOldNews()
        .then((pages) => {
        let newprefrence = new Prefrence_1.Prefrence(page_2.liked.yes, [], pages, index - 1);
        return newprefrence;
    }).then((newprefrence) => getPrefrences().then((prefrences) => (writePrefrence(scraper, newprefrence, prefrences)))
        .catch((err) => {
        console.error('Error getting old news:', err);
    }));
}
main();
