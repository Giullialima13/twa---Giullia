export interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
  tags: string[];
  author: {
    name: string;
    country: string;
  };
}

export const byCategory = (list: Item[], cat: string): Item[] => 
  list.filter(({ category }) => category === cat);

export const search = (list: Item[], text: string): Item[] => {
  const words = text.toLowerCase().trim().split(/\s+/);
  return list.filter(({ name, tags }) => {
    const itemText = `${name} ${tags.join(' ')}`.toLowerCase();
    return words.every(word => itemText.includes(word));
  });
};

export const total = (list: Item[]): number => 
  list.reduce((acc, { price }) => acc + price, 0);

export const top = (list: Item[], n: number): Item[] => 
  list.toSorted((a, b) => b.price - a.price).slice(0, n);

export const categories = (list: Item[]): string[] => 
  [...new Set(list.map(({ category }) => category))].toSorted();

export const withDiscount = (list: Item[], pct: number): Item[] => 
  list.map(item => ({
    ...item,
    price: +(item.price * (1 - pct / 100)).toFixed(2)
  }));