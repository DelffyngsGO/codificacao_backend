import express from "express"
import route from "./routes/studentRoutes"

const app = express()
app.use(express.json())
const port = 3000

app.get("/", (req, res) => {
    res.json("Olá mundo!")
})

app.use('/students', route)

app.listen(port, () => {
    console.log(`O server está sendo rodado na porta: ${port}`)
})