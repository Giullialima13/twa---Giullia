import { ref } from 'vue'

export function useLoad(url) {
  const items = ref([])
  const status = ref('loading') 
  const error = ref(null)

  const loadData = async () => {
    status.value = 'loading'
    error.value = null
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Erro ao carregar os dados')
      const data = await response.json()
      items.value = data
      status.value = 'ok'
    } catch (err) {
      error.value = err.message
      status.value = 'error'
    }
  }

  
  loadData()

  return {
    items,
    status,
    error,
    reload: loadData
  }
}