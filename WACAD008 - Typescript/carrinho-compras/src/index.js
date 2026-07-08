"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TV {
    _id;
    _modelo;
    _fabricante;
    _valor;
    _resolucao;
    _polegadas;
    constructor(id, modelo, fabricante, valor, resolucao, polegadas) {
        this._id = id;
        this._modelo = modelo;
        this._fabricante = fabricante;
        this._valor = valor;
        this._resolucao = resolucao;
        this._polegadas = polegadas;
    }
    get id() { return this._id; }
    get modelo() { return this._modelo; }
    get fabricante() { return this._fabricante; }
    get valor() { return this._valor; }
    getDetalhes() {
        return `TV ${this._polegadas}" - Resolução: ${this._resolucao}`;
    }
}
class Celular {
    _id;
    _modelo;
    _fabricante;
    _valor;
    _memoria;
    constructor(id, modelo, fabricante, valor, memoria) {
        this._id = id;
        this._modelo = modelo;
        this._fabricante = fabricante;
        this._valor = valor;
        this._memoria = memoria;
    }
    get id() { return this._id; }
    get modelo() { return this._modelo; }
    get fabricante() { return this._fabricante; }
    get valor() { return this._valor; }
    getDetalhes() {
        return `Celular - Memória: ${this._memoria}`;
    }
}
class Bicicleta {
    _id;
    _modelo;
    _fabricante;
    _valor;
    _aro;
    constructor(id, modelo, fabricante, valor, aro) {
        this._id = id;
        this._modelo = modelo;
        this._fabricante = fabricante;
        this._valor = valor;
        this._aro = aro;
    }
    get id() { return this._id; }
    get modelo() { return this._modelo; }
    get fabricante() { return this._fabricante; }
    get valor() { return this._valor; }
    getDetalhes() {
        return `Bicicleta - Aro: ${this._aro}`;
    }
}
class CarrinhoCompras {
    _itens;
    constructor() {
        this._itens = [];
    }
    adicionar(item) {
        this._itens.push(item);
    }
    remover(id) {
        const index = this._itens.findIndex(item => item.id === id);
        if (index !== -1) {
            this._itens.splice(index, 1);
        }
    }
    get itens() {
        return this._itens;
    }
    calcularTotal() {
        return this._itens.reduce((total, item) => total + item.valor, 0);
    }
    getQuantidade() {
        return this._itens.length;
    }
}
const carrinho = new CarrinhoCompras();
let proximoIdProduto = 1;
const formProduto = document.getElementById("form-produto");
const listaProdutosContainer = document.getElementById("lista-produtos");
const estQtd = document.getElementById("est-qtd");
const estTotal = document.getElementById("est-total");
function atualizarInterface() {
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
        const btnDelete = card.querySelector(".btn-delete");
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
        const tipo = document.getElementById("tipo-produto").value;
        const modelo = document.getElementById("modelo").value;
        const fabricante = document.getElementById("fabricante").value;
        const valor = parseFloat(document.getElementById("valor").value);
        let novoProduto = null;
        if (tipo === "tv") {
            const resolucao = document.getElementById("resolucao").value;
            const polegadas = parseInt(document.getElementById("polegadas").value);
            novoProduto = new TV(proximoIdProduto++, modelo, fabricante, valor, resolucao, polegadas);
        }
        else if (tipo === "celular") {
            const memoria = document.getElementById("memoria").value;
            novoProduto = new Celular(proximoIdProduto++, modelo, fabricante, valor, memoria);
        }
        else if (tipo === "bicicleta") {
            const aro = parseInt(document.getElementById("aro").value);
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
//# sourceMappingURL=index.js.map