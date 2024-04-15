window.onload = function() {
    const key = localStorage.getItem('cliente_em_edicao');
    const cliente = JSON.parse(localStorage.getItem(key));

    // Preenche os campos de edição com os dados do cliente
    document.getElementById('status').value = cliente.status;
    // Preencha os outros campos de edição com os dados do cliente, como nome, data de entrada, etc.
};

function salvarEdicao() {
    const key = localStorage.getItem('cliente_em_edicao');
    const cliente = JSON.parse(localStorage.getItem(key));

    // Atualiza os dados do cliente com os valores dos campos de edição
    cliente.status = document.getElementById('status').value;
    // Atualize os outros dados do cliente conforme necessário

    // Salva o cliente atualizado na localStorage
    localStorage.setItem(key, JSON.stringify(cliente));
    localStorage.removeItem('cliente_em_edicao'); // Remove a chave de cliente em edição

    window.location.href = 'lista.html'; // Redireciona de volta para a lista de clientes
}
