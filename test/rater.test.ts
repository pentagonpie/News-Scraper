import test from "node:test";
import { Prefrence } from "../src/Prefrence";
import { liked } from '../src/page';
import { rater } from '../src/rater';


test('similar function from rater', () => {
    let pref = new Prefrence(liked.yes, ["cat", "dog", "house"]);
    expect(rater.similar(["cat", "dog", "house"], pref)).toBe(1)
});

test('similar 2 function from rater', () => {
    let pref = new Prefrence(liked.yes, ["cat", "dog", "house", "table"]);
    expect(rater.similar(["cat", "dog"], pref)).toBe(0.5)
});

test('similar 3 function from rater', () => {
    let pref = new Prefrence(liked.yes, ["cat", "dog", "house", "table"]);
    expect(rater.similar(["plane", "bird"], pref)).toBe(0)
});





