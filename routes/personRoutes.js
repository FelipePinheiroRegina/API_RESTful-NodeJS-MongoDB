const router = require('express').Router

const Person = require('../models/Person') // acesso ao models e a tabela, esse comando permite você fazer alterações aqui nesta aba

// Rotas da API
// Utilizando o post, pois estamos enviando dados 
// /person é um padrão de rota definido, poderia ser qualquer coisa, mas algo que faça sentido 
// async é uma função assíncrona, eu tenho que fazer uma operação com o banco de dados e ela tem que demorar um tempo x, async garante que esse tempo seja respeitado
router.post('/', async (req, res) => { 
    // req.body é as informações que chegam do usuário
    // estou contando que as informações venham assim: {name:'Felipe, salary: 5000, approved: true}. Função destructed do js moderno
    const { name, salary, approved } = req.body

    if(!name) {
        res.status(422).json({error: 'O nome é obrigatório!'})
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

module.exports = router