export class tokenizer {

    constructor() { }

    static tokenize(sentence: string): string[] {
        var natural = require('natural');


        let words = natural.PorterStemmer.tokenizeAndStem(sentence);
        return this.clean(words);
    }

    private static clean(words: string[]): string[] {

        let size = words.length;
        let result = [];
        for (let i = 0; i < size; i++) {
            if (this.isUsfull(words[i])) {
                result.push(words[i]);

            }
        }

        return result;

    }

    private static isUsfull(word: string): boolean {

        // Regular expression to match any non-digit character
        const nonDigitRegex = /\D/;

        // If the string contains any non-digit character, return false
        return nonDigitRegex.test(word);

    }

}

