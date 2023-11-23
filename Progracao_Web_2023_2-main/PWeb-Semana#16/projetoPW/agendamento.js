// Função para preencher o ID do local na página de agendamento
function preencherIdLocal(id) {
    document.getElementById("idLocal").value = id;
}

// Função para agendar espaço
function agendarEspaco() {
    var idLocal = document.getElementById("idLocal").value;
    var formaPagamento = document.getElementById("formaPagamento").value;
    var cpf = document.getElementById("cpf").value;

    if (idLocal && formaPagamento && cpf) {
        // Cria um objeto com os detalhes do agendamento
        var agendamentoCliente = {
            idLocal: idLocal,
            formaPagamento: formaPagamento,
            cpf: cpf
        };

        // Obtém a lista de agendamentos de clientes armazenados no LocalStorage ou cria uma lista vazia
        var agendamentosClientes = JSON.parse(localStorage.getItem("agendamentosClientes")) || [];

        // Adiciona o novo agendamento à lista
        agendamentosClientes.push(agendamentoCliente);

        // Salva a lista atualizada no LocalStorage
        localStorage.setItem("agendamentosClientes", JSON.stringify(agendamentosClientes));

        // Limpa os campos
        document.getElementById("formaPagamento").value = "";
        document.getElementById("cpf").value = "";

        alert("Agendamento realizado com sucesso!");
    } else {
        alert("Por favor, preencha todos os campos.");
    }

    // Redireciona para a página de histórico de agendamentos
    window.location.href = "historico.html";
}
