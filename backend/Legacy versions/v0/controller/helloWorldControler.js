import * as database from '../databases/helloWorldDatabase.js'
import * as utils from '../utils/helloWorldUtils.js'

// General requestes:
export function getAllUsersAllEntries(req, res) {
    const tempResponse = new utils.helloWorldResponse()
    tempResponse.setMessage( "Failed to get all entries from all users, organised by users." )

    tempResponse.setData( database.allUsersAllEntries() )
    // to implement:  Verify that the data has been successfully retrieved from the database.
    tempResponse.setAll(true, "Successfully got all entries from all users, organised by users.")
    res.json( tempResponse.responseDef )
}


// User-related requestes:
export function getAllEntriesOfUser(req, res) {
    const tempResponse = new utils.helloWorldResponse()
    tempResponse.setMessage( "Failed to get userdata." )

    const userID = Number(req.params.id);

    tempResponse.setData( database.userAllEntries( userID ) )
    // to implement:  Verify that the data has been successfully retrieved from the database.
    tempResponse.setAll( true, "Successfully got all entries of user by ID." )
    res.json( tempResponse )
}

export function getUserById(req, res) {
    const tempResponse = new utils.helloWorldResponse()
    tempResponse.setMessage( "Failed to get userdata by ID." )

    tempResponse.setData( database.userIdToData( Number(req.params.id) ) )
    // to implement:  Verify that the data has been successfully retrieved from the database.
    tempResponse.setAll(true, "Successfully got user data by ID.")

    res.json( tempResponse.responseDef )
}

export function getManyUsersByID(req, res) {
    const tempResponse = new utils.helloWorldResponse()
    tempResponse.setMessage( 'Failed to get many users by ID.' )

    // console.log(JSON.parse(`{"manyids": ${req.params.asd.split('=')[1]}}`));
    const parsedParams = JSON.parse(`{"manyids": ${req.params.manyids}}`); 

    const querry = database.usersByManyIDs( parsedParams.manyids )
    // to implement:  Verify that the data has been successfully retrieved from the database.
    tempResponse.setAll(true, "Successfully got many users by ID.")

    tempResponse.setData(
        {
            manyUsersData: querry
        }
    )

    res.json( tempResponse.responseDef )
}

// Entry-related requestes:
export function getEntryById(req, res) {
    const tempResponse = new utils.helloWorldResponse()
    tempResponse.setMessage( "Failed to get entry by ID." )

    tempResponse.setData( database.entryById(Number(req.params.id)) )
    // to implement:  Verify that the data has been successfully retrieved from the database.
    tempResponse.setAll(true, "Successfully got entry by ID.")

    res.json( tempResponse.responseDef )
}

export function postEntry(req, res) {
    const tempResponse = new utils.helloWorldResponse()
    tempResponse.setMessage("Failed to post new entry.")

    if ( database.postEntry(req.body.token, req.body.content) ) {
        tempResponse.setAll(true, "Entry posted.")
    }
    else {
        tempResponse.setAll(false, "Entry was not posted.")
    }
    res.json( tempResponse.responseDef )
}

export function deleteEntry(req, res) {
    const tempResponse = new utils.helloWorldResponse()
    tempResponse.setMessage("Failed to delete entry.")

    if ( database.delEntry(req.body.token, req.body.entryID) ) {
        tempResponse.setAll(true, "Entry removed.")
    }
    else {
        tempResponse.setAll(false, "Entry was not removed.")
    }
    res.json( tempResponse.responseDef )
}

export function getAllEntries(req, res) {
    const tempResponse = new utils.helloWorldResponse()
    tempResponse.setMessage( "Failed to get all entries." )

    tempResponse.setData( database.allEntries() )
    // to implement:  Verify that the data has been successfully retrieved from the database.
    tempResponse.setAll(true, "Successfully got all entries.")

    res.json( tempResponse.responseDef )
}

export function getManyEntriesByID(req, res) {
    const tempResponse = new utils.helloWorldResponse()
    tempResponse.setMessage( 'Failed to get many entries by ID.' )

    // console.log(JSON.parse(`{"manyids": ${req.params.asd.split('=')[1]}}`));
    const parsedParams = JSON.parse(`{"manyids": ${req.params.manyids}}`); 

    const querry = database.entriesByManyIDs( parsedParams.manyids )
    // to implement:  Verify that the data has been successfully retrieved from the database.
    tempResponse.setAll(true, "Successfully got many entries by ID.")

    tempResponse.setData(
        {
            manyEntries: querry
        }
    )

    res.json( tempResponse.responseDef )
}