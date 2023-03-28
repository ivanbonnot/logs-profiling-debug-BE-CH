class User {
    constructor(user, password, email, address, phone, avatar) {
      this.timestamp = Date.now();
      this.user = user;
      this.password = password;
      this.email = email;
      this.address = address;
      this.phone= phone;
      this.avatar = avatar;
    }
  }
  
  module.exports = User;