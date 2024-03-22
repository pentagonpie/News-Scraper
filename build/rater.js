"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rater = void 0;
class rater {
    constructor() {
    }
    static rate(input, prefrences) {
        let best = 0;
        var natural = require('natural');
        //var tokenizer = new natural.WordTokenizer();
        let words = natural.PorterStemmer.tokenizeAndStem(input);
        for (let prefrence of prefrences) {
            let similarity = this.similar(words, prefrence);
            if (similarity > best) {
                best = similarity;
            }
        }
        return best;
    }
    static similar(input, words) {
        let matches = 0;
        let total = words.words.length;
        for (let word of input) {
            if (words.words.includes(word)) {
                matches++;
            }
        }
        return matches / total;
    }
}
exports.rater = rater;
