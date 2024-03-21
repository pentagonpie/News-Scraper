"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var natural = require('natural');
var tokenizer = new natural.WordTokenizer();
var like;
(function (like) {
    like["yes"] = "yes";
    like["no"] = "no";
    like["undecided"] = "undecided";
})(like || (like = {}));
let sen = "Vehicle brakes produce charged particles that may harm public health: study";
let sen2 = "Study in new york found the effect of braking on public health for the first time";
let words = natural.PorterStemmer.tokenizeAndStem(sen);
const urlString = 'https://www.example.com/path/to/page';
const url = new URL(urlString);
const siteName = url.hostname; // 'www.example.com'
console.log(siteName);
