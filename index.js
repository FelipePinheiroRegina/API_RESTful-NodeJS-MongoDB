// Configuração inicial
const express = require('express') // Importa o arquivo express
const app = express()  // starta o arquivo express

// Forma de ler JSON - Middlewares -> Recursos que são executados entre nossas requisições e respostas
app.use(
    express.urlencoded({  // Lê JSON. Essa configuração
        extended: true,
    }),
)

app.use(express.json()) // Responde JSON. Essa configuração

// Rota inicial - endpoint
app.get('/', (req, res) => {  // a '/' = ponto de acesso, (req, res) é um padrão, onde você recebe uma requisição e pode responder se desejar
    
    res.json({Felipe: 'Estou aprendendo criar uma API Node =)'}) //  Mandando uma res no formato json, OBS: no lugar de message poderia ser qualquer palavra ex: msg, adendo, aviso etc...
    

})

// Entregar uma porta
app.listen(3000) // Concretizando a disponibilidade da porta 3000
