const database = require('../databases/helloWorldDatabase')
const utils = require('../utils/helloWorldUtils')

const isNumeric = (str) => !isNaN(Number(str)) && /^\d+$/.test(str);
const separateEntries = (str) => {
    const prefix = "allEntries";

    if (str.startsWith(prefix)) {
        const rest = str.substring(prefix.length);
        return {
            prefix: prefix,
            theRest: rest
        };
    }

    return {
        prefix: null,
        theRest: str 
    };
};

export function getAll(req, res) {
    tempResponse = new utils.helloWorldResponse()
    tempResponse.setMessage( "Failed to get all entries." )

    tempResponse.setData( database.users )
    // to implement:  Verify that the data has been successfully retrieved from the database.
    tempResponse.setAll(true, "Successfully got all entries.")
    
    res.json( tempResponse.responseDef )
}

export function getAllUsersAllEntries(req, res) {
    tempResponse = new utils.helloWorldResponse()
    tempResponse.setMessage( "Failed to get all entries from all users, organised by users." )

    tempResponse.setData( database.allUsersAllEntries() )
    // to implement:  Verify that the data has been successfully retrieved from the database.
    utils.setAll(true, "Succefully got all entries from all users, organised by users.")
    res.json( tempResponse.responseDef )
}

export function getUser(req, res) {
    //get user at /helloWorld/user/ +
    // id or username => data of the user
    // allEntries + id or username => all entries of this user


    // to differentiate between /helloWorld/user/allEntries:id (request for user's entries) and /helloWorld/user/:id (request for userdata) //Inefficient, but for now it just works,
    const temp = separateEntries(req.params.id)

    tempResponse = new utils.helloWorldResponse()
    tempResponse.setMessage( "Failed to get userdata." )

    // to do: !(is numeric) => username to id, if prefix (allEntries) => id -> all entries} else => id -> userdata

    if (isNumeric(temp.theRest)) {
        userID = Number(temp.theRest)
    }
    else {
        username = String(temp.theRest)
        userID = database.userUsernameToId( username )
    }
    if ( !temp.prefix ) {
        tempResponse.setData( database.userIdToData( userID ) )
        // to implement:  Verify that the data has been successfully retrieved from the database.
        tempResponse.setAll( true, "Successfully got user data of user by ID." )
    }
    else {
        tempResponse.setData( database.userAllEntries( userID ) )
        // to implement:  Verify that the data has been successfully retrieved from the database.
        tempResponse.setAll( true, "Successfully got all entries of user by ID." )
    }

    res.json( tempResponse )
}

export function getUserById(req, res) {
    tempResponse = new utils.helloWorldResponse()
    tempResponse.setMessage( "Failed to get user data by ID." )

    tempResponse.setData( database.userIdToData( Number(req.params.id) ) )
    // to implement:  Verify that the data has been successfully retrieved from the database.
    tempResponse.setAll(true, "Successfully got user data by ID.")

    res.json( tempResponse.responseDef )
}

export function getEntryById(req, res) {
    tempResponse = new utils.helloWorldResponse()
    tempResponse.setMessage( "Failed to get entry by ID." )

    tempResponse.setData( database.entryById(Number(req.params.id)) )
    // to implement:  Verify that the data has been successfully retrieved from the database.
    tempResponse.setAll(true, "Successfully got entry by ID.")

    res.json( tempResponse.responseDef )
}

export function login(req, res) {
    tempResponse = new utils.helloWorldResponse()
    tempResponse.setData( { isPasswordCorrect: database.checkPassword(Number(req.params.id), String(req.params.password)) } )
    // to implement:  Verify that the data has been successfully retrieved from the database.
    if ( tempResponse.responseDef.data.isPasswordCorrect ) {
        tempResponse.setAll(true, "Password is correct.")
    }    
    else {
        // For now, in order to avoid confusion, success is set to false, regardless use the data field to verify password, as success field should only tell if the request was successfull.
        tempResponse.setAll(false, "Password is incorrect. Successfully processed request.")
    }
    res.json( tempResponse.responseDef ) 
}