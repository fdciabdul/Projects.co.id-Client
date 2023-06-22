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

### Listen notification

in here you need an auth key , since i don't know how to produce or revenge the authKey , you can do it manually 

* open the projects.co.id 
* login to your account
* see the network traffic for push.projects.co.id

![asd](https://telegra.ph/file/ec30cd5141c97e48cd76b.png)

look up at first socket send message , get your authkey in there 

```javascript
const client = new WebSocketClient();
client.open('authkey');
client.onMessage();
client.onError();
```