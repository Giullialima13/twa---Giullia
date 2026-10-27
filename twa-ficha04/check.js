import fs from 'fs'
import path from 'path'

const filePath = path.resolve('public/items.json')

if (!fs.existsSync(filePath)) {
  console.error('❌ Erro: public/items.json não encontrado!')
  process.exit(1)
}

try {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  console.log(`✅ items.json carregado com sucesso! Total de itens: ${data.length}`)
} catch (err) {
  console.error('❌ Erro ao parsear o items.json:', err.message)
}