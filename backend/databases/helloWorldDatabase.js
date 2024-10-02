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

export function allUsersAllEntries() {
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

export function userUsernameToId(argUsername) {
    const temp = users.find(user => user.username === argUsername);
    temp.password = "Access denied."
    return temp.id;
}
//console.log(userID("admin")) //test

export function userIdToData(argId) {
    const temp = users.find(user => user.id === argId);
    temp.password = "Access denied."
    return temp;
}
//console.log(userIdToData(0)) //test

export function userAllEntries(argId) {
    const temp = entries.filter( entry => entry.userId === argId );
    return temp;
}
//console.log(userAllEntries(0)) //test

export function entryById(argId) {
    const temp = entries.filter( entry => entry.id === argId );
    return temp;
}
//console.log( entry(0) ) //test

export function checkPassword(argId, argPassword) {
    const temp = users.find(user => user.id === argId && user.password === argPassword);
    console.log(temp)
    return false
}