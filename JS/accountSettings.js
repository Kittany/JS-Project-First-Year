sessionStorage.removeItem('IsThisFirstTime_Log_From_LiveServer');
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phoneNumber");
const profilePicture = document.getElementById("profilePicture")
const button = document.getElementById("button");
let account = JSON.parse(sessionStorage.getItem(sessionStorage.key(0)));
const confirmChangesButton = document.getElementById('confirmChangesButton');


//Set feilds value to account settings
password.value = account.password;
confirmPassword.value = account.password;
email.value = account.email;
phoneNumber.value = account.phoneNumber;

let tempPicture = "";
profilePicture.addEventListener('change',()=>
{
    const reader = new FileReader();
    reader.readAsDataURL(profilePicture.files[0]);
    reader.onload = () => tempPicture = reader.result;
});

//events
button.addEventListener('click',checkForm);
confirmChangesButton.addEventListener('click',()=>{
    if (checkForm())
        location.href = './account.html'
})


//Functions
function checkForm()
{
    if (!(password.value.length >= 7 && password.value.length <= 12))
    return invalidForm(password);
 
  let validPassword = [false,false,false]; //Special character, Number, Big letter
  for(let i = 0; i < password.value.length ;i ++)
  {
     if (password.value[i] == '@' || password.value[i].charCodeAt(0) >= 32 && password.value[i].charCodeAt(0) <= 47)
         validPassword[0] = true;
 
         else if (password.value[i] >= '0' && password.value[i] <= '9')
         validPassword[1] = true;
 
         else if (password.value[i] >= 'A' && password.value[i] <= 'Z')
         validPassword[2] = true;
  }  
  
  if (!validPassword.every(value => value == true))
       return invalidForm(password);
 
       password.style.borderColor = "green";
 
  if (password.value != confirmPassword.value)
       return invalidForm(confirmPassword);
 
       confirmPassword.style.borderColor = "green";
 
 //------------------------------------------------------------
//Email check   
if (email.value.length < 5) //Worst care scenario = y@y.y
return invalidForm(email);

for (let i = 0; i < localStorage.length; i++)
{
    if (JSON.parse(localStorage.getItem(localStorage.key(i))).email == email.value && email.value != account.email)
        return invalidForm(email);
}

let at = 0;
let dot = 0;
email.value.toLowerCase().split('').forEach(item =>
{
  if (!(item >= 'a' && item <= 'z' || item >= '0' && item <= '9' || item == '@' || item == '.' || item == '-' || item == '_'))
  return invalidForm(email);

  else if (item == '@')
  at++;

  else if (item == '.')
   dot++;
});

if (at != 1 || dot == 0)
return invalidForm(email);

if (dot == 1)
if (email.value.indexOf('@') > email.value.indexOf('.'))
return invalidForm(email);


if (email.value[0] == '@' || email.value[0] == '.' || email.value[email.value.length - 1] == '@' || email.value[email.value.length - 1] == '.')
return invalidForm(email);

if (email.value[email.value.indexOf('@') - 1] == '.' || email.value[email.value.indexOf('@') + 1] == '.')
return invalidForm(email);

email.style.borderColor = "green";
//------------------------------------------------------------
//phoneNumber check
if (phoneNumber.value.length < 10)
return invalidForm(phoneNumber);

else if (phoneNumber.value.substring(0,2) != "05")
return invalidForm(phoneNumber);

phoneNumber.style.borderColor = "green";
//------------------------------------------------------------
//profilePicture check
    if (!(profilePicture.value.endsWith("jpg") || profilePicture.value.endsWith("jpeg") || tempPicture == ""))
    return invalidForm(profilePicture);


    profilePicture.style.borderColor = "green";

//------------------------------------------------------------
//SAVE CHANGES
    account.password = password.value;
    account.email = email.value;
    account.phoneNumber = phoneNumber.value;

    if (tempPicture != "")
    account.profilePicture =  tempPicture;

    localStorage.setItem(account.username,JSON.stringify(account));
    sessionStorage.setItem(account.username,JSON.stringify(account));

    //Change the message on save
    document.getElementById('confirmMessage').innerText = 'Sucessfully saved.';
    return true;
}

function invalidForm(value)
{
    value.style.borderColor = "red";
    return false;
}