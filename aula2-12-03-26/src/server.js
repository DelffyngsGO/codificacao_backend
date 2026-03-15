const express = require('express')
const app = express()
app.use(express.json())
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
  res.json({
    success: true,
    data: alunos,
  })
})

//GET - buscar aluno by id

app.get('/alunos/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const aluno = alunos.find(a => a.id === id)
    if(!aluno) {
      return res.status(404).json({
        success: false,
        mesage: 'Aluno não encontrado',
      })
    } res.json({
      success: true,
      data: aluno,
    })
}) 

app.listen(port, () => {
  console.log(`O servidor está sendo rodado na porta: ${port}`)
})

//POST - criar novo aluno

app.post('/alunos', (req, res) => {
    const { nome, idade } = req.body
    if (!nome || !idade){
        return res.status(400).json({
            success: false,
            message: 'Nome e idade são obrigatórios'
        })
    }
    const novoAluno = {
        id: alunos.length + 1,
        nome,
        idade
    }
    alunos.push(novoAluno)
    res.status(201).json({
        sucess: true,
        data: novoAluno,
        message: 'Certo'
    })
})
