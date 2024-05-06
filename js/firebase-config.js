import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js"; // Importe o banco de dados do Firebase



const firebaseConfig = {
  apiKey: "AIzaSyBQGVTy0cZXc4HO3MzO4_S6mtMBdhbCzVE",
  authDomain: "site-monhang.firebaseapp.com",
  databaseURL: "https://site-monhang-default-rtdb.firebaseio.com",
  projectId: "site-monhang",
  storageBucket: "site-monhang.appspot.com",
  messagingSenderId: "627165670566",
  appId: "1:627165670566:web:3477f3251f771b9311d867"
};



console.log("Funciona!!!!!")

const app = initializeApp(firebaseConfig);
const db = getDatabase();

export { firebaseConfig };