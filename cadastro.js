document.getElementById("cadastro-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário
    
    // Coleta os valores dos campos do formulário
    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const rg = document.getElementById("rg").value;
    const endereco = document.getElementById("endereco").value;
    const renovvaValor = document.getElementById("renovva-valor").value;
    const dataEntrada = document.getElementById("data-entrada").value;
    const formaPagamento = document.getElementById("forma-pagamento").value;
    const valor = document.getElementById("valor").value;
    
    // Cria um objeto com os dados do cliente
    const cliente = { 
        nome,
        cpf,
        rg,
        endereco,
        renovvaValor,
        dataEntrada, 
        formaPagamento,
        valor,
        status: 'em-andamento' // Define o status padrão como "Em Andamento"
    };
    
    // Armazena o cliente no localStorage
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes.push(cliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    
    // Redireciona para a página de lista de clientes
    window.location.href = "lista.html";
});
