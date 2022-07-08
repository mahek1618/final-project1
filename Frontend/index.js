//function to show password
function myFunction() {
  var x = document.getElementById("Password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}


//function to store data of a new  user
var UserName = document.getElementById("UserName");
var password = document.getElementById("Password");
var su = document.getElementById("signupbtn");
function signup() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  fetch("http://localhost:58659/api/User", {
    method: 'POST',

    headers: myHeaders,
    body: JSON.stringify({
      "UserName": UserName.value,
      "UserPassword": password.value,
      "CreatedAt": new Date().toISOString()
    })
  }).then(res => {
    return res.text();
  }).then(data => console.log(data))
    .catch(error => console.log(error))
  login();
};

const login = () => {
  window.location.href = "login.html";

}