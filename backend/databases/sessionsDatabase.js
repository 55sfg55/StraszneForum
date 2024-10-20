import * as database from './databaseConnectionSim.js'



function generateRandomKey(username) {
    // Simple hash function to convert the username to a numeric value
    function hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return Math.abs(hash);
    }

    // Get a hash value from the username
    const hashValue = hashString(username);

    // Get the current timestamp
    const timestamp = Date.now();

    // Generate a random string based on the hash value and timestamp
    const randomChars = (hashValue + timestamp)
        .toString(36) // Convert to base-36 to get a mix of alphanumeric characters
        .substring(0, 24); // Get the first 24 characters for the random string

    // Create the final random key
    const randomKey = `${randomChars}-${timestamp}`;

    return randomKey;
}


let sessions = [
]
const sessionTime = 1000 * 60 * 10 // secound * sec in a minute * minutes

// session cleaning, once 10 sec for now.
setInterval(() => {
    clearSessions()
}, 1000 * 10 );



function addSession(argID, argToken) {
    sessions.push( {
        userID: argID,
        token: argToken,
        exp: Date.now() + sessionTime
    } )
}
function checkSessionByUserID(argID) {
    const querry = sessions.find( session => session.id === argID )
    if ( querry !== undefined && querry.exp < Date.now()) {
        if (querry.exp > Date.now()) {
            return {
                userID: querry.id,
            }
        }
        stopSessionByUserID( argID )
        return false
    }
    else {
        return false
    }
}
export function checkSessionByToken(argToken) {
    ////console.log(sessions, argToken, Date.now())
    // Put here any validation etc.:
    argToken = String(argToken)


    const querry = sessions.find( session => session.token  === argToken )
    if ( querry === undefined ) {
        return false
    }
    else {
        if (querry.exp > Date.now()) {
            return {
                userID: querry.userID,
            }
        }
        stopSessionByUserToken(argToken)
        return false
    }
}
function stopSessionByUserID( argID ) {
    sessions = sessions.filter(session => session.id !== argID)
}
function stopSessionByUserToken( argToken ) {
    sessions = sessions.filter(session => session.token !== argToken)
}
function clearSessions() {
    sessions = sessions.filter(session => session.exp > Date.now())
}







// add token and session handler
export function checkPassword(argId, argPassword) {
    let temp;
    temp = database.getUserWithPassswordAndID(argId, argPassword)
    temp = temp ? JSON.parse(JSON.stringify(temp)) : undefined;
    return !(temp === undefined)
}
export function checkPasswordByUsername(argUsername, argPassword) {
    let temp;
    temp = database.getUserWithPassswordAndUsername(argUsername, argPassword)
    temp = temp ? JSON.parse(JSON.stringify(temp)) : undefined;
    return !(temp === undefined)
}
export function register( argUsername, argPassword ) {
    let temp;
    temp = database.getUserByUsernameVersion2(argUsername)
    //console.log(temp)
    if( temp === false ) {
        database.postUser(argUsername, argPassword)
        return true
    }
    return false
}
export function loginByUsername(argUsername, argPassword) {
    let temp;
    temp = database.getUserWithPassswordAndUsername(argUsername, argPassword)
    temp = temp ? JSON.parse(JSON.stringify(temp)) : undefined;

    if ( !(temp === undefined) ) {
        stopSessionByUserID( temp.id )
        
        const token = generateRandomKey(temp.username) // new token MUST be made based on querried data from the database.
        
        addSession(temp.id, token)
        
        return {
            isPasswordCorrect: true,
            token: token
        }
    }
    else {
        return {
            isPasswordCorrect: false,
            token: ""
        }
    }
}