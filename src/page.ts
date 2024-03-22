
import { stringifier } from "csv/.";
import { tokenizer } from "./tokenizer";
export enum liked {
    yes = 'yes',
    no = 'no',
    undecided = 'undecided'
}

export class Page {

    title: string;
    link: string;
    words: string[];
    decision: liked;
    score: number;


    //Create new news page
    //constructor(title: string, link: string);

    //Constructor overload, create a page from an old page
    constructor(title: string, link: string, words?: string[], decision?: liked) {
        this.title = title;
        this.link = link;
        if (words) {
            this.words = words;
        } else {
            this.words = tokenizer.tokenize(title);

            try {
                const urlString = link;
                const url = new URL(urlString);
                const siteName = url.hostname; // 'www.example.com'
                this.words.push(siteName);


            } catch (error) {
                console.log("error on this link");

            }

        }

        if (decision) {
            this.decision = decision;
        } else {
            this.decision = liked.undecided;

        }
        this.score = 0;
    }

    asString(): string {
        return this.title + "\n" + this.link;
    }
    setScore(score: number) {
        this.score = score;
    }

    getScore(): number {
        return this.score;
    }
    getScoreString(): string {
        return this.score.toPrecision(2);
    }

    userLike() {
        this.decision = liked.yes;
    }

    getWords() {
        return this.words;
    }
    userDislike() {
        this.decision = liked.no;
    }


}