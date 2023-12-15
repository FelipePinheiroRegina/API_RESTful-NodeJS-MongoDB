const mongoose = require('mongoose') // chamo o mongoose aqui também

const Person = mongoose.model('Person', { // Cria uma Tabela no DB com as entidades declaradas abaixo
    name: String,
    salary: Number,
    approved: Boolean,
})

module.exports = Person  // Exporta