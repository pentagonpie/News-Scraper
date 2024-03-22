"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = exports.liked = void 0;
const tokenizer_1 = require("./tokenizer");
var liked;
(function (liked) {
    liked["yes"] = "yes";
    liked["no"] = "no";
    liked["undecided"] = "undecided";
})(liked || (exports.liked = liked = {}));
class Page {
    //Create new news page
    //constructor(title: string, link: string);
    //Constructor overload, create a page from an old page
    constructor(title, link, words, decision) {
        this.title = title;
        this.link = link;
        if (words) {
            this.words = words;
        }
        else {
            this.words = tokenizer_1.tokenizer.tokenize(title);
            try {
                const urlString = link;
                const url = new URL(urlString);
                const siteName = url.hostname; // 'www.example.com'
                this.words.push(siteName);
            }
            catch (error) {
                console.log("error on this link");
            }
        }
        if (decision) {
            this.decision = decision;
        }
        else {
            this.decision = liked.undecided;
        }
        this.score = 0;
    }
    asString() {
        return this.title + "\n" + this.link;
    }
    setScore(score) {
        this.score = score;
    }
    getScore() {
        return this.score;
    }
    getScoreString() {
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
exports.Page = Page;
