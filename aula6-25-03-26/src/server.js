import express from 'express'
import route from './routes/filmesRoute.js'

const app = express()
app.use(express.json())
const port = 3000

app.get('/', (req, res) => {
    res.json('BANANAS!')
})

app.use('/filmes', route)

app.listen(port, () => {
    console.log(`O servidor está sendo rodado na porta: ${port}`)
})