"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenizer = void 0;
class tokenizer {
    constructor() { }
    static tokenize(sentence) {
        var natural = require('natural');
        let words = natural.PorterStemmer.tokenizeAndStem(sentence);
        console.log("all words are ", words);
        console.log("for sentence: ", sentence);
        return this.clean(words);
    }
    static clean(words) {
        let conjunctions = ['after',
            'although',
            'though',
            'as',
            'much',
            'soon',
            'long',
            'because',
            'before',
            'how',
            'if',
            'order',
            'once',
            'since',
            'then',
            'than',
            'that',
            'though',
            'unless',
            'until',
            'when',
            'where',
            'whether',
            'while',
            'both',
            'not',
            'either',
            'neither',
            'no',
            'just',
            'for',
            'and',
            'nor',
            'but',
            'or',
            'yet',
            'after',
            'my',
            'on',
            'more',
            'a',
            'so'
        ];
        let size = words.length;
        let result = [];
        for (let i = 0; i < size; i++) {
            if (this.isWord(words[i]) && !conjunctions.includes(words[i])) {
                result.push(words[i]);
            }
            if (conjunctions.includes(words[i])) {
                console.log("skipping for word ", words[i]);
            }
        }
        return result;
    }
    static isWord(word) {
        // Regular expression to match any non-digit character
        const nonDigitRegex = /\D/;
        // If the string contains any non-digit character, return false
        return nonDigitRegex.test(word);
    }
}
exports.tokenizer = tokenizer;
