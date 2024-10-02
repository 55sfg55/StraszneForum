let users = [
    {
        id: 0,
        username: "admin",
        password: "1234",
    },
    {
        id: 1,
        username: "admin2",
        password: "1234",
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

function allUsersAllEntries() {
    return users.map(user => {
        // Filter entries for the current user
        const userEntries = entries.filter(entry => entry.userId === user.id);

        return {
            id: user.id,
            username: user.username,
            allEntries: userEntries
        };
    });
}
//console.log(allUsersAllEntries()) //test

function userUsernameToId(argUsername) {
    const temp = users.find(user => user.username === argUsername);
    temp.password = "Not for pies the password"
    return temp;
}
//console.log(userID("admin")) //test

function userIdToData(argId) {
    const temp = users.find(user => user.id === argId);
    temp.password = "Not for pies the password"
    return temp;
}
//console.log(userIdToData(0)) //test

function userAllEntries(argId) {
    const temp = entries.filter( entry => entry.userId === argId );
    return temp;
}
//console.log(userAllEntries(0)) //test

function entryById(argId) {
    const temp = entries.filter( entry => entry.id === argId );
    return temp;
}
//console.log( entry(0) ) //test

module.exports = {users, entries, allUsersAllEntries, userUsernameToId, userIdToData, userAllEntries, entryById}