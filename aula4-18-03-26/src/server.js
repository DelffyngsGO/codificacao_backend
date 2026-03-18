import express from "express"
const app = express()
app.use(express.json())
const port = 3000

app.get("/", (req, res) => {
    res.json("Olá mundo!")
})

app.listen(port, () => {
    console.log(`Sua porta é https://localhost${port}`)
})