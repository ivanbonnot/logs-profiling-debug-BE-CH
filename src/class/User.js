class User {
    constructor(user, email, password, address, phone, avatar) {
      this.timestamp = Date.now();
      this.user = user;
      this.email = email;
      this.password = password;
      this.address = address;
      this.phone= phone;
      this.avatar = avatar;
    }
  }
  
  module.exports = User;