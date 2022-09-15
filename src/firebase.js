import * as firebase from "firebase/app";
import "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyB3dneEsipn0hsRpMYehpKrzXYzmvRdbk0",
	authDomain: "hashping-21757.firebaseapp.com",
	projectId: "hashping-21757",
	storageBucket: "hashping-21757.appspot.com",
	messagingSenderId: "726477494341",
	appId: "1:726477494341:web:fbe967c41cb8e016352b2c",
	measurementId: "G-9YJ5H2X868",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
