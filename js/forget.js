import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyC--CARo9BO0Mxe7v5oBDTgXSVi2_V8YEs",
    authDomain: "sevaportal-6969.firebaseapp.com",
    projectId: "sevaportal-6969",
    storageBucket: "sevaportal-6969.appspot.com",
    messagingSenderId: "706973199524",
    appId: "1:706973199524:web:216956b995b03c2e614a31"
  };
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
  }
  
let resetemailbutton= document.getElementById('resetbtn');
resetemailbutton.addEventListener('click', function(event){
  event.preventDefault()
  let email= document.getElementById('resetemail').value;
  const auth=getAuth(app);
  

  // sendPasswordResetEmail(auth,email)
  // .then(()=>{
  //   // showMessage('Password reset link is sent to your entered email','signinMessage');
  //   alert('seuccessfull')
  //   window.location.href="Register.html";
  // })
  // .catch((error)=>{
  //   const errorCode =error.code;
  //   console.log(error.code);
  //   console.log(error.message);
  //   alert(errorCode)
  //   showMessage('Something went wrong','signinMessage');
  // })
  sendPasswordResetEmail(auth, email)
  .then(() => {
    // alert('successfull')
    showMessage('Password reset link is sent to your entered email','signinMessage');
    window.location.href="Register.html";
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    showMessage('Something went wrong','signinMessage');
    // ..
  });

});