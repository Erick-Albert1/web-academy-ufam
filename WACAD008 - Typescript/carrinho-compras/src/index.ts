interface IProduto {
    id: number;
    modelo: string;
    fabricante: string;
    valor: number;
    getDetalhes(): string;
}

class TV implements IProduto {
    private _id: number;
    private _modelo: string;
    private _fabricante: string;
    private _valor: number;
    private _resolucao: string;
    private _polegadas: number;

    constructor(id: number, modelo: string, fabricante: string, valor: number, resolucao: string, polegadas: number) {
        this._id = id;
        this._modelo = modelo;
        this._fabricante = fabricante;
        this._valor = valor;
        this._resolucao = resolucao;
        this._polegadas = polegadas;
    }

    get id(): number { return this._id; }
    get modelo(): string { return this._modelo; }
    get fabricante(): string { return this._fabricante; }
    get valor(): number { return this._valor; }

    getDetalhes(): string {
        return `TV ${this._polegadas}" - Resolução: ${this._resolucao}`;
    }
}

class Celular implements IProduto {
    private _id: number;
    private _modelo: string;
    private _fabricante: string;
    private _valor: number;
    private _memoria: string;

    constructor(id: number, modelo: string, fabricante: string, valor: number, memoria: string) {
        this._id = id;
        this._modelo = modelo;
        this._fabricante = fabricante;
        this._valor = valor;
        this._memoria = memoria;
    }

    get id(): number { return this._id; }
    get modelo(): string { return this._modelo; }
    get fabricante(): string { return this._fabricante; }
    get valor(): number { return this._valor; }

    getDetalhes(): string {
        return `Celular - Memória: ${this._memoria}`;
    }
}

class Bicicleta implements IProduto {
    private _id: number;
    private _modelo: string;
    private _fabricante: string;
    private _valor: number;
    private _aro: number;

    constructor(id: number, modelo: string, fabricante: string, valor: number, aro: number) {
        this._id = id;
        this._modelo = modelo;
        this._fabricante = fabricante;
        this._valor = valor;
        this._aro = aro;
    }

    get id(): number { return this._id; }
    get modelo(): string { return this._modelo; }
    get fabricante(): string { return this._fabricante; }
    get valor(): number { return this._valor; }

    getDetalhes(): string {
        return `Bicicleta - Aro: ${this._aro}`;
    }
}

class CarrinhoCompras<T extends IProduto> {
    private _itens: T[];

    constructor() {
        this._itens = [];
    }

    adicionar(item: T): void {
        this._itens.push(item);
    }

    remover(id: number): void {
        const index = this._itens.findIndex(item => item.id === id);
        if (index !== -1) {
            this._itens.splice(index, 1);
        }
    }

    get itens(): T[] {
        return this._itens;
    }

    calcularTotal(): number {
        return this._itens.reduce((total, item) => total + item.valor, 0);
    }

    getQuantidade(): number {
        return this._itens.length;
    }
}

const carrinho = new CarrinhoCompras<IProduto>();
let proximoIdProduto = 1;

const formProduto = document.getElementById("form-produto") as HTMLFormElement;
const listaProdutosContainer = document.getElementById("lista-produtos") as HTMLDivElement;
const estQtd = document.getElementById("est-qtd") as HTMLElement;
const estTotal = document.getElementById("est-total") as HTMLElement;

function atualizarInterface(): void {
    listaProdutosContainer.innerHTML = "";

    carrinho.itens.forEach(produto => {
        const card = document.createElement("div");
        card.className = "produto-card";
        card.innerHTML = `
            <button class="btn-delete" data-id="${produto.id}">Remover</button>
            <h3>${produto.modelo}</h3>
            <p>Fabricante: ${produto.fabricante}</p>
            <p><small>${produto.getDetalhes()}</small></p>
            <p><strong>R$ ${produto.valor.toFixed(2)}</strong></p>
        `;

        const btnDelete = card.querySelector(".btn-delete") as HTMLButtonElement;
        btnDelete.addEventListener("click", () => {
            carrinho.remover(produto.id);
            atualizarInterface();
        });

        listaProdutosContainer.appendChild(card);
    });

    estQtd.innerText = carrinho.getQuantidade().toString();
    estTotal.innerText = `R$ ${carrinho.calcularTotal().toFixed(2)}`;
}

if (formProduto) {
    formProduto.addEventListener("submit", (e) => {
        e.preventDefault();

        const tipo = (document.getElementById("tipo-produto") as HTMLSelectElement).value;
        const modelo = (document.getElementById("modelo") as HTMLInputElement).value;
        const fabricante = (document.getElementById("fabricante") as HTMLInputElement).value;
        const valor = parseFloat((document.getElementById("valor") as HTMLInputElement).value);

        let novoProduto: IProduto | null = null;

        if (tipo === "tv") {
            const resolucao = (document.getElementById("resolucao") as HTMLInputElement).value;
            const polegadas = parseInt((document.getElementById("polegadas") as HTMLInputElement).value);
            novoProduto = new TV(proximoIdProduto++, modelo, fabricante, valor, resolucao, polegadas);
        } else if (tipo === "celular") {
            const memoria = (document.getElementById("memoria") as HTMLInputElement).value;
            novoProduto = new Celular(proximoIdProduto++, modelo, fabricante, valor, memoria);
        } else if (tipo === "bicicleta") {
            const aro = parseInt((document.getElementById("aro") as HTMLInputElement).value);
            novoProduto = new Bicicleta(proximoIdProduto++, modelo, fabricante, valor, aro);
        }

        if (novoProduto) {
            carrinho.adicionar(novoProduto);
            atualizarInterface();
            formProduto.reset();
            const event = new Event('change');
            document.getElementById("tipo-produto")?.dispatchEvent(event);
        }
    });
}

atualizarInterface();