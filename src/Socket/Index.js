import WebSocket from "ws";

class WebSocketClient {
    constructor(url) {
        this.url = url;
        this.ws = new WebSocket(this.url);
    }

    open(auth) {
        this.ws.on('open', () => {
            const loginMessage = {
                cmd: "login",
                auth: auth
            };
            this.ws.send(JSON.stringify(loginMessage));
        });
    }

    onMessage() {
        this.ws.on('message', (data) => {
            const str = data.toString();  // Convert buffer to string
            const obj = JSON.parse(str);  // Convert string to object
            console.log(obj);
        });
    }

    onError() {
        this.ws.on('error', (err) => {
            console.error('WebSocket encountered error: ', err.message, 'Closing connection...');
            this.ws.close();
        });
    }
}

export default WebSocketClient;