import * as database from '../databases/sessionsDatabase.js'
import * as utils from '../utils/helloWorldUtils.js'

// Session management requestes:
export function login(req, res) {
    const tempResponse = new utils.helloWorldResponse()
    tempResponse.setMessage("Failed to check password.")
    if (req.body.id) {
        tempResponse.setData( { isPasswordCorrect: database.checkPassword(Number(req.body.id), String(req.body.password)) } )
        // to implement:  Verify that the data has been successfully retrieved from the database.
        if ( tempResponse.responseDef.data.isPasswordCorrect ) {
            tempResponse.setAll(true, "Password is correct.  Successfully processed request.")
        }    
        else {
            // For now, in order to avoid confusion, success is set to false, regardless use the data field to verify password, as success field should only tell if the request was successfull.
            tempResponse.setAll(false, "Password is incorrect. Successfully processed request.")
        }
        res.json( tempResponse.responseDef )
    }
    else {
        loginByUsername(req, res)
    } 
}

export function loginByUsername(req, res) {
    const tempResponse = new utils.helloWorldResponse()
    tempResponse.setMessage("Failed to check password.")

    tempResponse.setData( database.loginByUsername(String(req.body.username), String(req.body.password)) )
    // to implement:  Verify that the data has been successfully retrieved from the database.
    if ( tempResponse.responseDef.data.isPasswordCorrect ) {
        tempResponse.setAll(true, "Password is correct.  Successfully processed request.")
    }    
    else {
        tempResponse.setAll(false, "Password is incorrect. Successfully processed request.")
    }
    res.json( tempResponse.responseDef ) 
}

export function register(req, res) {
    const tempResponse = new utils.helloWorldResponse()
    tempResponse.setMessage( "Failed to register." )

    // push the user into the database
    let querry = database.register(req.body.username, req.body.password)
    if ( querry ) {
        tempResponse.setAll(true, "User was registered.")
    }
    else {
        tempResponse.setAll(false, "User was not registered.")
    }
    res.json(tempResponse.responseDef)
}   

export function checkSession(req, res) {
    const tempResponse = new utils.helloWorldResponse()
    tempResponse.setMessage("Failed to check token.")

    // to implement:  Verify that the data has been successfully retrieved from the database.
    if ( database.checkSessionByToken(String(req.body.token) ) ) {
        tempResponse.setAll(true, "Token is correct.")
    }    
    else {
        tempResponse.setAll(false, "Invalid token.")
    }
    res.json( tempResponse.responseDef ) 
}