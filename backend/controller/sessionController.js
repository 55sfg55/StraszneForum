import * as database from '../databases/sessionsDatabase.js'
import * as utils from '../utils/responseModel.js'

// Session management requestes:

export function login(req, res) {
    const tempResponse = new utils.response()
    tempResponse.setMessage("Failed to check password.")

    const querry = database.loginByUsername(
        String(req.body.username), 
        String(req.body.password)
    )
    // to implement:  Verify that the data has been successfully retrieved from the database.

    if (querry.isPasswordCorrect === true) {
        tempResponse
            .setSuccess(true)
            .setMessage("Password is correct.  Successfully processed request.")
            .setData( 
                {
                    token: querry.token
                }
            )
    }
    else {
        tempResponse
            .setSuccess(false)
            .setMessage("Password is incorrect. Successfully processed request.")
    }
    res.json( tempResponse ) 
}

export function register(req, res) {
    const tempResponse = new utils.response()
    tempResponse.setMessage( "Failed to register." )

    // push the user into the database
    let querry = database.register(req.body.username, req.body.password)
    // to implement:  Verify that the data has been successfully retrieved from the database.

    if ( querry ) {
        tempResponse
            .setSuccess(true)
            .setMessage("User was registered.")
    }
    else {
        tempResponse
            .setSuccess(false)
            .setMessage("User was not registered.")
    }
    res.json(tempResponse)
}   

export function checkSession(req, res) {
    const tempResponse = new utils.response()
    tempResponse.setMessage("Failed to check token.")

    const querry = database.checkSessionByToken(String(req.body.token))
    // to implement:  Verify that the data has been successfully retrieved from the database.

    if ( querry ) {
        tempResponse
            .setSuccess(true)
            .setMessage("Token is correct.")
    }    
    else {
        tempResponse
            .setSuccess(false)
            .setMessage("Invalid token.")
    }
    res.json( tempResponse ) 
}