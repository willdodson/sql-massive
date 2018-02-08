require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');

const app = express();
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set('db',dbInstance)
})

app.get('/api/heroes', (req,res) => {
    req.app.get('db').get_heroes().then(heroes1 => {
        console.log('heroes',heroes1)
        res.status(200).json(heroes1)
    }).catch(error => {
        console.log("Oh Snap! errors and shit", error);
        res.status(500).send('Funky Shit Bro, I dunno wtf to do')
    })
})

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`we listnin @ ${PORT}`);
})