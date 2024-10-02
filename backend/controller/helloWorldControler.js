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

function getAll(req, res) {
    tempResponse = new utils.helloWorldResponse()
    tempResponse.responseJSON(true, "Successfully got all entries.", database.users)
    
    res.json( tempResponse.responseDef )
}
function getAllUsersAllEntries(req, res) {
    res.json( utils.responseJSON(true, "Succefully got all entries from all users, organised by users.", database.allUsersAllEntries()) )
}
function getUser(req, res) {
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
        tempResponse.setSuccess( true )
        tempResponse.setMessage("Successfully got user data of user by ID.")
    }
    else {
        tempResponse.setData( database.userAllEntries( userID ) )
        // to implement:  Verify that the data has been successfully retrieved from the database.
        tempResponse.setSuccess( true )
        tempResponse.setMessage("Successfully got all entries of user by ID.")
    }

    res.json( tempResponse )
}
function getUserById(req, res) {
    res.json( utils.responseJSON(true, "Successfully got user data by ID.", database.userIdToData( Number(req.params.id) )) )
}
function getEntryById(req, res) {
    res.json( utils.responseJSON(true, "Successfully entry by ID.", database.entryById(Number(req.params.id))) )
}

module.exports = { getAll, getAllUsersAllEntries, getUser, getUserById, getEntryById }