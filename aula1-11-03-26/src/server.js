const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Pai do Edubardo!')
})

app.listen(port, () => {
  console.log(`O servidor está sendo rodado na porta: ${port}`)
})
