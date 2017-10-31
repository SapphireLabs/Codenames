import io from 'socket.io-client';

const socket = io('http://localhost:3001');

export const socketEvents = {
  JOIN_SOCKET_ROOM: 'JOIN_SOCKET_ROOM',
  JOIN_GAME: 'JOIN_GAME',
  UPDATE_PLAYER: 'UPDATE_PLAYER',
  UPDATE_GAME: 'UPDATE_GAME',
  TOGGLE_READY: 'TOGGLE_READY',
  START_GAME: 'START_GAME',
};

export default socket;
