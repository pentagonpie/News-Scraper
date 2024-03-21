import axios from 'axios';
import cheerio from 'cheerio';
import { Page } from "./page";

export class scraper {
    constructor() { }

    async scrapeSite(url: string) {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const title1 = $('.mergedtoprow td:contains(title) + span').text().trim();



        const titles = $('.title .titleline a').map((index, element) => {
            const titleText = $(element).clone().children().remove().end().text().trim();
            return titleText;
        }).get();

        const links = $('.titleline a:first-of-type').map((index, element) => {
            return $(element).attr('href');
        }).get();


        // console.log("all links: ", links);
        let pages: Page[] = [];

        //Check if valid link exists, and title not empty, then add new page to list
        for (let i = 0; i < titles.length; i++) {
            if (links[i].startsWith("http") && titles[i].length != 0) {
                pages.push(new Page(titles[i], links[i]));
            }
        }

        return pages;
    }


    static csvFormat(pages: Page[]) {
        let result = [];

        for (let page of pages) {
            let single = {};
            //single[title] = 
        }
    }

}