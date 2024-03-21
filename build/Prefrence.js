"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prefrence = void 0;
const page_1 = require("./page");
const console_1 = require("console");
class Prefrence {
    constructor(decision, words, news, index) {
        this.words = [];
        //Constructor for loading an existing prefrence
        if (arguments.length == 2) {
            this.decision = decision == null ? page_1.liked.undecided : decision;
            this.words = words == null ? [] : words;
        }
        //Constructor for creating a new prefrence
        else {
            if (index == null) {
                throw (0, console_1.error)("in prefrence index is null");
            }
            if (news == null) {
                throw (0, console_1.error)("in prefrence news is null");
            }
            if (decision == null) {
                throw (0, console_1.error)("in decision news is null");
            }
            this.decision = decision;
            //console.log(" news in prefrence constructor ", news);
            if (index < news.length) {
                this.words = news[index].getWords();
            }
            else {
                throw new Error('index out of range of news amount');
            }
        }
    }
    itemInList(list) {
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
exports.Prefrence = Prefrence;
