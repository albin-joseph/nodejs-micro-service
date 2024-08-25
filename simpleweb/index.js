const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    res.send('Live simple web');
});

app.listen(4900, () => {
    console.log('listerning on port 4900')
});