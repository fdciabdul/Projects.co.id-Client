<center>

 <img src="https://cdn.projects.co.id/assets/img/projectscoid.png">

Unofficial client for Projects.co.id get latest latest project , your bids , finance , and search for open project

</center>

## Install 

```bash
npm install projects.co.id
```

## Usage

Call the class 
```javascript
   import {Client,WebSocketClient} from 'projects.co.id';
   const client = new Client();
   ```

* Login
```javascript
    await client.login('username', 'password');
```
* Get new project
```javascript
   await client.getNewProject();
```
* Get my bids
```javascript
   await client.getMyBids();
```
* Search Project
```javascript
 await client.seacrhProject("query");
```