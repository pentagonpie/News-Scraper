import { Page } from "./page";

export class rankPages {


    constructor() {


    }

    //Algorithm to get a list of pages with a score each and decide in what order
    //to show them
    static rank(pages: Page[]): Page[] {
        pages.sort((a, b) => {
            if (a.getScore() < b.getScore()) {
                return 1;
            }
            if (a.getScore() > b.getScore()) {
                return -1;
            }
            return 0;
        });

        let x = 1;
        for (let page of pages) {
            console.log(x, "(", page.getScore(), "): ", page.asString());
            console.log();
            x++;
        }

        return pages;




    }
}