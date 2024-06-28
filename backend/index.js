const connectToMongo = require('./db.js');
const express = require('express');
var cors = require('cors');


const port = 5000;

const app = express();



app.use(cors());
app.use(express.json());

//Available routes
app.use('/api/auth' , require('./routes/auth'));
app.use('/api/notes' , require('./routes/notes'));


 
 
app.get('/',(req, res) => {
    res.send('Hello world')
})


app.listen(port , () =>{ 
    connectToMongo();
    console.log(`App is listening to port ${port} `)
})  