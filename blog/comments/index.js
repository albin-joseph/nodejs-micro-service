const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto')

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    res.send(comments)
});

app.post('/posts/:id/comments', (req, res)=> {
    const id = randomBytes(4).toLocaleString('hex');
    const {content} = req.body;
    comments[id] = {
        id, content
    };

    res.status(201).send(comments[id]);
});

app.listen(4001, () => {
    console.log('Listening on 4001')
});