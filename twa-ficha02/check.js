import assert from 'node:assert/strict';
import { items } from './data.js';
import { byCategory, search, total, top, categories, withDiscount } from './catalog.js';

//byCategory
assert.equal(byCategory(items, 'game').length, items.length);

//seearch
assert.ok(search(items, 'Hollow').length > 0);

//total
assert.equal(typeof total(items), 'number');

//top3
assert.equal(top(items, 3).length, 3);

//categories
assert.ok(Array.isArray(categories(items)));

//withDiscount
const discounted = withDiscount(items, 10);
assert.notEqual(discounted, items); 