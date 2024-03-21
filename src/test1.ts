import { Sentence } from "natural";
import { rater } from "./rater";

var natural = require('natural');
var tokenizer = new natural.WordTokenizer();
enum like {
    yes = 'yes',
    no = 'no',
    undecided = 'undecided'
}

let sen = "Vehicle brakes produce charged particles that may harm public health: study";
let sen2 = "Study in new york found the effect of braking on public health for the first time";


let words = natural.PorterStemmer.tokenizeAndStem(sen);



const urlString = 'https://www.example.com/path/to/page';
const url = new URL(urlString);
const siteName = url.hostname; // 'www.example.com'

console.log(siteName);