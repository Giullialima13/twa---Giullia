import { items } from './data.js';
import { byCategory, total, top, categories, withDiscount } from './catalog.js';

console.log('--- Todos os Jogos ---');
console.log(byCategory(items, 'game'));

console.log('--- Total dos Preços ---');
console.log(total(items));

console.log('--- Top 3 Mais Caros ---');
console.log(top(items, 3));

console.log('--- Categorias Únicas ---');
console.log(categories(items));

console.log('--- Com 10% de Desconto ---');
console.log(withDiscount(items, 10));