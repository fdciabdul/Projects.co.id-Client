import {Client,WebSocketClient} from './main.js';

async function startClient() {
  try {
    const client = new Client();
    await client.login('username', 'password');
    const myBids =  await client.getMyBids();
    const getNewProject = await client.getNewProject();
    const searchProject = await client.seacrhProject("scraping");
    console.log(myBids,getNewProject,searchProject);
  } catch(error) {
    console.error(error);
  }
}

async function startSocket(){
  const client = new WebSocketClient('wss://push.projects.co.id/');
client.open('authkey');
client.onMessage();
client.onError();
}

