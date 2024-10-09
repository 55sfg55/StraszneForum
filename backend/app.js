import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;


import bodyParser from 'body-parser';
import helloWorldRouter from './routers/HelloWorld-router.js'

import * as utils from './utils/helloWorldUtils.js'

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors()); 


// Routers
app.use('/helloworld/v0/', helloWorldRouter)


// Request handler, to check if you can connect to api.
app.get('/', (req, res) => {
    const tempResponse = new utils.helloWorldResponse()
    tempResponse.setAll(true, "Successfully connected to the main api.")
    res.json(tempResponse.responseDef)
})

app.listen(port, () => {
    console.log(`Server is crashing at  127.0.0.1:${ port }`)
})

