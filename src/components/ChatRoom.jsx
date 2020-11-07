import React, { useState, useEffect } from "react";
import SocketEvents from "../lib/enums/socketEvents";
import moment from "moment";
import Chat from "./Chat";
import GameLobby from "../lib/gameLogic/GameLobby.js";

function ChatRoom({ socket, userName }) {
  const [messages, updateMessage] = useState([]);
  const [chatInput, updateChatInput] = useState();

  useEffect(() => {
    function addMessages(message) {
      let newMessages = messages.concat(message);
      console.log('USE EFFECT newMessages : ',newMessages);
      updateMessage(newMessages);
    }
    socket.on(SocketEvents.LOBBY_MESSAGE, addMessages);
    socket.on(SocketEvents.USER_MESSAGE, addMessages);

    return () => {
      socket.off(SocketEvents.LOBBY_MESSAGE, addMessages);
    };
  }, [messages]);

  function submitChatMessage(chatInput) {
    socket.emit(SocketEvents.SUBMIT_CHAT_MESSAGE, chatInput, (response) => {
      console.log('submitChatMessage : ', response);
    });
  }

  return (
    <>
      {messages.map((message, i) => {
        return <Chat message={message} key={message} />;
      })}
      <input
        type="text"
        value={chatInput}
        onChange={(e) => updateChatInput(e.target.value)}
      />
      <input
        type="submit"
        value="enter"
        onClick={() => {
          submitChatMessage({ guess: chatInput, userName });
          updateChatInput('');
        }}
      />
    </>
  );
}

export default ChatRoom;