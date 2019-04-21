function login(){
  console.log('ckced on log')
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function (user) {
    
    if (user) {
      console.log('sser came as ',user);
      //After successful login, user will be redirected to home.html
      // User is signed in.
      var displayName = user.additionalUserInfo.profile.given_name;
      var email = user.additionalUserInfo.profile.email;
      
      console.log('redireccting to home ');
      console.log(displayName);
      console.log(email);
      var photoURL = user.additionalUserInfo.profile.picture;
      console.log(photoURL);

      // ...  
      db.collection('users').doc(email).set({
        email: email,
        name: displayName,
        photoURL: photoURL
      }).then(
        doc=>{
          localStorage.setItem("userid", email);
          
          window.location.href="home.html"; 
          console.log(doc);
        }
      )
      
      
    } 
    // else {
    //   document.location.replace( "login.html" );
    // }
  });
  
}
  
  // firebase.auth().onAuthStateChanged(function(user) {

  // });
  
  // function app(user)
  // {
  // document.getElementById("clientName").innerHTML = user.displayName;
  // }