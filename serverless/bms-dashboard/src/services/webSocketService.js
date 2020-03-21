import WebSocket from 'isomorphic-ws';

const WS_URL = 'wss://5xcuq4dlm1.execute-api.eu-central-1.amazonaws.com/dev';

let WSService = null;

class WebSocketService {
  constructor() {
    this.websocket = null;
    this.messageListeners = [];
    this.isOpen = false;
  }

  initSocket = () => {
    this.websocket = new WebSocket(WS_URL);
    this.websocket.onopen = this.onConnOpen;
    this.websocket.onmessage = this.onMessage;
    this.websocket.onclose = this.onConnClose;
  };

  onConnOpen = () => {
    this.isOpen = true;
    console.log('Websocket connected!');
  };

  onConnClose = () => {
    console.log('Websocket closed!');
  };

  addMessageListener = (systemId, listener) => {
    if (!systemId || typeof listener !== 'function') {
      return;
    }
    this.messageListeners.push({
      systemId,
      listener
    });
  };

  onMessage = data => {
    if (data) {
      const message = JSON.parse(data.data);
      const typeListener = this.messageListeners.find(
        listener => listener.systemId === message.BMSHWRSN
      );

      if (typeListener && typeof typeListener.listener === 'function') {
        typeListener.listener(message);
      } else {
        console.log('No handler found for message type');
      }
    }
  };

  static initWSService() {
    if (!WSService) {
      WSService = new WebSocketService();
      WSService.initSocket();
      return WSService;
    }

    return WSService;
  }
}

export const getWSService = WebSocketService.initWSService;
