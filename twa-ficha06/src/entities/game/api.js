export async function get(id) {
  const res = await fetch('/catalog/items.json')
  if (!res.ok) throw new Error('Erro ao carregar o ficheiro de dados')
  const items = await res.json()
  
  const game = items.find(i => i.id === Number(id))
  if (!game) throw new Error('Jogo não encontrado')
  
  return game
}