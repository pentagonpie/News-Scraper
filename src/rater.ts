import { Prefrence } from "./Prefrence";

export class rater {

    constructor() {


    }

    static rate(input: string, prefrences: Prefrence[]): number {
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



    static similar(input: string[], words: Prefrence): number {

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
