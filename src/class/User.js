class User {
    constructor(user, password, email, address, phone, avatar, cart) {
      this.timestamp = Date.now();
      this.user = user;
      this.password = password;
      this.email = email;
      this.address = address;
      this.phone= phone;
      this.avatar = avatar;
      this.cart = cart;
    }
  }
  
  module.exports = User;