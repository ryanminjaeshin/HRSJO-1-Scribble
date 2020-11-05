import React from "react";
import moment from "moment";

function Chat({ message }) {
  console.log('MESSAGE : ', message)
  return (
    <div>
      <p>{message.message}</p>
      <span className="time-left">{moment(Date.now()).format("ddd, hA")}</span>
    </div>
  );
}

export default Chat;
