class User {
  constructor(userName, userId) {
    this.userName = userName;
    this.userId = userId;
    this.currentScore = 0;
    this.guessedCorrectly;
    this.readyStatus = false;
  }

  updateProperty(property, value) {
    this[property] = value;
  }
}

export default User;
