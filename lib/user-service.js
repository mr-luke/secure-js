export class UserService {
  set user(user) {
    this._user = user;
  }

  get user() {
    return this._user;
  }

  /**
   * @TODO
   *
   */

  get id() {
    return this.user._id;
  }

  get guid() {
    return this.user.guid;
  }

  get isActive() {
    return this.user.isActive;
  }

  get balance() {
    return this.user.balance;
  }

  get picture() {
    return this.user.picture;
  }

  get age() {
    return this.user.age;
  }

  get eyeColor() {
    return this.user.eyeColor;
  }

  get name() {
    return this.user.name;
  }

  get gender() {
    return this.user.gender;
  }

  get company() {
    return this.user.company;
  }

  get email() {
    return this.user.email;
  }

  get phone() {
    return this.user.phone;
  }

  get address() {
    return this.user.address;
  }

  get about() {
    return this.user.about;
  }

  get registered() {
    return this.user.registered;
  }

  get latitude() {
    return this.user.latitude;
  }

  get longitude() {
    return this.user.longitude;
  }

  get tags() {
    return this.user.tags;
  }

  get friends() {
    return this.user.friends;
  }

  get greeting() {
    return this.user.greeting;
  }
}
