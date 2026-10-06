import { writeFile } from 'node:fs/promises';
import { items } from './data.js';
import { byCategory, search, top, total, categories } from './catalog.js';
// se quiser consultar o typescript usa: node --experimental-strip-types app.js 

const [cmd, arg] = process.argv.slice(2);

const printList = (list) => {
  list.forEach((item, index) => {
    console.log(`${index + 1} . ${item.name}`);
  });
};

if (!cmd) {
  printList(items);
} else if (cmd === 'search') {
  printList(search(items, arg || ''));
} 
else if (cmd === 'top') {
  const n = Number(arg) || 3;
  printList(top(items, n));
} 
else if (cmd === 'report') {

  const reportData = {
    count: items.length,
    total: total(items),
    categories: categories(items),
    top3: top(items, 3)
  };

  await writeFile('report.json', JSON.stringify(reportData, null, 2));
} 
else {
  printList(byCategory(items, cmd));
}