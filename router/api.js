const express = require('express');
const bodyParser = require('body-parser');
const users = require('../models/users');
const router = express.Router();
const puppeteer= require('../index')


router.get("/all", (req, res) => {
    res.json(JSON.stringify(users.getAll()));

});
router.get("/puppeteer", async(req, res) => {
    puppeteer.logar()
})

// criando a rota api vai responder a all e a new

router.post("/new", bodyParser.json(), (req, res) => {
    let email = req.body.email;
    let senha = req.body.senha;
    let url = req.body.url;
    let comentarios = req.body.comentarios;
    let tempo = req.body.tempo;
    let pausa = req.body.pausa;
    let comentar = req.body.comentar;
    users.newUser(email, senha, url, comentarios, tempo, pausa, comentar)

    res.send("post adicionado");

});


module.exports = router;