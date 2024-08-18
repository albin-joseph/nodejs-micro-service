const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, rss)=>{

});

app.listen(4003, ()=>{
    console.log('Listern on 4003')
});
