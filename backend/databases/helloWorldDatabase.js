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
let sessions = [
]
const sessionTime = 1000 * 60 * 1 

function addSession(argID, argToken) {
    sessions.push( {
        id: argID,
        token: argToken,
        exp: Date.now() + sessionTime
    } )
}
function checkSessionByID(argID) {
    const querry = sessions.find( session => session.id === argID )
    if ( querry === undefined ) {
        return true
    }
    else {
        return false
    }
}
function checkSessionByToken(argToken) {
    const querry = sessions.find( session => session.token === argToken )
    if ( querry === undefined ) {
        return true
    }
    else {
        return false
    }
}
function clearSessions() {
    sessions = sessions.filter(session => session.exp < Date.now())
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