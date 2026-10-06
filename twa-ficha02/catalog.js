//byCategory
export const byCategory = (list, cat) => 
  list.filter(({ category }) => category === cat);

//search (apaguei o outro pq foi pedido este aqui dps no acabaram cedo)
export const search = (list, text) => {
  const words = text.toLowerCase().trim().split(/\s+/).filter(Boolean);
  
  return list.filter(({ name, tags }) => {
    const itemText = `${name} ${tags.join(' ')}`.toLowerCase();
    return words.every(word => itemText.includes(word));
  });
};

//total
export const total = (list) => 
  list.reduce((acc, { price }) => acc + price, 0);

//top
export const top = (list, n) => 
  list.toSorted((a, b) => b.price - a.price).slice(0, n);

//categories
export const categories = (list) => 
  [...new Set(list.map(({ category }) => category))].toSorted();

//withDiscount
export const withDiscount = (list, pct) => 
  list.map(item => ({
    ...item,
    price: +(item.price * (1 - pct / 100)).toFixed(2)
  }));