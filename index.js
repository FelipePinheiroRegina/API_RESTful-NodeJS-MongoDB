// Configuração inicial
const express = require('express') // Importa o arquivo express
const app = express()  // starta o arquivo express

// depois do db
const mongoose = require('mongoose') // Importa o arquivo mongoose

// Forma de ler JSON - Middlewares -> Recursos que são executados entre nossas requisições e respostas
app.use(
    express.urlencoded({  // Lê JSON. Essa configuração
        extended: true,
    }),
)

app.use(express.json()) // Responde JSON. Essa configuração

// ROTAS DA API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

// Rota inicial - endpoint
// a '/' = ponto de acesso, (req, res) é um padrão, onde você recebe uma requisição e pode responder se desejar
//  Mandando uma res no formato json, OBS: no lugar de message poderia ser qualquer palavra ex: msg, adendo, aviso etc...
app.get('/', (req, res) => {  
    res.json({Felipe: 'Estou aprendendo criar uma API Node =)'}) 
})

// Conexão com o banco
// Para melhorar a conexão
const db_user = 'dBFelipe'
// O método encodeURIComponent() codifica uma URI (Identificador recurso uniforme) substituindo cada ocorrência de determinados caracteres por um, dois, três, ou quatro seqüências de escape que representam a codificação UTF-8 do caractere (só será quatro seqüências de escape para caracteres compostos por dois caracteres "substituto").
const db_pass = encodeURIComponent('EcbxqeHw42pPK6lM') 

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



