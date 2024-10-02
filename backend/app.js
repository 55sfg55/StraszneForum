const express = require('express');
const cors = require('cors')

const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const helloWorldRouter = require('./routers/HelloWorld-router');

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

const allowedOrigins = ["http://localhost:3000", "http://localhost:8080"];

app.use(cors()); 



app.get('/', (req, res) => {
    console.log("asd")
    res.json({})
})

// Routers
app.use('/helloWorld/', helloWorldRouter)


app.listen(port, () => {
    console.log(`Server is crashing at ${ port }`)
})