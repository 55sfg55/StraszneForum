# Backend API Documentation

[Return to the main documentation](../../README.md)

---

**Backend: Table of Contents**  
1. [Versioning](#versioning)  
2. [Version list](#version-list)
2. [Output Format](#output-format)  
3. [API Endpoints](#api-endpoints)  

---

## Versioning
_The API is designed to support multiple versioned endpoints if necessary. For security reasons, it is highly advisable to use only one API version at a time, with a maximum of two versions allowed to give clients time to update. Previous endpoints should remain operational if they do not impact efficiency or functionality, but any deprecated output should be replaced with an error message._

- Version number is provided through **a.bb.ccc** format. 
    **a** - main builds, with important changes, each have own version symbol (e.g. v0 for 0.xx.xxx),
    **bb** - for all bigger changes, or added features,
    **ccc** - for all hotfixes, and bugfixes

- To access a specific version of the API, the client must call the base path of the section they wish to access and append the version symbol to the path:
    ```
    Base path: http://127.0.0.1:3000/
    API endpoint: http://127.0.0.1:3000/[version]/users/:id
    Example: http://127.0.0.1:3000/v0/users/51
    ```

- The session controller cannot handle multiple versions for security reasons. If a request cannot be resolved in the current version, it should return an error.

## Version list:
_List of symbol versions of the API._
1. **v0** - all of the code made for development purposes. Does not support forum functionality. [Version V0 docs](versions/v0/README.md)

## Output Format
- The output will always adhere to the same format, which is a JSON object with the following **structure**:
    ```typescript
    {
        "success": [boolean], // Indicates if the request was successful
        "message": [string], // A brief message describing the outcome of the request
        "data": [object] // An object containing any requested data
    }
    ```
- Example of a **successful** request output:
    ```json
    {
        "success": true,
        "message": "Successfully requested the API.",
        "data": null
    }
    ```
- Example of an **unsuccessful** request output:
    ```json
    {
        "success": false,
        "message": "Failed to login - incorrect password.",
        "data": {
            "token": null
        }
    }
    ```

## API Endpoints
_To verify accessibility to an API endpoint, request its base path._

### Sessions
---
_API endpoints related to session management._  
Base path: `http://127.0.0.1:3000/session`  

1. **Register**:
    ```javascript
    fetch("http://127.0.0.1:3000/sessions/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "admin",
        password: "1234"
      })
    })
      .then(response => response.json())
      .then(data => console.log(JSON.stringify(data)))
      .catch(error => console.error('Error:', error));
    ```

2. **Login**:
    ```javascript
    fetch("http://127.0.0.1:3000/sessions/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "admin",
        password: "1234"
      })
    })
      .then(response => response.json())
      .then(data => console.log(JSON.stringify(data)))
      .catch(error => console.error('Error:', error));
    ```

- Example of a **successful** response data field:
    ```json
    "data": {
        "token": "m2c193m4-1729000204349"
    }
    ```

3. **Verify Token**:
    ```javascript
    fetch("http://127.0.0.1:3000/sessions/verifySession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: "m2c193m4-1729000204349"
      })
    })
      .then(response => response.json())
      .then(data => console.log(JSON.stringify(data)))
      .catch(error => console.error('Error:', error));
    ```
---

### Hello World Board
---
_API endpoints related to the messaging board._  
Base path: `http://127.0.0.1:3000/helloworld/`  

(Currently undergoing a refactor process)  

--- 
