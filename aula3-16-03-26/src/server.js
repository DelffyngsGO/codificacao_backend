const express = require('express')
const app = express()

const fruitsRoute = require('./routes/fruitsRoutes')

app.use(express.json())
const port = 3000

app.get('/', (req, res) => {
    res.send('Sem conteúdo aqui')
})

app.use('/fruits', fruitsRoute)

app.listen(port, () => {
    console.log(`O server está sendo rodado na porta: ${port}`)
})