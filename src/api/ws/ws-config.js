let socket;
export const connectWs = connectionEstablished => {
  socket = new WebSocket('wss://simplistic-kick.glitch.me/ws');
  socket.onopen = connectionEstablished;
};

export const getSocket = () => {
  return socket;
};
