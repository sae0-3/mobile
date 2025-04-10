import express from 'express'

const app = express()
const PORT = 4000

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`)
})
