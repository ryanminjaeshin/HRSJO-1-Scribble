const io = require("socket.io-client");

const establishIoConnection = function (pathName) {
  return io("/lobby-" + pathName);
};

export default establishIoConnection;
