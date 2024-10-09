import * as database from '../databases/helloWorldDatabase.js'
import * as utils from '../utils/helloWorldUtils.js'

const isNumeric = (str) => !isNaN(Number(str)) && /^\d+$/.test(str);

export function getAllUsersAllEntries(req, res) {
    const tempResponse = new utils.helloWorldResponse()
    tempResponse.setMessage( "Failed to get all entries from all users, organised by users." )

    tempResponse.setData( database.allUsersAllEntries() )
    // to implement:  Verify that the data has been successfully retrieved from the database.
    tempResponse.setAll(true, "Successfully got all entries from all users, organised by users.")
    res.json( tempResponse.responseDef )
}

export function getAllEntriesOfUser(req, res) {
    const tempResponse = new utils.helloWorldResponse()
    tempResponse.setMessage( "Failed to get userdata." )

    let userID = Number(req.params.id);

    tempResponse.setData( database.userAllEntries( userID ) )
    // to implement:  Verify that the data has been successfully retrieved from the database.
    tempResponse.setAll( true, "Successfully got all entries of user by ID." )
    res.json( tempResponse )
}

export function getUserById(req, res) {
    const tempResponse = new utils.helloWorldResponse()
    tempResponse.setMessage( "Failed to get userdata by ID." )

    tempResponse.setData( database.userIdToData( Number(req.params.id) ) )
    // to implement:  Verify that the data has been successfully retrieved from the database.
    tempResponse.setAll(true, "Successfully got user data by ID.")

    res.json( tempResponse.responseDef )
}

export function getEntryById(req, res) {
    const tempResponse = new utils.helloWorldResponse()
    tempResponse.setMessage( "Failed to get entry by ID." )

    tempResponse.setData( database.entryById(Number(req.params.id)) )
    // to implement:  Verify that the data has been successfully retrieved from the database.
    tempResponse.setAll(true, "Successfully got entry by ID.")

    res.json( tempResponse.responseDef )
}

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