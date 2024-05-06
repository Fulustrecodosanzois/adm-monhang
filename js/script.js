import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js"; 

const db = getDatabase();
const dbRef = ref(db);
get(child(dbRef, "formulario")).then((snapshot) => {
  if (snapshot.exists()) {
    const formulario = snapshot.val();
    for (const key in formulario) {
      const mensagem = formulario[key];
      lista.innerHTML += `<li>${mensagem.nome}: ${mensagem.assunto}</li>`;
    }
  } else {
    console.log("Não há dados disponíveis");
  }
}).catch((error) => {
  console.error(error);
});