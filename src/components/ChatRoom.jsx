import React, { useState, useEffect } from "react";
import SocketEvents from "../lib/enums/socketEvents";
import moment from "moment";
import Chat from "./Chat";

function ChatRoom({ socket }) {
  const [messages, updateMessage] = useState([]);

  useEffect(() => {
    function addMessages(message) {
      let newMessages = messages.concat(message);
      updateMessage(newMessages);
    }

    socket.on(SocketEvents.LOBBY_MESSAGE, addMessages);
    return () => {
      socket.off(SocketEvents.LOBBY_MESSAGE, addMessages);
    };
  }, [messages]);

  return (
    <>
      {messages.map((message, i) => {
        return <Chat message={message} key={message} />;
      })}
    </>
  );
}

export default ChatRoom;
