// Configuração inicial
require('dotenv').config()
const express = require('express') // Importa o arquivo express
const app = express()  // starta o arquivo express


// depois do db
const mongoose = require('mongoose') // Importa o arquivo mongoose

const Person = require('./models/Person') // acesso ao models e a tabela, esse comando permite você fazer alterações aqui nesta aba

// Forma de ler JSON - Middlewares -> Recursos que são executados entre nossas requisições e respostas
app.use(
    express.urlencoded({  // Lê JSON. Essa configuração
        extended: true,
    }),
)

app.use(express.json()) // Responde JSON. Essa configuração

// -------------------   MÉTODO CRUD ------------------------

// ROTAS DA API
// Rotas da API
// Utilizando o post, pois estamos enviando dados 
// /person é um padrão de rota definido, poderia ser qualquer coisa, mas algo que faça sentido 
// async é uma função assíncrona, eu tenho que fazer uma operação com o banco de dados e ela tem que demorar um tempo x, async garante que esse tempo seja respeitado
app.post('/person', async (req, res) => { 
    // req.body é as informações que chegam do usuário
    // estou contando que as informações venham assim: {name:'Felipe, salary: 5000, approved: true}. Função destructed do js moderno
    const { name, salary, approved } = req.body

    if(!name) {
        res.status(422).json({error: 'O nome é obrigatório!'})
        return
    }
    
    // pra facilitar vou criar esse objeto com os atributos, ai eu passo ele pro meu banco inserir
    const person = { 
        name,
        salary,
        approved,
    }

    // try e catch para tratar os possiveis erros do meu servidor
    try {
        // Criando dados
        await Person.create(person) // esperando salvar o dados

        res.status(201).json({message: 'Pessoa inserida no banco de dados com sucesso!'}) // envia uma mensagem com o status e uma mensagem de sucesso para o usuario
    
    } catch(error) {
        
        res.status(500).json({erro: error}) // mandando a msg no formato json
    }
    
})

// LEITURA DE DADOS
// essa chamada vai retornar todos os dados para o meu usuário
app.get('/person', async (req, res) => {
    try {
        const people = await Person.find()  // await -> espera todos os dados virem para depois dar a resposta
        
        res.status(200).json(people) // status 200 -> ocorreu tudo certo!, enviar todos os dados da tabela person em formato json para meu usuário
    } catch(error) {
        res.status(500).json({ error: error})
    }
})

app.get('/person/:id', async (req, res) => {
    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id
    try {
        const person = await Person.findOne({ _id: id}) // o findOne encontra somente um resultado
        // no Mongodb o id vem como _id
        
        if(!person) {
            res.status(422).json({message: 'Usuário não encontrado'})
            return
        } else {
            res.status(200).json(person)} 
        }
        
        
    catch {
        res.status(500).json({ error: error})
    }
})

// UPDATE - ATUALIZAÇÃO DE DADOS (PUT, PATCH), sendo put atualizações completas e patch atualizações parciais.
app.patch('/person/:id', async (req, res) => {
    const id = req.params.id
    const {name, salary, approved} = req.body

    const person = {
        name,
        salary,
        approved,
    }

    try {
        const updatePerson = await Person.updateOne({ _id: id }, person)
        
        res.status(200).json(person)
    } catch(error){
        res.status(500).json( {error: error})
    }
})

// DELETE - DELETAR DADOS
app.delete('/person/:id', async (req, res) => {
    const id = req.params.id

    const person = await Person.findOne({ _id: id})
    if (!person) {
        res.status(422).json({message: "Usuário não encontrado!"})
        return
    }

    try {
        await Person.deleteOne({ _id: id})

        res.status(200).json({message: "Usuário removido!"})
    } catch(error) {
        res.status(500).json({error: error})
    }
})

// Rota inicial - endpoint
// a '/' = ponto de acesso, (req, res) é um padrão, onde você recebe uma requisição e pode responder se desejar
//  Mandando uma res no formato json, OBS: no lugar de message poderia ser qualquer palavra ex: msg, adendo, aviso etc...
app.get('/', (req, res) => {  
    res.json({Felipe: 'Estou aprendendo criar uma API Node =)'}) 
})

// Conexão com o banco
// Para melhorar a conexão
const db_user = process.env.DB_USER
// O método encodeURIComponent() codifica uma URI (Identificador recurso uniforme) substituindo cada ocorrência de determinados caracteres por um, dois, três, ou quatro seqüências de escape que representam a codificação UTF-8 do caractere (só será quatro seqüências de escape para caracteres compostos por dois caracteres "substituto").
const db_pass = encodeURIComponent(process.env.DB_PASSWORD) 

// URL PARA O BANCO
// por causa da barra, esse jeito da um erro de unescaped characters, por isso criamos db_user e db_pass, e colocamos `` na URL
mongoose.connect( 
    `mongodb+srv://${db_user}:${db_pass}@apicluster.lprcibw.mongodb.net/?retryWrites=true&w=majority` 
)

// CASO DÊ CERTO A CONEXAO OQ FAZER
.then(() => {
    console.log('Conectamos ao MongoDB')
    app.listen(3000)
})  

// CASO DÊ ERRADO A CONEXAO OQ FAZER

.catch((err) => console.log(err)) 

// Entregar uma porta
// app.listen(3000) // Concretizando a disponibilidade da porta 3000



