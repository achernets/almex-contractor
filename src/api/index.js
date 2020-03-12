import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { log } from 'utils/helpers';
import { get, reject } from 'lodash';

let MrkClientServiceClient = null;

const setThrift = async ({ THRIFT }) => {
  MrkClientServiceClient = new window.MrkClientServiceClient(
    new window.Thrift.Protocol(
      new window.Thrift.Transport(`${THRIFT.URL}/${THRIFT.API}/thrift/mrk-client-json`)
    )
  );
  socketInit(THRIFT);
};

let urlSocket = null;
let socketClient = null;
let subscriptions = [];
let socketReconnect = null;

const onErrorSocket = (error) => {
  log(error);
  socketReconnect = setTimeout(() => {
    connectSocket();
  }, 3000);
};

const connectSocket = () => {
  socketClient = Stomp.over(new SockJS(urlSocket));
  socketClient.debug = () => { };
  window.socketClient = socketClient;
  socketClient.connect(null, null, () => {
    clearTimeout(socketReconnect);
    subscriptions.map(item => subscribe(item.id, item.topic, item.cb));
  }, onErrorSocket);
};

const socketInit = (THRIFT) => {
  urlSocket = `${THRIFT.URL}/${THRIFT.API}/${THRIFT.SOCKET}`;
  connectSocket();
};

const subscribe = (id, topic, cb) => {
  subscriptions.push({
    id: id,
    topic: topic,
    cb: cb
  });
  if (socketClient !== null && socketClient.connected) {
    socketClient.subscribe(topic, (msg) => {
      try {
        if (cb) cb(JSON.parse(msg.body));
      } catch (error) {
        log(error);
      }
    }, { id });
  };
};

const unsubscribe = (id) => {
  const sub = get(socketClient, `subscriptions.${id}`, null);
  if (sub !== null && socketClient.connected) socketClient.unsubscribe(id);
  subscriptions = reject(subscriptions, { id });
};

const sendMessage = (topic, message) => {
  if (socketClient !== null && socketClient.connected) {
    socketClient.send(topic, {}, JSON.stringify(message));
  }
};

export {
  setThrift,
  MrkClientServiceClient,
  subscribe,
  unsubscribe,
  sendMessage
};