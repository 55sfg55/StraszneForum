import express from 'express';
import cors from 'cors';

import cookieParser from 'cookie-parser';

const app = express();
const port = 3096;

import bodyParser from 'body-parser';
// import helloWorldRouterV0 from './Legacy versions/v0/routers/HelloWorld-router.js' // V0 - old API version for development
import helloWorldRouter from './Legacy versions/v1 - hello world board/routers/helloWolrdBoardRouter.js'

import sessionsRouter from './routers/sessionRouter.js'

import usersRouter from './routers/usersRouter.js'

import forum from './routers/forumRouter.js'

import * as utils from './utils/responseModel.js'



import { parseToken } from './middleware/parseToken.js'; // Import the middleware




app.use(bodyParser.json());

app.use(cookieParser());  // Add this middleware to parse cookies

app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3000',  // Your frontend URL
  credentials: true,  // Ensure cookies are sent along with the request
}));


app.use(parseToken)



// Routers:
// app.use('/helloworld/v0/', helloWorldRouterV0) // V0 - old API version for development
// app.use('/helloworld/v1/', helloWorldRouter)

app.use('/sessions/', sessionsRouter) // This one should stay the same, having login, and register option. The rest should be handled by passing token to the right request, and processing at backend.

app.use('/users/', usersRouter)

app.use('/forum/', forum)



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

