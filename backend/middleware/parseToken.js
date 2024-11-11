import jwt from "jsonwebtoken"

export function parseToken(req, res, next) {
    console.log("Parsing token...")
    if ( req.cookies.auth_token ) {
        console.log("Token found...")
        try {
            const parsedToken = jwt.verify(req.cookies.auth_token, 'secret')
            console.log("Token successfully parsed.")
            req.body.userId = parsedToken.userId;
        } catch(err) {
          console.log("Error verifying the token!")
          console.log(err)
        //   throw new Error("!!!")
        }
    }
    else{
        console.log("Token was not found.")
    }

    next()
}