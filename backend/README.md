# Forum - Backend API Documentation
**Important:**
_This code isn't secure. Do not use this version in a production application; it is an alpha version that is not yet finished._

**Description:**
_This API is designed to handle forum-related features, including user authentication, message boards, and data management for user entries. It enables developers to integrate login systems and user-based thread interactions into their applications._

**Version:**
_The current version includes a message board (chat) feature and basic client authentication._

---

**Table of Contents
1. [Introduction](#introduction)
2. [How to Run API](#how-to-run-api)
3. [Hello API](#hello-api)
4. [API Structure](#api-structure)
5. [API Endpoints](#api-endpoints)
6. [Future Plans](#Future-Plans)
---

### How to run API:
In order to run API you must start the server, by running the app.js file (backend/app.js), which can be done by executing command: 
```bash
node app.js
```
By default API can be accessed at localhost port 3000 (http://127.0.0.1:3000/).

### Hello API:
Health check for the API.
To check if the API is running correctly, send a request to the root URL (`http://127.0.0.1:3000/`) using either a browser or the following JavaScript code:
```javascript
fetch("http://127.0.0.1:3000/")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```
Output:
```json
{
    "success": true,
    "message": "Successfully connected to the main api.",
    "data": null
}
```
You can check the same way all versions of api, by checking main path.
### API structure:
Overview of the logic behind the endpoint design. Currently describing the message board functionality, as the API is still in the alpha stage.

- All root paths must include the API version name you wish to use, e.g. v0 in example.com/helloworld/v0.

- /helloworld/ - root path for each version of message board (chat) APIs.
  /helloworld/v0/ - Alpha version of api, still under development. Can be used for authentication (login) system, or basic thread/chat display testing.

- /helloworld/ structure:
    /helloworld/v0/users/ - endpoint for user data related tasks. Includes user authentication (login) system.
    /helloworld/v0/entries/ - endpoint for entry related tasks.

## API endpoints:
1. GET /helloworld/v0/users/:id - Retrieve user data by ID (with password redacted). Use cautiously, as it can lead to data leak.
```javascript
fetch("http://127.0.0.1:3000/helloworld/v0/users/0/")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```
output:
```json
{
  "success": true,
  "message": "Successfully got user data by ID.",
  "data": {
    "id": 0,
    "username": "admin",
    "password": "Access denied." }
}
```
2. GET /helloworld/v0/users/:id/allentries - get all entries of the user.
```javascript
fetch("http://127.0.0.1:3000/helloworld/v0/users/0/allentries")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

```
output:
```json
{
  "responseDef": {
    "success":true,
    "message":"Successfully got all entries of user by ID.",
    "data": [
      {
        "id":0,
        "userId":0,
        "content":"Wpis testowy - hardcoded"
      },
      {
        "id":2,
        "userId":0,
        "content":"wpis testowy nr. 2 pierwszego admina - hardcoded"
      }
    ]
  }
}
```
3. POST /hellowolrd/v0/users/login - self-explanatory. Use body of the request to provide username and password.

body:
```json
{
  "username": "admin",
  "password": "1234"
}
```
```javascript
fetch("http://127.0.0.1:3000/helloworld/v0/users/login", {
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
output:
```json
{
  "success":true,
  "message":"Password is correct.  Successfully processed request.",
  "data":
  {
    "isPasswordCorrect":true,
    "token":"m23vnvoi-1728507086803"
  }
}
```
4. POST /helloworld/v0/users/register self-explanatory. Use body of the request to provide username and password.
body:
```json
{
  "username": "admin7",
  "password": "1234"
}
```
```javascript
fetch("http://127.0.0.1:3000/helloworld/v0/users/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    username: "admin7",
    password: "1234"
  })
})
  .then(response => response.json())
  .then(data => console.log(JSON.stringify(data)))
  .catch(error => console.error('Error:', error));
```
output:
```json
{
  "success":true,
  "message":"User was registered.",
  "data":null
}
```
5. POST /helloworld/v0/users/checksession - let you check if client's section is active, for testing purposes. Use body to provide token.
body
```json
{
  "token": "m23vy9eh-1728507571146"
}
```
```javascript
fetch("http://127.0.0.1:3000/helloworld/v0/users/checksession", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    token: "m23vy9eh-1728507571146"
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```
output:
```
{
  "success": true,
  "message": 'Token is correct.',
  "data": null
}
```
6. GET /helloworld/v0/entries/:id - get entry based on id.
```javascript
fetch("http://127.0.0.1:3000/helloworld/v0/entries/0")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```
output:
```json
{
  "success": true,
  "message": 'Successfully got entry by ID.',
  data: [
  {
    "id": 0,
    "userId": 0,
    "content": 'Wpis testowy - hardcoded'
  }
  ]
}
```
7. GET /helloworld/v0/allUsersAllEntries - (ONLY for testing purposes) returns all users, and all user entries as a field.
```javascript
  fetch("http://127.0.0.1:3000/helloworld/v0/allusersallentries")
   .then(response => response.json())
   .then(data => console.log(data))
   .catch(error => console.error('Error:', error));
```
output:
```json
{
  "success": true,
  "message": 'Successfully got all entries from all users, organised by users.',
  "data": [
    { "id": 0, "username": 'admin', allEntries: [Array] },
    { "id": 1, "username": 'admin2', allEntries: [Array] }
  ]
}
```
[Array] example (array of user's entries):
```json
[
  { "id": 0, "username": 'admin', "allEntries": [ [Object], [Object] ] },
  { "id": 1, "username": 'admin2', allEntries: [ [Object], [Object] ] }
]
```
[Object] example (entry):
```json
{
    "id": 2,
    "userId": 0,
    "content": 'wpis testowy nr. 2 pierwszego admina - hardcoded'
}
```


## Future Plans
- **Error Handling**: Comprehensive error handling will be added in the next update.
- **Versioning Strategy**: Future updates will focus on completing the user authentication feature and adding entry posting. Once these are complete, development will proceed toward v1 of the API with additional forum endpoints.
