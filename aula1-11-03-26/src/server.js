const express = require('express')
const app = express()
const port = 3000

let alunos = [
  {id: 1, nome:'Zhang', idade: 17},
  {id: 2, nome:'Miguel', idade: 17},
  {id: 3, nome:'Henrique', idade: 17},
]

let frutas = [
  {name: "banana", price:5.00},
  {name: "maçã", price:3.00},
  {name: "tomate", price:2.50},
]

app.get('/frutas', (req, res) => {
  res.json({
    success: true,
    data: frutas,
  })
})

app.get('/', (req, res) => {
  res.send('Pai do Edubardo!')
})

app.get('/alunos', (req, res) => {
  res.send().json({
    success: true,
    data: alunos,
  })
})

app.listen(port, () => {
  console.log(`O servidor está sendo rodado na porta: ${port}`)
})
