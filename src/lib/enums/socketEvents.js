const SocketEvents = Object.freeze({
  ADD_USER_TO_LOBBY: "ADD_USER_TO_LOBBY",
  USER_MESSAGE: "USER_MESSAGE",
  LOBBY_MESSAGE: "LOBBY_MESSAGE",
  USERS_UPDATED: "USERS_UPDATED",
  UPDATE_USER: "UPDATE_USER",
  START_GAME: "START_GAME",
  DECREMENT_DRAW_TIMER: "DECREMENT_DRAW_TIMER",
  GAME_OVER: "GAME_OVER",
  SUBMIT_CHAT_MESSAGE: "SUBMIT_CHAT_MESSAGE",
  START_YOUR_TURN: "START_YOUR_TURN",
  DRAW: "DRAW",
});
export default SocketEvents;
