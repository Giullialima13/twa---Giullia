import { ref } from 'vue'

export const items = ref(null)
export const status = ref('idle') // 'idle' | 'loading' | 'error' | 'ready'
export const error = ref(null)

export async function load() {
  status.value = 'loading'
  try {
    const res = await fetch('/catalog/items.json')
    if (!res.ok) throw new Error('Erro ao carregar dados')
    const data = await res.json()
    items.value = Array.isArray(data) ? data : (data.items || [])
    status.value = 'ready'
  } catch (err) {
    error.value = err.message
    status.value = 'error'
  }
}

export function ensureLoaded() {
  if (items.value === null && status.value !== 'loading') {
    load()
  }
}

export function addItem(item) {
  const nextId = items.value && items.value.length > 0 
    ? Math.max(...items.value.map(i => i.id)) + 1 
    : 1
  
  const newItem = { id: nextId, ...item }
  if (!items.value) items.value = []
  items.value.push(newItem)
  return nextId
}