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
      if (!response.ok) throw new Error('Erro ao carregar dados do servidor')
      
      const data = await response.json()
      items.value = Array.isArray(data) ? data : (data.items || [])
      status.value = 'ok'
    } catch (err) {
      error.value = err.message
      status.value = 'error'
    }
  }

  // Executa o carregamento se o URL for fornecido
  if (url) {
    loadData()
  } else {
    status.value = 'error'
    error.value = 'URL não fornecido'
  }

  return {
    items,
    status,
    error,
    reload: loadData
  }
}