const express = require('express')
const mongoose = require('mongoose')
const knightRoutes = require('./routes/knightRoutes')

const app = express()

// Configurações
app.use(express.json())

// Rotas
app.use('/knights', knightRoutes)

mongoose
    .connect('mongodb://db:27017/knights-challenge')
    .then(result => {
        console.log('MongoDB connected.')
    })
    .catch(error => {
        console.log(error)
    })

app.listen(9000, () => console.log('Listen at 9000!'))
