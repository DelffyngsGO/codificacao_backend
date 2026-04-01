import express from 'express'
import route from './routes/pizzaRoute.js'

const app = express()
app.use(express.json())
const port = 3000

app.get('/', (req, res) => {
    res.json('Nunca mais na sua vida você lambe meu pau desse jeito, Zhang')
})

app.use('/pizza', route)

app.listen(port, () => {
    console.log(`O server está sendo rodado na porta: ${port}`)
})