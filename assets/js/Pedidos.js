class Pedidos {
    constructor(cliente, mesa, descricao) {
        this.id = this.gerarId();
        this.cliente = cliente;
        this.mesa = mesa;
        this.descricao = descricao;
    }

    gerarId() {
        return Math.floor(Math.random() * 10000);
    }
}

class PedidosService {
    constructor() {
        this.pedidos = [];
    }

    adicionarPedido(pedido) {
        if (verificarInputs()) {
            enviarMsg("Preencha todas as informações", "erro");
        } else {
            this.pedidos.push(pedido);
            console.log(this.pedidos);
            enviarMsg("Cadastrado com sucesso!", "sucesso");
            limparInputs();
        }
        
    }

    listarPedidos() {
        return this.pedidos;
    }

    listarPedidosPorId(id) {
        return this.pedidos.find(pedido => pedido.id === id);
    }

    atualizarPedidos(id, cliente, mesa, descricao) {
        const pedido = this.listarPedidosPorId(id);
        pedido.cliente = cliente;
        pedido.mesa = mesa;
        pedido.descricao = descricao;

        return pedido;
    }

    removerPedido(parametro) { 
        return (this.pedidos = this.pedidos.filter((pedido) => pedido.id != parametro));
    }
}

const pedidosService = new PedidosService();

function adicionarPedido() {
    const cliente = document.getElementById('cliente').value;
    const mesa = document.getElementById('mesa').value;
    const descricao = document.getElementById('descricao').value;

    const pedido = new Pedidos(cliente, mesa, descricao);

    pedidosService.adicionarPedido(pedido);

    listarPedidos();
    document.getElementById('divExibirPedidos').classList.remove('hidden');
    limparInputs();
}

function listarPedidos() {
    const pedidos = pedidosService.listarPedidos();

    const elementoLista = document.getElementById('divExibirPedidos');
    elementoLista.innerHTML = '';

    let content = '';

    pedidos.forEach((pedido) => {
        content += `
        <div onclick="listarPedidosPorId(${pedido.id})">
        <p>Id: ${pedido.id}</p>
        <p>Cliente: ${pedido.cliente}</p>
        <p>Mesa: ${pedido.mesa}</p>
        <p>Descrição: ${pedido.descricao}</p>
        <button id="botaoEditar" onclick="atualizarPedidos(${pedido.id})"><i class="fa-solid fa-pen-to-square"></i></button>
        <button id="botaoRemover" onclick="removerPedido(${pedido.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
        `
});
    elementoLista.innerHTML = content;
}

function limparInputs() {
    document.getElementById('cliente').value = '';
    document.getElementById('mesa').value = '';
    document.getElementById('descricao').value = '';
}

function enviarMsg(msg, tipo) {
    let msgDiv = document.getElementById("msg");
    msgDiv.innerHTML = "";

    let msgMostrar = `
        <p class='${tipo}'>${msg}</p>
    `
    msgDiv.innerHTML += msgMostrar;

    setTimeout(function () {
        msgDiv.innerHTML = "";
    }, 3000);
}

function verificarInputs() {
    let cliente = document.getElementById("cliente").value;
    let mesa = document.getElementById("mesa").value;
    let descricao = document.getElementById("descricao").value;

    if (cliente == "" || mesa == "" || descricao == "") {
        return true;
    } else {
        return false;
    }
}

let aux = null;

function atualizarPedidos(id) {
    const pedido = pedidosService.listarPedidosPorId(id);

    document.getElementById('cliente').value = pedido.cliente;
    document.getElementById('mesa').value = pedido.mesa;
    document.getElementById('descricao').value = pedido.descricao;

    document.getElementById('botaoCadastro').classList.add('hidden');
    document.getElementById('botaoEditar').classList.remove('hidden');

    aux = id;
 }

 function editarPedido() {
    const cliente = document.getElementById('cliente').value;
    const mesa = document.getElementById('mesa').value;
    const descricao = document.getElementById('descricao').value;

    pedidosService.atualizarPedidos(aux, cliente, mesa, descricao);

    listarPedidos();

    document.getElementById('botaoCadastro').classList.remove('hidden');
    document.getElementById('botaoEditar').classList.add('hidden');

    limparInputs();
    aux = null;
}

function removerPedido(id) {
    pedidosService.removerPedido(id);

    listarPedidos();
    document.getElementById('aparecerDiv').classList.add('hidden');
}