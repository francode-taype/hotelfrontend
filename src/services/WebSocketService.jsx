import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebSocketService {
  constructor() {
    if (!this.client) {
      this.client = new Client({
        brokerURL: 'ws://localhost:8080/ws', // Cambia esto si es necesario
        connectHeaders: {},
        debug: (str) => {
          console.log(str);  // Logs de depuración
        },
        reconnectDelay: 5000,
        onConnect: (frame) => {
          console.log('Conectado a WebSocket:', frame);

          // Suscripción al tópico para habitaciones
          this.client.subscribe('/topic/rooms', (message) => {
            console.log('Mensaje recibido por WebSocket:', message.body);
            const room = JSON.parse(message.body);
            this.handleRoomUpdate(room);
          });
        },
        onWebSocketError: (error) => {
          console.error('Error WebSocket:', error);
        },
        onDisconnect: () => {
          console.log('Desconectado de WebSocket');
        },
        webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      });

      if (!this.client.active) {
        this.client.activate();
      }
    }
  }

  handleRoomUpdate(room) {
    console.log('Habitación actualizada:', room);
    // Aquí puedes manejar la actualización de la habitación en React
  }

  deactivate() {
    if (this.client && this.client.connected) {
      this.client.deactivate();
    }
  }
}

export default new WebSocketService();
