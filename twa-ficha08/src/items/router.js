import { Router } from 'express'
import { readFile, writeFile } from 'node:fs/promises'
import { search } from '../catalog.js'

const router = Router()

// Carregamento inicial do catálogo do disco
const items = JSON.parse(
  await readFile(new URL('../../data/items.json', import.meta.url), 'utf8')
)

// Função auxiliar para gravar as alterações permanentemente no ficheiro (Desafio C)
async function saveItems() {
  await writeFile(
    new URL('../../data/items.json', import.meta.url),
    JSON.stringify(items, null, 2),
    'utf8'
  )
}

// GET /api/items (com suporte opcional a pesquisa ?q= e paginação ?page=&limit=)
router.get('/', (req, res) => {
  const { q, page, limit } = req.query
  let result = q ? search(items, q) : items

  // Suporte à Paginação (Desafio A)
  if (page !== undefined && limit !== undefined) {
    const pageNum = Math.max(1, Number(page))
    const limitNum = Math.max(1, Number(limit))
    const start = (pageNum - 1) * limitNum
    const end = start + limitNum

    return res.json({
      count: result.length,
      results: result.slice(start, end)
    })
  }

  res.json(result)
})

// GET /api/items/:id (detalhe ou erro 404 em JSON)
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const item = items.find((i) => i.id === id)
  if (!item) return res.status(404).json({ error: `item ${id} not found` })
  res.json(item)
})

// POST /api/items (criação com validação 400 ou sucesso 201 + cabeçalho Location)
router.post('/', async (req, res) => {
  const { name = '', price } = req.body ?? {}
  const errors = {}

  if (name.trim().length < 3) errors.name = 'at least 3 characters'
  if (!(price > 0)) errors.price = 'must be > 0'

  if (Object.keys(errors).length) {
    return res.status(400).json({ errors })
  }

  const nextId = Math.max(0, ...items.map((i) => i.id)) + 1
  const item = { ...req.body, id: nextId, name: name.trim() }

  items.push(item)
  await saveItems() // Gravação persistente (Opcional C)

  // Resposta 201 com cabeçalho Location (Desafio D)
  res.status(201).setHeader('Location', `/api/items/${item.id}`).json(item)
})

// PUT /api/items/:id (substituição completa)
router.put('/:id', async (req, res) => {
  const i = items.findIndex((x) => x.id === Number(req.params.id))
  if (i === -1) return res.status(404).json({ error: 'not found' })

  items[i] = { ...req.body, id: items[i].id }
  await saveItems()

  res.json(items[i])
})

// PATCH /api/items/:id (atualização parcial - Desafio D)
router.patch('/:id', async (req, res) => {
  const i = items.findIndex((x) => x.id === Number(req.params.id))
  if (i === -1) return res.status(404).json({ error: 'not found' })

  items[i] = { ...items[i], ...req.body, id: items[i].id }
  await saveItems()

  res.json(items[i])
})

// DELETE /api/items/:id (eliminação respondendo 204 sem corpo)
router.delete('/:id', async (req, res) => {
  const i = items.findIndex((x) => x.id === Number(req.params.id))
  if (i === -1) return res.status(404).json({ error: 'not found' })

  items.splice(i, 1)
  await saveItems()

  res.status(204).end()
})

export default router