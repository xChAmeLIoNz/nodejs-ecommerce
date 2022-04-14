const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const PORT = 3000

const app = express()
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({extended: true}))

//connect to database
mongoose.connect('mongodb+srv://prlcc:THogbnQu0a6Ol8CM@cluster0.7t62u.mongodb.net/ProgettoNode?retryWrites=true&w=majority')

const User = mongoose.model('User', {username: String, password: String})

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname, '/login.html'))
})

//autenticazione dell'utente
app.post('/login', async (req,res) => {
    const username = req.body.username
    const password = req.body.password

    const users = await User.find({username, password})

    //controllo dei dati
    if(users.length > 0) {
        res.sendFile(path.join(__dirname, '/merce.html'))
    }else {
        res.sendFile(path.join(__dirname, '/errore.html'))
    }
})



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})


