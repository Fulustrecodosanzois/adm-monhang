import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

const db = getDatabase();
const lista = document.querySelector('.list-group'); // Seleciona o elemento onde a lista será exibida

get(child(ref(db), "formulario")).then((snapshot) => {
    if (snapshot.exists()) {
        const formulario = snapshot.val();
        const mensagens = [];

        for (const key in formulario) {
            mensagens.push(formulario[key]);
        }

        // Ordena as mensagens pela dataHoraEnvio, da mais recente para a mais antiga
        mensagens.sort((a, b) => new Date(b.dataHoraEnvio) - new Date(a.dataHoraEnvio));

        // Adiciona as mensagens à lista na ordem inversa
        for (const mensagem of mensagens) {
            const dataHoraEnvio = new Date(mensagem.dataHoraEnvio).toLocaleString(); // Converte a data para o formato local

            // Cria elementos HTML com as informações do banco de dados
            const listItem = document.createElement('a');
            listItem.href = "#";
            listItem.classList.add('list-group-item', 'list-group-item-action');

            const itemContent = `
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">${mensagem.nome}</h5>
          <small>${dataHoraEnvio}</small>
        </div>
        <p class="mb-1">${mensagem.assunto}</p>
        <small>${mensagem.mensagem}</small>
      `;
            listItem.innerHTML = itemContent;

            lista.appendChild(listItem); // Adiciona o item à lista
        }
    } else {
        console.log("Não há dados disponíveis");
    }
}).catch((error) => {
    console.error(error);
});
