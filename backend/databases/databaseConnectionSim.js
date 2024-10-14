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

export function delEntry(argEntryID) {
    entries = entries.filter(entry => entry.id !== argEntryID)
}