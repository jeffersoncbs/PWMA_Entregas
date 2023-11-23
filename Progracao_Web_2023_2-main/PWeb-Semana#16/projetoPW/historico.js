// Função para atualizar a tabela de agendamentos de clientes
function atualizarAgendamentosClientes() {
    var tabelaAgendamentosClientes = document.getElementById("agendamentosClientes");

    // Limpa o conteúdo da tabela
    tabelaAgendamentosClientes.innerHTML = "";

    // Obtém a lista de agendamentos de clientes do LocalStorage
    var agendamentosClientes = JSON.parse(localStorage.getItem("agendamentosClientes")) || [];

    // Preenche a tabela com os agendamentos de clientes da lista
    agendamentosClientes.forEach(function (agendamentoCliente) {
        var row = tabelaAgendamentosClientes.insertRow();

        var idLocalCell = row.insertCell();
        idLocalCell.textContent = agendamentoCliente.idLocal;

        var formaPagamentoCell = row.insertCell();
        formaPagamentoCell.textContent = agendamentoCliente.formaPagamento;

        var cpfCell = row.insertCell();
        cpfCell.textContent = agendamentoCliente.cpf;
    });
}

// Chama a função para atualizar a tabela de agendamentos de clientes ao carregar a página
window.onload = function () {
    atualizarAgendamentosClientes();
};
