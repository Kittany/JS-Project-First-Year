export default class User {
  username;
  password;
  email;
  firstName;
  lastName;
  birthDate;
  phoneNumber;
  profilePicture;
  address = { city, street };
  isAdmin;
  heroGameHighScore = 0;
  hunterGameHighScore = 0;
  constructor(
    username,
    password,
    email,
    firstName,
    lastName,
    birthDate,
    phoneNumber,
    profilePicture,
    city,
    street,
    isAdmin
  ) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.phoneNumber = phoneNumber;
    this.profilePicture = profilePicture;
    this.city = city;
    this.street = street;
    this.isAdmin = isAdmin;
  }
}
