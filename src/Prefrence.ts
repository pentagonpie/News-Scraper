import { liked } from './page';
import { error } from 'console';
import { Page } from './page';

export class Prefrence {
    words: string[] = [];
    decision: liked;

    constructor();
    constructor(decision: liked, words: string[]);
    constructor(decision: liked, words: string[], news: Page[], index: number);
    constructor(decision?: liked, words?: string[], news?: Page[], index?: number) {
        //Constructor for loading an existing prefrence
        if (arguments.length == 2) {
            this.decision = decision == null ? liked.undecided : decision;
            this.words = words == null ? [] : words;
        }
        //Constructor for creating a new prefrence
        else {
            if (index == null) {
                throw error("in prefrence index is null");
            }
            if (news == null) {
                throw error("in prefrence news is null");
            }
            if (decision == null) {
                throw error("in decision news is null");
            }
            this.decision = decision;
            //console.log(" news in prefrence constructor ", news);
            if (index < news.length) {
                this.words = news[index].getWords();

            } else {
                throw new Error('index out of range of news amount');
            }

        }

    }

    itemInList(list: Prefrence[]): boolean {
        for (let pref of list) {
            if (pref.words === this.words) {
                console.log();
                return true;
            }
        }
        return false;
    }
    getWords() {
        return this.words;
    }

}