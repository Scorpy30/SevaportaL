import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword , sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {getFirestore , setDoc  , doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
// Your web app's Firebase configuration
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


const submit = document.getElementById('submitSignUp');
submit.addEventListener('click', function (event) {
  event.preventDefault()
  const email = document.getElementById('email').value;
  const name = document.getElementById('name').value;
  const pass = document.getElementById('password').value;
  // alert('Please fill the entries')
  if (pass.length < 6) {
    showMessage('Password should be at least 6 characters', 'signupMessage');
    return;
  }else{
    const auth = getAuth();
    const db = getFirestore();
    createUserWithEmailAndPassword(auth, email,name, pass)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        const userdata = {
          email : email,
          name : name,
        }
        showMessage('Account Created Successfully', 'signupMessage');
        const docRef =doc(db,"users",user.uid);
        setDoc(docRef,userdata)
        .then(()=>{
          window.location.href="homepage.html";
        })
        
        // .then(()=>{
        //   window.location.href='homepage.html'
        // })
        // alert(" Account Created Successfully...")
  
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // alert(errorMessage)
        if(errorCode=='auth/email-already-in-use'){
          showMessage('Email already in use!!','signupMessage');
        }else if(errorCode=='auth/weak-password'){
          showMessage('Name should be more than 6 characters', 'signupMessage');
        }
        else{
          showMessage('Unable to create User', 'signupMessage');
        }
        // ..
      });
  }

})

const submitin=document.getElementById('submitSignIn');
submitin.addEventListener('click', function (event){
  event.preventDefault()
  const emailin= document.getElementById('esn').value;
  const passin= document.getElementById('psn').value;
  const auth=getAuth();

  signInWithEmailAndPassword(auth,emailin,passin)
  .then((userCredential)=>{
    // alert('Logged in Succesfully')
    showMessage('Logged in Successfully', 'signinMessage');
    const user=userCredential.user;
    localStorage.setItem('loggedInUserId',user.uid);
    window.location.href="homepage.html";
  })
  .catch((error) =>{
    const errorCode = error.code;
    const errorMessage = error.message;
    if(errorCode=='auth/invalid-credential'){
      showMessage('Incorrect Email or Password','signinMessage');
    }else{
      showMessage('Account does not exist. Please signup','signinMessage');
    }
  })

})


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
    alert('successfull')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    // ..
  });

});
