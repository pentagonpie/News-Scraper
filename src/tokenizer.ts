export class tokenizer {
    constructor() { }

    static tokenize(sentence: string): string[] {
        var natural = require('natural');
        let words = natural.PorterStemmer.tokenizeAndStem(sentence);

        return this.clean(words);
    }

    private static clean(words: string[]): string[] {

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
        }

        return result;

    }

    private static isWord(word: string): boolean {

        // Regular expression to match any non-digit character
        const nonDigitRegex = /\D/;

        // If the string contains any non-digit character, return false
        return nonDigitRegex.test(word);

    }

}

