"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenizer = void 0;
class tokenizer {
    constructor() {
    }
    static tokenize(sentence) {
        var natural = require('natural');
        //console.log("trying to tokenize ", sentence);
        let words = natural.PorterStemmer.tokenizeAndStem(sentence);
        return this.clean(words);
    }
    static clean(words) {
        let size = words.length;
        let result = [];
        for (let i = 0; i < size; i++) {
            if (this.isUsfull(words[i])) {
                result.push(words[i]);
            }
        }
        return result;
    }
    static isUsfull(word) {
        // Regular expression to match any non-digit character
        const nonDigitRegex = /\D/;
        // If the string contains any non-digit character, return false
        return nonDigitRegex.test(word);
    }
}
exports.tokenizer = tokenizer;
