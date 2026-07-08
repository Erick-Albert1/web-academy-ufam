"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Aluno {
    _id;
    _nomeCompleto;
    _idade;
    _altura;
    _peso;
    constructor(id, nomeCompleto, idade, altura, peso) {
        this._id = id;
        this._nomeCompleto = nomeCompleto;
        this._idade = idade;
        this._altura = altura;
        this._peso = peso;
    }
    get id() { return this._id; }
    get nomeCompleto() { return this._nomeCompleto; }
    set nomeCompleto(valor) { this._nomeCompleto = valor; }
    get sizeIdade() { return this._idade; }
    set sizeIdade(valor) { this._idade = valor; }
    get altura() { return this._altura; }
    set altura(valor) { this._altura = valor; }
    get peso() { return this._peso; }
    set peso(valor) { this._peso = valor; }
}
class Turma {
    _id;
    _nome;
    _listaAlunos;
    _proximoIdAluno;
    constructor(id, nome) {
        this._id = id;
        this._nome = nome;
        this._listaAlunos = [];
        this._proximoIdAluno = 1;
    }
    adicionarAluno(nome, idade, altura, peso) {
        const novoAluno = new Aluno(this._proximoIdAluno++, nome, idade, altura, peso);
        this._listaAlunos.push(novoAluno);
    }
    editarAluno(id, nome, idade, altura, peso) {
        const aluno = this._listaAlunos.find(a => a.id === id);
        if (!aluno)
            return false;
        aluno.nomeCompleto = nome;
        aluno.sizeIdade = idade;
        aluno.altura = altura;
        aluno.peso = peso;
        return true;
    }
    removerAluno(id) {
        const index = this._listaAlunos.findIndex(a => a.id === id);
        if (index === -1)
            return false;
        this._listaAlunos.splice(index, 1);
        return true;
    }
    getAlunos() {
        return this._listaAlunos;
    }
    getNumAlunos() {
        return this._listaAlunos.length;
    }
    getMediaIdades() {
        if (this._listaAlunos.length === 0)
            return 0;
        const soma = this._listaAlunos.reduce((acc, aluno) => acc + aluno.sizeIdade, 0);
        return soma / this._listaAlunos.length;
    }
    getMediaAlturas() {
        if (this._listaAlunos.length === 0)
            return 0;
        const soma = this._listaAlunos.reduce((acc, aluno) => acc + aluno.altura, 0);
        return soma / this._listaAlunos.length;
    }
    getMediaPesos() {
        if (this._listaAlunos.length === 0)
            return 0;
        const soma = this._listaAlunos.reduce((acc, aluno) => acc + aluno.peso, 0);
        return soma / this._listaAlunos.length;
    }
}
const minhaTurma = new Turma(1, "Turma A - Educação Física");
const formAluno = document.getElementById("form-aluno");
const listaAlunosContainer = document.getElementById("lista-alunos");
const estTotal = document.getElementById("est-total");
const estIdade = document.getElementById("est-idade");
const estAltura = document.getElementById("est-altura");
const estPeso = document.getElementById("est-peso");
function atualizarTela() {
    listaAlunosContainer.innerHTML = "";
    minhaTurma.getAlunos().forEach(aluno => {
        const card = document.createElement("div");
        card.className = "aluno-card";
        card.innerHTML = `
            <h3>${aluno.nomeCompleto}</h3>
            <p>Idade: ${aluno.sizeIdade} anos | Altura: ${aluno.altura.toFixed(2)}m | Peso: ${aluno.peso.toFixed(1)}kg</p>
            <div class="acoes">
                <button class="btn-edit" data-id="${aluno.id}">Editar</button>
                <button class="btn-delete" data-id="${aluno.id}">Apagar</button>
            </div>
        `;
        const btnEdit = card.querySelector(".btn-edit");
        btnEdit.addEventListener("click", () => acaoEditar(aluno.id));
        const btnDelete = card.querySelector(".btn-delete");
        btnDelete.addEventListener("click", () => acaoApagar(aluno.id));
        listaAlunosContainer.appendChild(card);
    });
    estTotal.innerText = minhaTurma.getNumAlunos().toString();
    estIdade.innerText = `${minhaTurma.getMediaIdades().toFixed(1)} anos`;
    estAltura.innerText = `${minhaTurma.getMediaAlturas().toFixed(2)} m`;
    estPeso.innerText = `${minhaTurma.getMediaPesos().toFixed(1)} kg`;
}
function acaoEditar(id) {
    const alunos = minhaTurma.getAlunos();
    const aluno = alunos.find(a => a.id === id);
    if (!aluno)
        return;
    const novoNome = prompt("Novo Nome:", aluno.nomeCompleto);
    if (novoNome === null)
        return;
    const novaIdade = parseInt(prompt("Nova Idade:", aluno.sizeIdade.toString()) || "0");
    const novaAltura = parseFloat(prompt("Nova Altura (ex: 1.75):", aluno.altura.toString()) || "0");
    const novoPeso = parseFloat(prompt("Novo Peso (ex: 75.2):", aluno.peso.toString()) || "0");
    if (novoNome && novaIdade > 0 && novaAltura > 0 && novoPeso > 0) {
        minhaTurma.editarAluno(id, novoNome, novaIdade, novaAltura, novoPeso);
        atualizarTela();
    }
}
function acaoApagar(id) {
    if (confirm("Tem certeza que deseja remover este aluno?")) {
        minhaTurma.removerAluno(id);
        atualizarTela();
    }
}
if (formAluno) {
    formAluno.addEventListener("submit", (e) => {
        e.preventDefault();
        const nomeInput = document.getElementById("nome");
        const idadeInput = document.getElementById("idade");
        const alturaInput = document.getElementById("altura");
        const pesoInput = document.getElementById("peso");
        minhaTurma.adicionarAluno(nomeInput.value, parseInt(idadeInput.value), parseFloat(alturaInput.value), parseFloat(pesoInput.value));
        formAluno.reset();
        atualizarTela();
    });
}
atualizarTela();
//# sourceMappingURL=index.js.map