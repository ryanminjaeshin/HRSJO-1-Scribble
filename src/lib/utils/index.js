class EventOptions {
  constructor(options) {
    this.message = options.message;
    this.event = options.event;
    this.target = options.target;
  }
}

module.exports = {
  EventOptions,
};
