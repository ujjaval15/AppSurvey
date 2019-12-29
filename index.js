//node support only commmon js for backend common js
const express = require('express');
const app = express(); // generating singal express app 

app.get('/', (req, res) => {
    res.send({ hi : 'there'});
})

//environment variable
const PORT = process.env.PORT || 5000;
app.listen(PORT);
