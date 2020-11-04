import { io } from "../../../server/index";

function emitEvent(target, message, event) {
  io.to(target).emit(event, message);
}

export { emitEvent };
