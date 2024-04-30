import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class WsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('ping')
  handlePing(@ConnectedSocket() client: any, @MessageBody() data: any): void {
    client.emit('pong', data);
  }

  @SubscribeMessage('code')
  handleCode(@MessageBody() data: any): void {
    this.server.emit('code', data);
  }
}
