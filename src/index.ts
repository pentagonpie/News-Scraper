import { scraper } from './scraper';
import { parse } from 'csv-parse';
import { Page } from './page';
import { liked } from './page';
import { Prefrence } from "./Prefrence";
import { rater } from "./rater";
import { rankPages } from "./rankPages";
import { PREFRENCES_PATH } from './constants';
import { NEWS_PATH } from './constants';

async function main() {
    const myscraper = new scraper();
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

}

async function getNewNews(scraper: scraper) {
    let pages = await scraper.scrapeSite("https://news.ycombinator.com/");

    let x = 1;
    let foo: number;

    getPrefrences()
        .then((prefrences) => {
            for (let page of pages) {
                page.setScore(rater.rate(page.title, prefrences));
            }
            pages = rankPages.rank(pages);
            foo = 5;


            const createCsvWriter = require('csv-writer').createObjectCsvWriter;
            const csvWriter = createCsvWriter({
                path: NEWS_PATH,
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


}



function writePrefrence(scraper: scraper, prefrence: Prefrence, prefrences: Prefrence[]) {
    if (prefrence.itemInList(prefrences)) {
        console.log("This prefrence already exists");
        return;
    }
    prefrences.push(prefrence);

    const fs = require("fs");
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
        path: PREFRENCES_PATH,
        header: [
            { id: 'words', title: 'Words' },
            { id: 'decision', title: 'Decision' },
        ]
    });

    csvWriter
        .writeRecords(prefrences)
        .then(() =>
            console.log("The prefrence file with words\n", prefrence.getWords(), "\nwas written successfully")
        );
}

function getPrefrences(): Promise<Prefrence[]> {

    const fs = require("fs");

    return new Promise((resolve, reject) => {
        let prefrences: Prefrence[] = [];

        const parseStream = parse({ columns: true }, (err, records) => {
            if (err) {
                console.error('Error parsing CSV in getPrefrences:', err);
                reject(err);
                return;
            }

            for (let onePrefrence of records) {
                prefrences.push(new Prefrence(onePrefrence.Decision, onePrefrence.Words));
            }

            //console.log('Parsed CSV records:', records);
            resolve(prefrences);
        });

        fs.createReadStream(PREFRENCES_PATH)
            .pipe(parseStream);
    });

}

function getOldNews(): Promise<Page[]> {

    const fs = require("fs");

    return new Promise((resolve, reject) => {
        let pages: Page[] = [];

        const parseStream = parse({ columns: true }, (err, records) => {
            if (err) {
                console.error('Error parsing CSV:', err);
                reject(err);
                return;
            }


            for (let oneNews of records) {
                pages.push(new Page(oneNews.Title, oneNews.Link, oneNews.Words, oneNews.Decision));
            }

            //console.log('Parsed CSV records:', records);
            resolve(pages);
        });

        fs.createReadStream(NEWS_PATH)
            .pipe(parseStream);
    });
}



function handleLike(index: number, scraper: scraper) {
    let oldNews: Page[] = [];

    getOldNews()
        .then((pages) => {
            let newprefrence = new Prefrence(liked.yes, [], pages, index - 1);

            return newprefrence;


        }).then((newprefrence) => getPrefrences().then((prefrences) => (writePrefrence(scraper, newprefrence, prefrences)))
            .catch((err) => {
                console.error('Error getting old news:', err);
            }));





}

main();
