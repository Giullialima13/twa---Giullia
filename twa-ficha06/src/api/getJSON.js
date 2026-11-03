export async function getJSON(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Erro ao obter dados: ${response.statusText}`)
  }
  return await response.json()
}