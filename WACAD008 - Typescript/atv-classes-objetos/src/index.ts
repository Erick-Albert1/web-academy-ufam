class Aluno {
    private _id: number;
    private _nomeCompleto: string;
    private _idade: number;
    private _altura: number;
    private _peso: number;

    constructor(id: number, nomeCompleto: string, idade: number, altura: number, peso: number) {
        this._id = id;
        this._nomeCompleto = nomeCompleto;
        this._idade = idade;
        this._altura = altura;
        this._peso = peso;
    }

    get id(): number { return this._id; }
    
    get nomeCompleto(): string { return this._nomeCompleto; }
    set nomeCompleto(valor: string) { this._nomeCompleto = valor; }

    get sizeIdade(): number { return this._idade; }
    set sizeIdade(valor: number) { this._idade = valor; }

    get altura(): number { return this._altura; }
    set altura(valor: number) { this._altura = valor; }

    get peso(): number { return this._peso; }
    set peso(valor: number) { this._peso = valor; }
}

class Turma {
    private _id: number;
    private _nome: string;
    private _listaAlunos: Aluno[];
    private _proximoIdAluno: number;

    constructor(id: number, nome: string) {
        this._id = id;
        this._nome = nome;
        this._listaAlunos = [];
        this._proximoIdAluno = 1;
    }

    adicionarAluno(nome: string, idade: number, altura: number, peso: number): void {
        const novoAluno = new Aluno(this._proximoIdAluno++, nome, idade, altura, peso);
        this._listaAlunos.push(novoAluno);
    }

    editarAluno(id: number, nome: string, idade: number, altura: number, peso: number): boolean {
        const aluno = this._listaAlunos.find(a => a.id === id);
        if (!aluno) return false;
        
        aluno.nomeCompleto = nome;
        aluno.sizeIdade = idade;
        aluno.altura = altura;
        aluno.peso = peso;
        return true;
    }

    removerAluno(id: number): boolean {
        const index = this._listaAlunos.findIndex(a => a.id === id);
        if (index === -1) return false;
        
        this._listaAlunos.splice(index, 1);
        return true;
    }

    getAlunos(): Aluno[] {
        return this._listaAlunos;
    }

    getNumAlunos(): number {
        return this._listaAlunos.length;
    }

    getMediaIdades(): number {
        if (this._listaAlunos.length === 0) return 0;
        const soma = this._listaAlunos.reduce((acc, aluno) => acc + aluno.sizeIdade, 0);
        return soma / this._listaAlunos.length;
    }

    getMediaAlturas(): number {
        if (this._listaAlunos.length === 0) return 0;
        const soma = this._listaAlunos.reduce((acc, aluno) => acc + aluno.altura, 0);
        return soma / this._listaAlunos.length;
    }

    getMediaPesos(): number {
        if (this._listaAlunos.length === 0) return 0;
        const soma = this._listaAlunos.reduce((acc, aluno) => acc + aluno.peso, 0);
        return soma / this._listaAlunos.length;
    }
}

const minhaTurma = new Turma(1, "Turma A - Educação Física");

const formAluno = document.getElementById("form-aluno") as HTMLFormElement;
const listaAlunosContainer = document.getElementById("lista-alunos") as HTMLDivElement;

const estTotal = document.getElementById("est-total") as HTMLElement;
const estIdade = document.getElementById("est-idade") as HTMLElement;
const estAltura = document.getElementById("est-altura") as HTMLElement;
const estPeso = document.getElementById("est-peso") as HTMLElement;

function atualizarTela(): void {
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

        const btnEdit = card.querySelector(".btn-edit") as HTMLButtonElement;
        btnEdit.addEventListener("click", () => acaoEditar(aluno.id));

        const btnDelete = card.querySelector(".btn-delete") as HTMLButtonElement;
        btnDelete.addEventListener("click", () => acaoApagar(aluno.id));

        listaAlunosContainer.appendChild(card);
    });

    estTotal.innerText = minhaTurma.getNumAlunos().toString();
    estIdade.innerText = `${minhaTurma.getMediaIdades().toFixed(1)} anos`;
    estAltura.innerText = `${minhaTurma.getMediaAlturas().toFixed(2)} m`;
    estPeso.innerText = `${minhaTurma.getMediaPesos().toFixed(1)} kg`;
}

function acaoEditar(id: number): void {
    const alunos = minhaTurma.getAlunos();
    const aluno = alunos.find(a => a.id === id);
    if (!aluno) return;

    const novoNome = prompt("Novo Nome:", aluno.nomeCompleto);
    if (novoNome === null) return;

    const novaIdade = parseInt(prompt("Nova Idade:", aluno.sizeIdade.toString()) || "0");
    const novaAltura = parseFloat(prompt("Nova Altura (ex: 1.75):", aluno.altura.toString()) || "0");
    const novoPeso = parseFloat(prompt("Novo Peso (ex: 75.2):", aluno.peso.toString()) || "0");

    if (novoNome && novaIdade > 0 && novaAltura > 0 && novoPeso > 0) {
        minhaTurma.editarAluno(id, novoNome, novaIdade, novaAltura, novoPeso);
        atualizarTela();
    }
}

function acaoApagar(id: number): void {
    if (confirm("Tem certeza que deseja remover este aluno?")) {
        minhaTurma.removerAluno(id);
        atualizarTela();
    }
}

if (formAluno) {
    formAluno.addEventListener("submit", (e) => {
        e.preventDefault();

        const nomeInput = document.getElementById("nome") as HTMLInputElement;
        const idadeInput = document.getElementById("idade") as HTMLInputElement;
        const alturaInput = document.getElementById("altura") as HTMLInputElement;
        const pesoInput = document.getElementById("peso") as HTMLInputElement;

        minhaTurma.adicionarAluno(
            nomeInput.value,
            parseInt(idadeInput.value),
            parseFloat(alturaInput.value),
            parseFloat(pesoInput.value)
        );

        formAluno.reset();
        atualizarTela();
    });
}

atualizarTela();