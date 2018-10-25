import firebase from "firebase";
class FirebaseHelper {
  constructor() {
    this.config = {
      apiKey: "AIzaSyCxwS2Uwxs_nN7aelp6CG0etx91t3KOkKg",
      authDomain: "authentication-c623a.firebaseapp.com",
      databaseURL: "https://authentication-c623a.firebaseio.com",
      projectId: "authentication-c623a",
      storageBucket: "authentication-c623a.appspot.com",
      messagingSenderId: "327022522610"
    };
  }

  plugin() {
    console.log("CONNECT FIREBASE STATUS ---> SUCCESS");
    firebase.initializeApp(this.config);
  }

  getFirebase() {
    return firebase;
  }
}

export default new FirebaseHelper();
