const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, rss)=>{
    const {type, data} = req.body;

    if(type === 'CommentCreated'){
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data:{
                id: data.id,
                postId: data.postId,
                status: status,
                content: data.content
            }
        });
    };
});

app.listen(4003, ()=>{
    console.log('Listern on 4003')
});
