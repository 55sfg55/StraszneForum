import * as database from '../databases/forumDatabase.js'; // Adjust this path as necessary
import * as utils from '../utils/responseModel.js'; // Adjust this path as necessary

// Function to get a thread by ID
export function getThreadByID(req, res) {
    const response = new utils.response();
    response.setMessage("Failed to get thread by ID.");

    database.getThreadById(req.params.id, (result, err) => {
        if (err || result === undefined) {
            response.setMessage("Couldn't find the thread in the database.");
            console.log(err, 123);
        } else {
            response
                .setSuccess(true)
                .setData(result)
                .setMessage("Successfully got the thread data by ID.");
        }
        res.json(response);
    });
}

// Function to get all threads
export function getAllThreads(req, res) {
    const response = new utils.response();
    response.setMessage("Failed to get all threads data.");

    database.getAllThreads((result, err) => {
        if (err || result === undefined) {
            response.setMessage("Couldn't get all threads data.");
            console.log(err, 123);
        } else {
            response
                .setSuccess(true)
                .setData({ threads: result }) // Clear description of the data structure being returned
                .setMessage("Successfully got all threads.");
        }
        res.json(response);
    });
}

// Function to get multiple threads by IDs from the URL
export function getManyThreadsByID(req, res) {
    const response = new utils.response();
    response.setMessage("Failed to get threads by IDs.");

    // Parse the manyids parameter from the URL
    const ids = req.params.manyids.split(',').map(id => id.trim());

    if (ids.length === 0) {
        response.setMessage("Invalid or missing IDs.");
        return res.json(response);
    }

    database.getThreadsByIds(ids, (result, err) => {
        if (err || result === undefined) {
            response.setMessage("Couldn't get threads with the specified IDs.");
            console.log(err, 123);
        } else {
            response
                .setSuccess(true)
                .setData({ threads: result }) // Clear description of the data structure being returned
                .setMessage("Successfully got threads by IDs.");
        }
        res.json(response);
    });
}

// Function to get threads by user ID
export function getThreadsByUserID(req, res) {
    const response = new utils.response();
    response.setMessage("Failed to get threads for user ID.");

    database.getThreadsByUserId(req.params.userId, (result, err) => {
        if (err || result === undefined) {
            response.setMessage("Couldn't find threads for the specified user.");
            console.log(err, 123);
        } else {
            response
                .setSuccess(true)
                .setData({ threads: result })
                .setMessage("Successfully got threads for user ID.");
        }
        res.json(response);
    });
}

// Function to create a new thread
export function createThread(req, res) {
    const response = new utils.response();
    const { title, content, userId } = req.body; // Assuming the body contains title, content, and userId

    if (!title || !userId) {
        response.setMessage("Missing required fields: title or userId.");
        return res.json(response);
    }

    database.createThread(title, content, userId, (result, err) => {
        if (err) {
            response.setMessage("Couldn't create the thread.");
            console.log(err, 123);
        } else {
            response
                .setSuccess(true)
                .setData(result) // Return the created thread data
                .setMessage("Successfully created the thread.");
        }
        res.json(response);
    });
}

// Function to get entries by thread ID
export function getEntriesByThreadID(req, res) {
    const response = new utils.response();
    response.setMessage("Failed to get entries for thread ID.");

    database.getEntriesByThreadId(req.params.threadId, (result, err) => {
        if (err || result === undefined) {
            response.setMessage("Couldn't find entries for the specified thread.");
            console.log(err, 123);
        } else {
            response
                .setSuccess(true)
                .setData({ entries: result })
                .setMessage("Successfully got entries for thread ID.");
        }
        res.json(response);
    });
}

// Function to get entries by user ID
export function getEntriesByUserID(req, res) {
    const response = new utils.response();
    response.setMessage("Failed to get entries for user ID.");

    database.getEntriesByUserId(req.params.userId, (result, err) => {
        if (err || result === undefined) {
            response.setMessage("Couldn't find entries for the specified user.");
            console.log(err, 123);
        } else {
            response
                .setSuccess(true)
                .setData({ entries: result })
                .setMessage("Successfully got entries for user ID.");
        }
        res.json(response);
    });
}

// Function to create a new entry
export function createEntry(req, res) {
    const response = new utils.response();
    const { title, content, userId, threadId } = req.body; // Assuming the body contains these fields

    if (!title || !content || !userId || !threadId) {
        response.setMessage("Missing required fields: title, content, userId, or threadId.");
        return res.json(response);
    }

    database.createEntry(title, content, userId, threadId, (result, err) => {
        if (err) {
            response.setMessage("Couldn't create the entry.");
            console.log(err, 123);
        } else {
            response
                .setSuccess(true)
                .setData(result) // Return the created entry data
                .setMessage("Successfully created the entry.");
        }
        res.json(response);
    });
}

// Function to get multiple entries by IDs from the URL
export function getManyEntriesByID(req, res) {
    const response = new utils.response();
    response.setMessage("Failed to get entries by IDs.");

    // Parse the manyids parameter from the URL
    const ids = req.params.manyids.split(',').map(id => id.trim());

    if (ids.length === 0) {
        response.setMessage("Invalid or missing IDs.");
        return res.json(response);
    }

    database.getEntriesByIds(ids, (result, err) => {
        if (err || result === undefined) {
            response.setMessage("Couldn't get entries with the specified IDs.");
            console.log(err, 123);
        } else {
            response
                .setSuccess(true)
                .setData({ entries: result }) // Clear description of the data structure being returned
                .setMessage("Successfully got entries by IDs.");
        }
        res.json(response);
    });
}


// Function to get all entries
export function getAllEntries(req, res) {
    const response = new utils.response();
    response.setMessage("Failed to get all entries data.");

    database.getAllEntries((result, err) => {
        if (err || result === undefined) {
            response.setMessage("Couldn't get all entries data.");
            console.log(err, 123);
        } else {
            response
                .setSuccess(true)
                .setData({
                    entries: result // Clear description of the data structure being returned
                })
                .setMessage("Successfully got all entries.");
        }
        res.json(response);
    });
}

// Function to get an entry by ID
export function getEntryByID(req, res) {
    const response = new utils.response();
    response.setMessage("Failed to get entry by ID.");

    database.getEntryById(req.params.id, (result, err) => {
        if (err || result === undefined) {
            response.setMessage("Couldn't find the entry in the database.");
            console.log(err, 123);
        } else {
            response
                .setSuccess(true)
                .setData(result)
                .setMessage("Successfully got the entry data by ID.");
        }
        res.json(response);
    });
}
