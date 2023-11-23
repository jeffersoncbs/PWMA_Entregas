// Inicializa o ID dos produtos
var idAgendamento = 0;

// Função para adicionar um novo produto
function adicionarAgendamento() {
    // Obter os valores inseridos nos campos de nome e preço
    var enderecoAg = document.getElementById("endereco").value;
    var precoAg = document.getElementById("preco").value;
    var horarioAg = document.getElementById("hora").value;
    var dataAg = document.getElementById("data").value;

    // Verificar se ambos os campos estão preenchidos
    if (enderecoAg && precoAg && horarioAg && dataAg) {
        // Incrementa o ID do produto
        idAgendamento++;

        // Cria um objeto com os detalhes do produto
        var agendamento = {
            id: idAgendamento,
            endereco: enderecoAg,
            preco: precoAg,
            horario: horarioAg,
            data: dataAg
        };

        // Obtém a lista de produtos armazenados no LocalStorage ou cria uma lista vazia
        var agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

        // Adiciona o novo produto à lista
        agendamentos.push(agendamento);

        // Salva a lista atualizada no LocalStorage
        localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

        // Limpa os campos de nome e preço
        document.getElementById("endereco").value = "";
        document.getElementById("preco").value = "";
        document.getElementById("hora").value = "";
        document.getElementById("data").value = "";
    } else {
        alert("Por favor, preencha todos os campos.");
    }

    // Atualiza a tabela
    atualizarAgendamentosTH();
}

// Função para editar um produto
function editar(Id) {
    // Obtém a lista de produtos do LocalStorage
    var agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

    // Procura o produto na lista com base no ID
    var agendamento = agendamentos.find(function (agendamento) {
        return agendamento.id === Id;
    });

    // Verifica se o produto foi encontrado
    if (agendamento) {
        // Preenche os campos de nome e preço com os dados do produto
        document.getElementById("endereco").value = agendamento.endereco;
        document.getElementById("preco").value = agendamento.preco;
        document.getElementById("hora").value = agendamento.horario;
        document.getElementById("data").value = agendamento.data;

        // Adiciona um botão "Confirmar Edição"
        var botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Confirmar Edição";
        botaoEditar.onclick = function () {
            confirmarEdicao(Id);
        };

        // Substitui o botão "Adicionar Produto" pelo botão "Confirmar Edição"
        var botaoAdicionar = document.querySelector("button");
        botaoAdicionar.replaceWith(botaoEditar);
    } else {
        alert("Não encontrado.");
    }
}

// Função para confirmar a edição de um produto
function confirmarEdicao(Id) {
    // Obtém a lista de produtos do LocalStorage
    var agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

    // Encontra o índice do produto na lista
    var agIndex = agendamentos.findIndex(function (agendamento) {
        return agendamento.id === Id;
    });

    // Verifica se o produto foi encontrado
    if (agIndex !== -1) {
        // Atualiza os dados do produto
        agendamentos[agIndex].endereco = document.getElementById("endereco").value;
        agendamentos[agIndex].preco = document.getElementById("preco").value;
        agendamentos[agIndex].horario = document.getElementById("hora").value;
        agendamentos[agIndex].data = document.getElementById("data").value;

        // Salva a lista de produtos atualizada no LocalStorage
        localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

        // Limpa os campos de nome e preço
        document.getElementById("endereco").value = "";
        document.getElementById("preco").value = "";
        document.getElementById("hora").value = "";
        document.getElementById("data").value = "";

        // Recoloca o botão "Adicionar Produto"
        var botaoEditar = document.querySelector("button");
        var botaoAdicionar = document.createElement("button");
        botaoAdicionar.textContent = "Adicionar Agendamento";
        botaoAdicionar.onclick = adicionarAgendamento;
        botaoEditar.replaceWith(botaoAdicionar);

        // Atualiza a tabela de produtos na página
        atualizarAgendamentosTH();
    } else {
        alert("Não encontrado.");
    }
}

// Função para excluir um produto
function excluirAgendamento(Id) {
    // Obtém a lista de produtos do LocalStorage
    var agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

    // Encontra o índice do produto na lista
    var agIndex = agendamentos.findIndex(function (agendamento) {
        return agendamento.id === Id;
    });

    // Verifica se o produto foi encontrado
    if (agIndex !== -1) {
        // Remove o produto da lista
        agendamentos.splice(agIndex, 1);

        // Salva a lista de produtos atualizada no LocalStorage
        localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

        // Atualiza a tabela de produtos na página
        atualizarAgendamentosTH();
    } else {
        alert("Não encontrado.");
    }
}

// Função para atualizar a tabela de produtos
function atualizarAgendamentosTH() {
    // Obtém a tabela de produtos na página
    var tabelaAgendamentos = document.getElementById("agendamentosTH");

    // Limpa o conteúdo da tabela
    tabelaAgendamentos.innerHTML = "";

    // Obtém a lista de produtos do LocalStorage
    var agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

    // Preenche a tabela com os produtos da lista
    agendamentos.forEach(function (agendamento) {
        var row = tabelaAgendamentos.insertRow();

        var idCell = row.insertCell();
        idCell.textContent = agendamento.id;

        var enderecoCell = row.insertCell();
        enderecoCell.textContent = agendamento.endereco;

        var precoCell = row.insertCell();
        precoCell.textContent = agendamento.preco;

        var horaCell = row.insertCell();
        horaCell.textContent = agendamento.horario;

        var dataCell = row.insertCell();
        dataCell.textContent = agendamento.data;

        var acoesCell = row.insertCell();
        acoesCell.innerHTML = '<button alt=" " onclick="editar(' + agendamento.id + ')">Editar</button>' +
            '<button alt=" " onclick="excluirAgendamento(' + agendamento.id + ')">Excluir</button>';
    });
}

// Chama a função para atualizar a tabela de produtos ao carregar a página
window.onload = function () {
    atualizarAgendamentosTH();
};