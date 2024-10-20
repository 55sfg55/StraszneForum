/*
This file is intended to simulate database connection. Import is our connection, and functions represent specific querries.
*/

let users = [
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
let entries = [
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

export function delEntry(argEntryID) {
    entries = entries.filter(entry => entry.id !== argEntryID)
}

export function allUsersAllEntries() {
    return users.map(user => {
        // Filter entries for the current user
        return entries.filter(entry => entry.userId === user.id).map(entry => JSON.parse(JSON.stringify(entry)))
    })
/*
    users.map(user => {
        // Filter entries for the current user
        const userEntries = database.allUsersAllEntries()

        return {
            id: user.id,
            username: user.username,
            allEntries: userEntries
        };
    });
*/
}

export function getUserByUsername(argUsername) {
    return    users.find(user => user.username === argUsername)
}

export function getUserByID(argID) {
    return    users.find(user => user.id === argID)
}

export function getUserWithAllEntries(argID) {
    return    entries.filter( entry => entry.userId === argID ).map(entry => JSON.parse(JSON.stringify(entry)));
}

export function getTableEntries() {
    return entries.map(entry => JSON.parse(JSON.stringify(entry)));
}

export function getEntryByID(argID) {
    return  entries.find( entry => entry.id === argID );
}

export function getFromEntriesManyIDs(argManyIDs) {
    const idSet = new Set(argManyIDs);
    return    entries
                .filter(obj => idSet.has(obj.id)) 
                .map(obj => JSON.parse(JSON.stringify(obj))); 
}

export function postEntry(userID, argContent) {
    entries.push( {
        id: entries[entries.length-1].id+1,
        userId: userID,
        content: argContent
    })
}

export function getUserWithPassswordAndID(argUserID, argPassword) {
    return    (users.find(user => user.id === argUserID && user.password === argPassword) === undefined)
}

export function getUserWithPassswordAndUsername(argUsername, argPassword) {
    const temp = users.find(user => user.username === argUsername && user.password === argPassword)
    if ( !(temp === undefined) ) {
        return {
            id: temp.id,
            username: temp.username
        }
    }
    else {
        return undefined
    }
}

export function postUser(argUsername, argPassword) {
    users.push(
        {
            id: users[users.length - 1].id + 1,
            username: argUsername,
            password: argPassword
        }
    )
    return true
}

export function getUserByUsernameVersion2(argUsername) {
    return !(users.find(user => user.username === argUsername) === undefined)
}

export function getManyUsersByID(argManyIDs) {
    const idSet = new Set(argManyIDs);
    return users
        .filter(obj => idSet.has(obj.id)) 
        .map(obj => JSON.parse(JSON.stringify(obj))); 
}