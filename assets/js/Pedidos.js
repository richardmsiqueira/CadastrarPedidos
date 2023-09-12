class Pedidos {
    constructor(cliente, mesa, descricao) {
        this.id = this.gerarId();
        this.cliente = cliente;
        this.mesa = mesa;
        this.descricao = descricao;
    }

    gerarId() {
        return Math.floor(Math.random() * 100000);
    }
}

class pedidosService {
    constructor() {
        this.pedidos = [];
    }

    adicionarPedido(pedido) {
        this.pedidos.push(pedido);
    }

    removerPedido(id) {
        this.pedidos = this.pedidos.filter(pedido => pedido.id !== id);
    }

    listarPedidos() {
        return this.pedidos;
    }

    listarPedidosPorId(id) {
        return this.pedidos.find(pedido => pedido.id === id);
    }
}

const pedidosService = new pedidosService();

function adicionarPedido() {
    const cliente = document.getElementById('cliente').value;
    const mesa = document.getElementById('mesa').value;
    const descricao = document.getElementById('descricao').value;

    const pedido = new Pedidos(cliente, mesa, descricao);

    pedidosService.adicionarPedido(pedido);

    listarPedidos();
}

function listarPedidos() {
    const pedidos = pedidosService.listarEquipes();

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
        </div>
        `
});
    elementoLista.innerHTML = content;
}

function listarPedidosPorId(id) {
    const pedido = pedidosService.listarPedidosPorId(id);

    const elementoLista = document.getElementById('divExibirPedidos');
    elementoLista.innerHTML = '';

    let content = '';

    content += `
        <div>
        <p>Id: ${pedido.id}</p>
        <p>Cliente: ${pedido.cliente}</p>
        <p>Mesa: ${pedido.mesa}</p>
        <p>Descrição: ${pedido.descricao}</p>
        <button onclick="atualizarEquipes(${equipe.id})">Editar</button>
        <button onclick="deletarEquipes(${equipe.id})">Deletar</button>
        </div>
        `
    elementoLista.innerHTML = content;
}
