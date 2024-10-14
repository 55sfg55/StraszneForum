import * as database from './databaseConnectionSim.js'
import { checkSessionByToken } from './sessionsDatabase.js'



export function allUsersAllEntries() {
    return database.users.map(user => {
        // Filter entries for the current user
        const userEntries = database.entries.filter(entry => entry.userId === user.id).map(entry => JSON.parse(JSON.stringify(entry)));

        return {
            id: user.id,
            username: user.username,
            allEntries: userEntries
        };
    });
}

export function usersByManyIDs(argManyIDs) {
    const idSet = new Set(argManyIDs);
    return database.users
        .filter(obj => idSet.has(obj.id)) 
        .map(obj => JSON.parse(JSON.stringify(obj))); 
}

export function userUsernameToId(argUsername) {
    let temp;
    temp = database.users.find(user => user.username === argUsername)
    temp = temp ? JSON.parse(JSON.stringify(temp)) : undefined;
    if (temp) {
        temp.password = "Access denied."
    }
    return temp.id;
}

export function userIdToData(argId) {
    let temp;
    temp = database.users.find(user => user.id === argId)
    temp = temp ? JSON.parse(JSON.stringify(temp)) : undefined;
    if(temp && temp.password) {
        temp.password = "Access denied."
    }
    return temp;
}

export function userAllEntries(argId) {
    const temp = database.entries.filter( entry => entry.userId === argId ).map(entry => JSON.parse(JSON.stringify(entry)));
    return temp;
}

export function entriesByManyIDs(argManyIDs) {
    const idSet = new Set(argManyIDs);
    return database.entries
        .filter(obj => idSet.has(obj.id)) 
        .map(obj => JSON.parse(JSON.stringify(obj))); 
}

export function entryById(argId) {
    const temp = database.entries.find( entry => entry.id === argId );
    return temp;
}
export function allEntries(argId) {
    const temp = database.entries.map(entry => JSON.parse(JSON.stringify(entry)));
    return temp;
}

export function postEntry(argToken, argContent) {
    const querry = checkSessionByToken(argToken)
    if (querry) {
       database.entries.push( {
            id: database.entries[database.entries.length-1].id+1,
            userId: querry.userID,
            content: argContent
        })
        //console.log(entries, querry, users)
        return true
    }
    else {
        return false
    }
}

export function delEntry(argToken, argEntryID) {
    const querry = checkSessionByToken(argToken)
    const entry = entryById(Number(argEntryID))
    //console.log(querry, entry, argToken, argEntryID, database.entries)
    if (entry.userId == querry.userID) {
        if (querry) {
            database.delEntry( Number(argEntryID) )
            return true
        }
        else {
            return false
        }
    }
    else {
        return false
    }
}