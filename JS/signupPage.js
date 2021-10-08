import User from "./Classes/User.js";
localStorage.removeItem("IsThisFirstTime_Log_From_LiveServer");

var users = [];
//After a while we've noticed that we don't need this array to check if users already exist and such.
//we're just too lazy to remove it and fix some small parts ¯\_(ツ)_/¯, it only exists in this page, the other pages are fine.

//Admins
let hakam;
let mohamed;
let admin;
if (localStorage.getItem("Hakam") == null) {
  hakam = new User(
    "Hakam",
    "123",
    "HakamStudent@Gmail.com",
    "Hakam",
    "Mssarwe",
    "1999-30-7",
    "0504618885",
    "./lib/images/Gallery/HakamsProfilePicture.gif",
    "Milky way",
    "Earth",
    true
  );
  users.push(hakam);
  localStorage.setItem(hakam.username, JSON.stringify(hakam));
}
if (localStorage.getItem("Mohamed") == null) {
  mohamed = new User(
    "Mohamed",
    "123",
    "M_Love_1999@hotmail.com",
    "Mohamed",
    "Kittany",
    "1999-30-1",
    "0504618885",
    "./lib/images/Gallery/MohamedsProfilePicture.png",
    "Milky way",
    "Moon",
    true
  );
  users.push(mohamed);
  localStorage.setItem(mohamed.username, JSON.stringify(mohamed));
}
if (localStorage.getItem("admin") == null) {
  admin = new User(
    "admin",
    "admin1234admin",
    "admin@admin.com",
    "",
    "",
    "",
    "",
    "./lib/images/Gallery/AdminsProfilePicture.jpg",
    "Milky way",
    "Mars",
    true
  );
  users.push(admin);
  localStorage.setItem(admin.username, JSON.stringify(admin));
}

//HTML Nodes
const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const email = document.getElementById("email");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const birthDate = document.getElementById("birthDate");
const city = document.getElementById("city");
const street = document.getElementById("street");
const phoneNumber = document.getElementById("phoneNumber");
const profilePicture = document.getElementById("profilePicture");
const button = document.getElementById("button");
var imgToString;
let cities = [];

//events
button.addEventListener("click", checkForm);

//We have to convert the image to a string so we can use it forward, else the web browser will block users from uploading images
profilePicture.addEventListener("change", () => {
  const reader = new FileReader();
  reader.readAsDataURL(profilePicture.files[0]);
  reader.onload = () => {
    imgToString = reader.result;
  };
});

//Functions
function checkForm() {
  //username check
  if (username.value.length < 4 || username.value.length > 60)
    return invalidForm(username);
  else if (
    !username.value
      .toLowerCase()
      .split("")
      .every(
        (character) =>
          (character >= "a" && character <= "z") ||
          character == "@" ||
          (character.charCodeAt(0) >= 32 && character.charCodeAt(0) <= 57)
      )
  )
    return invalidForm(username);
  else if (!users.every((user) => user.username != username.value))
    //This checks if the username is already taken
    return invalidForm(username);

  username.style.borderColor = "green";

  //------------------------------------------------------------
  //Password check
  if (!(password.value.length >= 7 && password.value.length <= 12))
    return invalidForm(password);

  let validPassword = [false, false, false]; //Special character, Number, Big letter
  for (let i = 0; i < password.value.length; i++) {
    if (
      password.value[i] == "@" ||
      (password.value[i].charCodeAt(0) >= 32 &&
        password.value[i].charCodeAt(0) <= 47)
    )
      validPassword[0] = true;
    else if (password.value[i] >= "0" && password.value[i] <= "9")
      validPassword[1] = true;
    else if (password.value[i] >= "A" && password.value[i] <= "Z")
      validPassword[2] = true;
  }

  if (!validPassword.every((value) => value == true))
    return invalidForm(password);

  password.style.borderColor = "green";

  if (password.value != confirmPassword.value)
    return invalidForm(confirmPassword);

  confirmPassword.style.borderColor = "green";

  //------------------------------------------------------------
  //Email check
  if (email.value.length < 5)
    //Worst care scenario = y@y.y
    return invalidForm(email);
  else if (!users.every((user) => user.email != email.value))
    //This checks if the email is already taken
    return invalidForm(email);

  let at = 0;
  let dot = 0;
  email.value
    .toLowerCase()
    .split("")
    .forEach((item) => {
      if (
        !(
          (item >= "a" && item <= "z") ||
          (item >= "0" && item <= "9") ||
          item == "@" ||
          item == "." ||
          item == "-" ||
          item == "_"
        )
      )
        return invalidForm(email);
      else if (item == "@") at++;
      else if (item == ".") dot++;
    });

  if (at != 1 || dot == 0) return invalidForm(email);

  if (dot == 1)
    if (email.value.indexOf("@") > email.value.indexOf("."))
      return invalidForm(email);

  if (
    email.value[0] == "@" ||
    email.value[0] == "." ||
    email.value[email.value.length - 1] == "@" ||
    email.value[email.value.length - 1] == "."
  )
    return invalidForm(email);

  if (
    email.value[email.value.indexOf("@") - 1] == "." ||
    email.value[email.value.indexOf("@") + 1] == "."
  )
    return invalidForm(email);

  email.style.borderColor = "green";
  //------------------------------------------------------------
  //firstName & lastName check
  if (firstName.value.length < 3) return invalidForm(firstName);

  if (
    !firstName.value
      .toLowerCase()
      .split("")
      .every((character) => character >= "a" && character <= "z")
  )
    return invalidForm(firstName);

  firstName.style.borderColor = "green";

  if (lastName.value.length < 3) return invalidForm(lastName);

  if (
    !lastName.value
      .toLowerCase()
      .split("")
      .every((character) => character >= "a" && character <= "z")
  )
    return invalidForm(lastName);

  lastName.style.borderColor = "green";
  //------------------------------------------------------------
  //birthdate check
  let yearOfBirth = Number(birthDate.value.substring(0, 4)); //First 4 chars are the year
  if (2020 - yearOfBirth > 120 || 2020 - yearOfBirth < 1)
    return invalidForm(birthDate);

  birthDate.style.borderColor = "green";

  //------------------------------------------------------------
  //City check
  if (cities.every((name) => name != city.value))
    //This checks if the input value is different from all the cities in JSON file, if it's different we don't want to porceed
    return invalidForm(city);

  city.style.borderColor = "green";
  //------------------------------------------------------------
  //street check
  if (street.value.length <= 2) return invalidForm(street);
  else if (
    !street.value
      .toLowerCase()
      .split("")
      .every(
        (character) =>
          (character >= "a" && character <= "z") ||
          (character >= "0" && character <= "9") ||
          character == " "
      )
  )
    return invalidForm(street);
  else if (street.value.split("").every((value) => value == " "))
    //Makes sure its not only spaces
    return invalidForm(street);

  street.style.borderColor = "green";

  //------------------------------------------------------------
  //phoneNumber check
  if (phoneNumber.value.length < 10) return invalidForm(phoneNumber);
  else if (phoneNumber.value.substring(0, 2) != "05")
    return invalidForm(phoneNumber);

  phoneNumber.style.borderColor = "green";

  //------------------------------------------------------------
  //profilePicture check
  if (
    !(
      profilePicture.value.endsWith("jpg") ||
      profilePicture.value.endsWith("jpeg")
    )
  )
    return invalidForm(profilePicture);

  profilePicture.style.borderColor = "green";

  //If the program reached to this point that means we're good to go.
  let tempUser = new User(
    username.value,
    password.value,
    email.value,
    firstName.value,
    lastName.value,
    birthDate.value,
    phoneNumber.value,
    imgToString,
    city.value,
    street.value,
    false
  );
  users.push(tempUser);
  localStorage.setItem(username.value, JSON.stringify(tempUser));

  //Redirect to main page
  location.href = "./index.html";
}

function invalidForm(value) {
  value.style.borderColor = "red";
  return false;
}

//Fetch
fetch("./lib/json/israel-cities.json")
  .then((response) => response.json())
  .then((data) => {
    let option;
    data.forEach((element) => {
      option += `<option>${element.name}</option>`;

      //Make an array with all the city names to check validation forwards
      cities.push(element.name);
    });
    document.getElementById("cities").innerHTML += option;
  });
