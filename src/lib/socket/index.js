const io = require("socket.io-client");

const establishIoConnection = function (pathName) {
  return io(pathName);
};

export default establishIoConnection;
