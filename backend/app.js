import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;


import bodyParser from 'body-parser';
import helloWorldRouter from './routers/HelloWorld-router.js'

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

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