import React from "react";
import Sketch from "react-p5";
import SocketEvents from "../lib/enums/socketEvents";

function ScribbleBoard({ socket, currentDrawer }) {
  let x = 50;
  const y = 50;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
    p5.background(0);

    socket.on(SocketEvents.DRAW, function (data) {
      console.log("Got: " + data.x + " " + data.y);
      p5.fill(0, 0, 255);
      p5.noStroke();
      p5.ellipse(data.x, data.y, 20, 20);
    });
  };

  function sendmouse(xpos, ypos) {
    // console.log("sendmouse: " + xpos + " " + ypos);

    // Make a little object with  and y
    var data = {
      x: xpos,
      y: ypos,
    };

    // Send that object to the socket
    socket.emit(SocketEvents.DRAW, data);
  }

  function mouseDragged(p5) {
    // Draw some white circles

    if (currentDrawer) {
      p5.fill(255);
      p5.noStroke();
      p5.ellipse(p5.mouseX, p5.mouseY, 20, 20);
      // Send the mouse coordinates
      sendmouse(p5.mouseX, p5.mouseY);
    }
  }

  return <Sketch setup={setup} mouseDragged={mouseDragged} />;
}

export default ScribbleBoard;
