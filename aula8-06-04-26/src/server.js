import express from 'express'
import route from './routes/fruitRoutes.js'

const app = express()
app.use(express.json())
const port = 3000

app.get('/', (req, res) => {
    res.json('Atividade de PUT e PATCH para fruitas :)')
})

app.use('/fruits', route)

app.listen(port, () => {
    console.log(`O servidor está sendo rodado na porta: ${port}`)
})