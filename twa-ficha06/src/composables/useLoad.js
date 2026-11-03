import { ref, watchEffect, unref } from 'vue'

export function useLoad(source) {
  const items = ref(null)
  const status = ref('loading')
  const error = ref(null)

  const load = async () => {
    status.value = 'loading'
    error.value = null
    try {
      const val = unref(source)
      if (!val) throw new Error('Fonte não fornecida')

      
      let result
      if (typeof val === 'function') {
        result = await val()
      } else if (typeof val === 'string') {
        const res = await fetch(val)
        if (!res.ok) throw new Error('Erro ao carregar dados')
        result = await res.json()
      } else {
        result = val
      }

      items.value = result
      status.value = 'ready'
    } catch (err) {
      error.value = err.message
      status.value = 'error'
    }
  }

 
  watchEffect(() => {
    load()
  })

  return {
    items,
    status,
    error,
    load,
    reload: load
  }
}