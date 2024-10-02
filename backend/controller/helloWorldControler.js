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
    temp
    const temp = separateEntries(req.params.id)
    if (isNumeric(temp.theRest)) {
        userID = Number(temp.rest)
        if ( !temp.prefix ) {
            getUserById(req, res)
        }
        else {

        }
    }
    else {
        username = String(temp.rest)
    }
    /* 
        if (isNumeric(temp.rest)) {
            res.json( utils.responseJSON(true, "Successfully got userdata of user by ID.", database.userIdToData( Number(temp.rest) )) )
        }
        else{
            res.json( utils.responseJSON(true, "Successfully got userdata of user by username.", database.userUsernameToId( )) )        }
    }
    else {
        if (isNumeric(temp.rest)) {
            res.json( utils.responseJSON(true, "Successfully got userdata of user by ID.", database.userAllEntries( Number(temp.rest) )))
        }
        else{
            const tempId = database.userUsernameToId(String(temp.rest)).id // get id of user from userdata
            res.json( utils.responseJSON(true, "Successfully got userdata of user by ID, after converting username to ID.", database.userAllEntries( Number(tempId) )) )
        }
    }*/
}
function getUserById(req, res) {

}
function getUserById(req, res) {
    res.json( utils.responseJSON(true, "Successfully got user data by ID.", database.userIdToData( Number(req.params.id) )) )
}
function getEntryById(req, res) {
    res.json( utils.responseJSON(true, "Successfully entry by ID.", database.entryById(Number(req.params.id))) )
}

module.exports = { getAll, getAllUsersAllEntries, getUser, getUserById, getEntryById }