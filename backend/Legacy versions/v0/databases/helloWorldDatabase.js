import * as database from '../../../databases/databaseConnectionSim.js'
import { checkSessionByToken } from '../../../databases/sessionsDatabase.js'



export function allUsersAllEntries() {
    return database.allUsersAllEntries()
}

export function usersByManyIDs(argManyIDs) {
    return database.getManyUsersByID(argManyIDs)
}

export function userUsernameToId(argUsername) {
    let temp;
    temp = database.getUserByUsername(argUsername)
    temp = temp ? JSON.parse(JSON.stringify(temp)) : undefined;
    if (temp) {
        temp.password = "Access denied."
    }
    return temp.id;
}

export function userIdToData(argId) {
    let temp;
    temp = database.getUserByID(argId)
    temp = temp ? JSON.parse(JSON.stringify(temp)) : undefined;
    if(temp && temp.password) {
        temp.password = "Access denied."
    }
    return temp;
}

export function userAllEntries(argId) {
    const temp = database.getUserWithAllEntries(argId)
    return temp;
}

export function entriesByManyIDs(argManyIDs) {
    return database.getFromEntriesManyIDs(argManyIDs)
}

export function entryById(argId) {
    const temp = database.getEntryByID(argId)
    return temp;
}
export function allEntries(argId) {
    const temp = database.getTableEntries()
    return temp;
}

export function postEntry(argToken, argContent) {
    const session = checkSessionByToken(argToken)
    if (session) {
       database.postEntry(session.userID, argContent)
        //console.log(entries, querry, users)
        return true
    }
    else {
        return false
    }
}

export function delEntry(argToken, argEntryID) {
    const querry = checkSessionByToken(argToken)
    const entry = entryById(Number(argEntryID)) // Can be replace by "remove entry with entryID == ? AND userID == ?"
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