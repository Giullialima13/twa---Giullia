import { ref } from 'vue'

export function useLoad(url) {
  const data = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchData = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Erro ao carregar os dados')
      data.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }


  fetchData()

  return {
    data,
    loading,
    error,
    retry: fetchData 
  }
}