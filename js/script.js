import firebase from "./firebase-config.js";

const database = firebase.database();
const listaDiv = document.getElementById('lista');
const mensagemDiv = document.getElementById('mensagem');

function exibirMensagens(mensagens) {
    listaDiv.innerHTML = '';

    mensagens.forEach((mensagem, index) => {
        const mensagemElement = document.createElement('div');
        mensagemElement.innerHTML = `
            <div class="mensagem" data-index="${index}">
                <h3>${mensagem.nome}</h3>
                <p>Assunto: ${mensagem.assunto}</p>
                <p>Data e Hora: ${mensagem.dataHoraEnvio}</p>
            </div>
        `;
        listaDiv.appendChild(mensagemElement);

        mensagemElement.addEventListener('click', () => exibirDetalhesMensagem(mensagem));
    });
}

function exibirDetalhesMensagem(mensagem) {
    mensagemDiv.innerHTML = `
        <h2>${mensagem.nome}</h2>
        <p><strong>Assunto:</strong> ${mensagem.assunto}</p>
        <p><strong>Mensagem:</strong> ${mensagem.mensagem}</p>
        <p><strong>Data e Hora:</strong> ${mensagem.dataHoraEnvio}</p>
    `;
}

database.ref('formulario').on('value', (snapshot) => {
    const mensagens = [];
    snapshot.forEach((childSnapshot) => {
        mensagens.push(childSnapshot.val());
    });
    exibirMensagens(mensagens);
});
