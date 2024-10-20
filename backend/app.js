import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

import bodyParser from 'body-parser';
import helloWorldRouter from './Legacy versions/v0/routers/HelloWorld-router.js'
import sessionsRouter from './routers/sessionRouter.js'

import * as utils from './utils/responseModel.js'




app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors()); 




// Routers:
app.use('/helloworld/v0/', helloWorldRouter)
app.use('/sessions/', sessionsRouter) // This one should stay the same, having login, and register option. The rest should be handled by passing token to the right request, and processing at backend.




// Request handler, to check if you can connect to api.
app.get('/', (req, res) => {
    const tempResponse = new utils.response()

    tempResponse
      .setSuccess(true)
      .setMessage("Successfully connected to the main api.")
    
    res.json(tempResponse)
})



// Middleware for handling 404 errors
app.use((req, res, next) => {

    res.status(404).json({ error: "Not Found" });
    throw new Error("Something went wrong!"); 
  
  });
// General error handling middleware
app.use((err, req, res, next) => {
  
    console.error(err.stack); // Log the error for debugging
    res.status(500).json({ error: "Internal Server Error" });
    throw new Error("Something went wrong!"); 
  
  });


// Server start listening at the localhost:port
app.listen(port, () => {
    console.log(`Server is crashing at  127.0.0.1:${ port }`)
})

