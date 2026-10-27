import { ref, onMounted } from 'vue'

export function useLoad(url) {
  const status = ref('loading')
  const error = ref(null)
  const items = ref([])

  async function load() {
    status.value = 'loading'
    error.value = null
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`)
      items.value = await res.json()
      status.value = 'ok'
    } catch (err) {
      status.value = 'error'
      error.value = err.message
    }
  }

  onMounted(() => {
    load()
  })

  return { status, error, items, load }
}