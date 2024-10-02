const database = require('../databases/helloWorldDatabase')
const utils = require('../utils/helloWorldUtils')

const isNumeric = (str) => !isNaN(Number(str)) && /^\d+$/.test(str);
const separateEntries = (str) => {
    const prefix = "allEntries";

    if (str.startsWith(prefix)) {
        const rest = str.substring(prefix.length);
        return {
            prefix: prefix,
            rest: rest
        };
    }

    return {
        prefix: null,
        rest: str 
    };
};

function getAll(req, res) {
    res.json( utils.responseJSON(true, "Successfully got all entries.", database.users) )
}
function getAllUsersAllEntries(req, res) {
    res.json( utils.responseJSON(true, "Succefully got all entries from all users, organised by users.", database.allUsersAllEntries()) )
}
function getUser(req, res) {
    // Czerwony68!
    //get user at /helloWorld/user/
    // id or username => data of the user
    // allEntries + id or username => all entries of this user
    const temp = separateEntries(req.params.id)
    if ( !temp.prefix ) {
        if (isNumeric(temp.rest)) {
            res.json( utils.responseJSON(true, "Successfully got all entries.", database.users)
                {
                success: true,
                message: "Successfully got userdata of user by ID.",
                data: database.userIdToData( Number(temp.rest) )
            })
        }
        else{
            res.json( utils.responseJSON(true, "Successfully got all entries.", database.users)
                {
                success: true,
                message: "Successfully got userdata of user by username.",
                data: database.userUsernameToId( String(temp.rest) )
            })
        }
    }
    else {
        if (isNumeric(temp.rest)) {
            res.json( utils.responseJSON(true, "Successfully got all entries.", database.users)
                {
                success: true,
                message: "Successfully got userdata of user by ID.",
                data: database.userAllEntries( Number(temp.rest) )
            })
        }
        else{
            const tempId = database.userUsernameToId(String(temp.rest)).id // get id of user from userdata
            res.json( utils.responseJSON(true, "Successfully got all entries.", database.users)
            {
                success: true,
                message: "Successfully got userdata of user by ID, after converting username to ID.",
                data: database.userAllEntries( Number(tempId) )
            })
        }
    }
}
function getUserById(req, res) {
    res.json( utils.responseJSON(true, "Successfully got user data by ID.", database.userIdToData( Number(req.params.id) )) )
}
function getEntryById(req, res) {
    res.json( utils.responseJSON(true, "Successfully entry by ID.", database.entryById(Number(req.params.id))) )
}

module.exports = { getAll, getAllUsersAllEntries, getUser, getUserById, getEntryById }