export let users = [
    {
        id: 0,
        username: "admin",
        password: "1234",
    },
    {
        id: 1,
        username: "admin2",
        password: "abcd",
}]
export let entries = [
    {
        id: 0,
        userId: 0,
        content: "Wpis testowy - hardcoded"
    },
    {
        id: 1,
        userId: 1,
        content: "Wpis testowy drugiego adminka - hardcoded"
    },
    {
        id: 2,
        userId: 0,
        content: "wpis testowy nr. 2 pierwszego admina - hardcoded"
    },
    {
        id: 3,
        userId: 1,
        content: "Wpis testowy nr.2 DRUGIEGO aminka - hardcoded"
    },
    
]

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
            return true
        }
        stopSessionByUserID( argID )
        return false
    }
    else {
        return false
    }
}
export function checkSessionByToken(argToken) {
    //console.log(sessions, argToken, Date.now())
    // Put here any validation etc.:
    argToken = String(argToken)


    const querry = sessions.find( session => session.token  === argToken )
    if ( querry === undefined ) {
        return false
    }
    else {
        if (querry.exp > Date.now()) {
            return true
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

export function allUsersAllEntries() {
    return users.map(user => {
        // Filter entries for the current user
        const userEntries = entries.filter(entry => entry.userId === user.id).map(entry => JSON.parse(JSON.stringify(entry)));

        return {
            id: user.id,
            username: user.username,
            allEntries: userEntries
        };
    });
}

export function userUsernameToId(argUsername) {
    let temp;
    temp = users.find(user => user.username === argUsername)
    temp = temp ? JSON.parse(JSON.stringify(temp)) : undefined;
    if (temp) {
        temp.password = "Access denied."
    }
    return temp.id;
}

export function userIdToData(argId) {
    let temp;
    temp = users.find(user => user.id === argId)
    temp = temp ? JSON.parse(JSON.stringify(temp)) : undefined;
    if(temp && temp.password) {
        temp.password = "Access denied."
    }
    return temp;
}

export function userAllEntries(argId) {
    const temp = entries.filter( entry => entry.userId === argId ).map(entry => JSON.parse(JSON.stringify(entry)));
    return temp;
}

export function entryById(argId) {
    const temp = entries.filter( entry => entry.id === argId ).map(entry => JSON.parse(JSON.stringify(entry)));;
    return temp;
}

// add token and session handler
export function checkPassword(argId, argPassword) {
    let temp;
    temp = users.find(user => user.id === argId && user.password === argPassword)
    temp = temp ? JSON.parse(JSON.stringify(temp)) : undefined;
    return !(temp === undefined)
}
export function checkPasswordByUsername(argUsername, argPassword) {
    let temp;
    temp = users.find(user => user.username === argUsername && user.password === argPassword)
    temp = temp ? JSON.parse(JSON.stringify(temp)) : undefined;
    return !(temp === undefined)
}
export function register( argUsername, argPassword ) {
    let temp;
    temp = users.find(user => user.username === argUsername)
    if( temp === undefined ) {
        const newID = users[users.length - 1].id
        users.push(
            {
                id: newID,
                username: argUsername,
                password: argPassword
            }
        )
        return true
    }
    return false
}
export function loginByUsername(argUsername, argPassword) {
    let temp;
    temp = users.find(user => user.username === argUsername && user.password === argPassword)
    temp = temp ? JSON.parse(JSON.stringify(temp)) : undefined;
    if ( !(temp === undefined) ) {
        stopSessionByUserID( temp.id )
        const token = generateRandomKey(argUsername)
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

// session cleaning, once 10 sec for now.
setInterval(() => {
    clearSessions()
}, 1000 * 10 );