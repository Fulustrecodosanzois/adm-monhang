// import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

// const db = getDatabase();
// const lista = document.querySelector('.list-group'); // Seleciona o elemento onde a lista será exibida

// get(child(ref(db), "formulario")).then((snapshot) => {
//     if (snapshot.exists()) {
//         const formulario = snapshot.val();
//         const mensagens = [];

//         for (const key in formulario) {
//             mensagens.push(formulario[key]);
//         }

//         // Ordena as mensagens pela dataHoraEnvio, da mais recente para a mais antiga
//         mensagens.sort((a, b) => new Date(b.dataHoraEnvio) - new Date(a.dataHoraEnvio));

//         // Adiciona as mensagens à lista na ordem inversa
//         for (const mensagem of mensagens) {
//             const dataHoraEnvio = new Date(mensagem.dataHoraEnvio).toLocaleString(); // Converte a data para o formato local

//             // Cria elementos HTML com as informações do banco de dados
//             const listItem = document.createElement('a');
//             listItem.href = "#";
//             listItem.classList.add('list-group-item', 'list-group-item-action');

//             const itemContent = `
//         <div class="d-flex w-100 justify-content-between">
//           <h5 class="mb-3 me-5">Nome: ${mensagem.nome}</h5>
//           <small class="fw-bold">${dataHoraEnvio}</small>
//         </div>
//         <p class="mb-2">Email: ${mensagem.email}</p>
//         <p class="mb-2">Telefone: ${mensagem.telefone}</p>
//         <p class="mb-3">Assunto: ${mensagem.assunto}</p>

//         <div class="bg-primary rounded-3 p-3">
//          <small  class="text-white fw-bolder">${mensagem.mensagem}</small>
//         </div>

//       `;
//             listItem.innerHTML = itemContent;

//             lista.appendChild(listItem); 
//         }
//     } else {
//         console.log("Não há dados disponíveis");
//     }
// }).catch((error) => {
//     console.error(error);
// });


import { getDatabase, ref, child, get, remove } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

const db = getDatabase();
const lista = document.querySelector('.list-group'); // Seleciona o elemento onde a lista será exibida

get(child(ref(db), "formulario")).then((snapshot) => {
    if (snapshot.exists()) {
        const formulario = snapshot.val();
        const mensagens = [];

        for (const key in formulario) {
            mensagens.push({ id: key, ...formulario[key] }); // Adiciona o id da mensagem
        }

        // Ordena as mensagens pela dataHoraEnvio, da mais recente para a mais antiga
        mensagens.sort((a, b) => new Date(b.dataHoraEnvio) - new Date(a.dataHoraEnvio));

        // Adiciona as mensagens à lista na ordem inversa
        for (const mensagem of mensagens) {
            const dataHoraEnvio = new Date(mensagem.dataHoraEnvio).toLocaleString(); // Converte a data para o formato local

            // Cria elementos HTML com as informações do banco de dados
            const listItem = document.createElement('div'); // Altera para div para facilitar a manipulação
            listItem.classList.add('list-group-item', 'list-group-item-action');

            const itemContent = `
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-3 me-5">Nome: ${mensagem.nome}</h5>
                    <small class="fw-bold">${dataHoraEnvio}</small>
                </div>
                <p class="mb-2">Email: ${mensagem.email}</p>
                <p class="mb-2">Telefone: ${mensagem.telefone}</p>
                <p class="mb-3">Assunto: ${mensagem.assunto}</p>
                <div class="bg-primary rounded-3 p-3">
                    <small class="text-white fw-bolder">${mensagem.mensagem}</small>
                </div>
                <button class="btn btn-danger delete-btn mt-4" data-id="${mensagem.id}">Excluir</button> <!-- Botão de exclusão -->
            `;
            listItem.innerHTML = itemContent;

            lista.appendChild(listItem);

            // Adiciona um ouvinte de eventos para o botão de exclusão
            const deleteBtn = listItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => deleteMessage(mensagem.id)); // Chama a função deleteMessage com o id da mensagem
        }
    } else {
        console.log("Não há dados disponíveis");
    }
}).catch((error) => {
    console.error(error);
});

// Função para excluir mensagem do banco de dados
function deleteMessage(id) {
    const mensagemRef = ref(db, `formulario/${id}`);
    remove(mensagemRef)
        .then(() => {
            console.log("Mensagem excluída com sucesso");
            // Remova o item da lista após a exclusão
            const listItem = document.querySelector(`[data-id="${id}"]`).parentNode;
            listItem.remove();
        })
        .catch((error) => {
            console.error("Erro ao excluir mensagem: ", error);
        });
}
