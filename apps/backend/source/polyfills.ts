import * as crypto from 'crypto';
import WebSocket from 'ws';

if (!(<any>global).crypto) {
  (<any>global).crypto = crypto;
}

if (!(<any>global).WebSocket) {
  (<any>global).WebSocket = WebSocket;
}
