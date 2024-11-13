import * as jwtAuth from '../utils/jwtAuth.js'

import * as sessionDatabase from '../databases/sessionsDatabase.js'
// import { checkSession } from '../controller/sessionController.js'

export function parseToken(req, res, next) {
    console.log("Parsing token...")
    if ( req.cookies.auth_token ) {
        console.log("Token found...")
        try {
            const parsedToken = jwtAuth.verifyToken(req.cookies.auth_token)
            console.log("Token successfully parsed.")
            
            // req.parsedToken = parsedToken

            sessionDatabase.checkSessionByToken(parsedToken)
                .then(sessionData => {
                    console.log("Session valid:", sessionData);
                    req.parsedToken = parsedToken

                    console.log("Token Valid")
                    next()
                })
                .catch(err => {
                    req.parsedToken = undefined

                    console.log("Token Invalid")
                    next()
                });
            
            // req.body.userId = parsedToken.userId;
        } catch(err) {
          console.log("Error verifying the token!")
          console.log(err)
        //   throw new Error("!!!")
            next()
        }
    }
    else{
        console.log("Token was not found.")
        next()
    }
}