"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
alert("O arquivo JavaScript atualizado carregou!");
let listaLembretes = [];
let proximoId = 1;
function carregarDoLocalStorage() {
    const dadosSalvos = localStorage.getItem("lembretes");
    if (!dadosSalvos)
        return;
    try {
        const dadosArray = JSON.parse(dadosSalvos);
        listaLembretes = dadosArray.map((item) => {
            return [
                item[0],
                item[1],
                new Date(item[2]),
                item[3] ? new Date(item[3]) : null,
                item[4]
            ];
        });
        if (listaLembretes.length > 0) {
            proximoId = Math.max(...listaLembretes.map(l => l[0])) + 1;
        }
    }
    catch (e) {
        console.error(e);
    }
}
function salvarNoLocalStorage() {
    localStorage.setItem("lembretes", JSON.stringify(listaLembretes));
}
function criarLembrete(titulo, dataLimite, descricao) {
    const dataInsercao = new Date();
    const novoLembrete = [proximoId++, titulo, dataInsercao, dataLimite, descricao];
    listaLembretes.push(novoLembrete);
    salvarNoLocalStorage();
    renderizarLembretes();
}
function editarLembrete(id) {
    const lembrete = listaLembretes.find(l => l[0] === id);
    if (!lembrete)
        return;
    const novoTitulo = prompt("Novo título:", lembrete[1]);
    if (novoTitulo === null)
        return;
    const novaDescricao = prompt("Nova descrição:", lembrete[4] || "");
    lembrete[1] = novoTitulo || lembrete[1];
    lembrete[4] = novaDescricao || null;
    salvarNoLocalStorage();
    renderizarLembretes();
}
function apagarLembrete(id) {
    const index = listaLembretes.findIndex(l => l[0] === id);
    if (index !== -1) {
        listaLembretes.splice(index, 1);
        salvarNoLocalStorage();
        renderizarLembretes();
    }
}
function renderizarLembretes() {
    const listaContainer = document.getElementById("lista-lembretes");
    if (!listaContainer) {
        console.error("Erro: O container da lista (id='lista-lembretes') não foi encontrado no HTML!");
        return;
    }
    listaContainer.innerHTML = "";
    listaLembretes.forEach(lembrete => {
        const [id, titulo, insercao, limite, descricao] = lembrete;
        const card = document.createElement("div");
        card.className = "lembrete-card";
        card.innerHTML = `
            <h3>${titulo}</h3>
            <p><small>Criado em: ${insercao.toLocaleString()}</small></p>
            ${limite ? `<p><small>Prazo: ${new Date(limite).toLocaleString()}</small></p>` : ""}
            ${descricao ? `<p>${descricao}</p>` : ""}
            <div class="acoes">
                <button class="btn-delete" data-id="${id}">Apagar</button>
                <button class="btn-edit" data-id="${id}">Editar</button>
            </div>
        `;
        const btnDelete = card.querySelector(".btn-delete");
        btnDelete.addEventListener("click", () => apagarLembrete(id));
        const btnEdit = card.querySelector(".btn-edit");
        btnEdit.addEventListener("click", () => editarLembrete(id));
        listaContainer.appendChild(card);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM carregado! Buscando o formulário...");
    const form = document.getElementById("form-lembrete");
    console.log("Formulário encontrado?", form);
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            console.log("Formulário enviado! Processando dados...");
            const tituloInput = document.getElementById("titulo");
            const dataLimiteInput = document.getElementById("data-limite");
            const descricaoInput = document.getElementById("descricao");
            if (!tituloInput) {
                console.error("Erro: O campo de título (id='titulo') não foi encontrado no HTML!");
                return;
            }
            const limite = dataLimiteInput && dataLimiteInput.value ? new Date(dataLimiteInput.value) : null;
            const descricao = descricaoInput && descricaoInput.value ? descricaoInput.value : null;
            criarLembrete(tituloInput.value, limite, descricao);
            form.reset();
        });
    }
    else {
        console.error("Erro: O formulário (id='form-lembrete') não foi encontrado no HTML!");
    }
    carregarDoLocalStorage();
    renderizarLembretes();
});
//# sourceMappingURL=index.js.map