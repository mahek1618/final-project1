function myFunction() {
    var x = document.getElementById("Password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

var user = document.getElementById("UserName");
// var usernameValidation = function () {
//   usernameValue = user.value.trim();
//   validusername = /^\w+([\.-]?\w+)\w+([\.-]?\w+)(\.\w{2,3})+$/;
//   usernameErr = document.getElementById("emailNametag");
//   usernameErr.style.color = "red";
//   if (usernameValue == "") {
//     usernameErr.innerHTML = "Username is required";
//   } else if (!validusername.test(usernameValue)) {
//     usernameErr.innerHTML =
//       "Username must contain 8 characters ";
//   } else {
//     usernameErr.innerHTML = "";
//     return true;
//   }
// };



  //password validation
  var passwordvalid= document.getElementById("Password");
//   var passwordValidation = function(){
//   passwordValue=passwordvalid.value.trim(); 
//    validPassword=/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/
//    passwordErr = document.getElementById("passwordtag");
//    passwordErr.style.color="red";
//   if(passwordValue=="")
//    {
//     passwordErr.innerHTML="Password is required";
//    }else if(!validPassword.test(passwordValue)){
//      passwordErr.innerHTML="Password must have at least one Uppercase, lowercase, digit, special characters & 8 characters";
//    }
//    else{
//      passwordErr.innerHTML="";
//      return true;
//    }
// }
// passwordvalid.oninput=function(){
//     passwordValidation();
// }


//confirm password validation

var confirmPassword= document.getElementById("confirmpswd");
// var confirmPasswordValidation=function(){
//    confirmPasswordValue=confirmPassword.value.trim(); 
//    confirmPasswordErr=document.getElementById('confirmpasswordtag');
//    confirmPasswordErr.style.color="red";
//    if(confirmPasswordValue==""){
//        confirmPasswordErr.innerHTML="Confirm Password is required";
//    }

//   else if(confirmPasswordValue!=passwordvalid.value){
//      confirmPasswordErr.innerHTML="Password Mismatch";
//    }
//    else{
//      confirmPasswordErr.innerHTML="";
//      return true;
//    }
// }
// confirmPassword.oninput=function(){
//     confirmPasswordValidation();
// }
var UserName=document.getElementById("UserName");
var password=document.getElementById("Password");
var su = document.getElementById("signupbtn");
 function signup(){
     var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch("http://localhost:58659/api/User",{
        method:'POST',

        // cache: "no-cache",
    
        // credentials: "same-origin",
        headers: myHeaders,
        body:JSON.stringify({
            "UserName": UserName.value,
            "UserPassword":password.value,
            "CreatedAt": new Date().toISOString()
        })
    }).then(res=>{
        return res.text();
    }) .then(data=>console.log(data))
    .catch(error=>console.log(error))
    login();
};

const  login = ()=> {
 window.location.href="login.html";
 
}