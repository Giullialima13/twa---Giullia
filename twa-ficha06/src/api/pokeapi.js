const BASE = 'https://pokeapi.co/api/v2'
export const PAGE = 20

export async function list(page = 1) {
  const offset = (page - 1) * PAGE
  const res = await fetch(`${BASE}/pokemon?limit=${PAGE}&offset=${offset}`)
  if (!res.ok) {
    throw new Error('Erro ao carregar os Pokémons')
  }
  return await res.json()
}

export async function get(name) {
  const res = await fetch(`${BASE}/pokemon/${name}`)
  if (!res.ok) {
    throw new Error('Erro ao carregar o detalhe do Pokémon')
  }
  return await res.json()
}