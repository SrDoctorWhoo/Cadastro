document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário
    
    // Aqui você colocaria a lógica de autenticação
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    // Exemplo de lógica de autenticação simples
    if (username === "usuario" && password === "senha") {
        // Se as credenciais estiverem corretas, redirecione para a página inicial
        window.location.href = "index.html";
    } else {
        // Caso contrário, exiba uma mensagem de erro
        alert("Credenciais inválidas. Tente novamente.");
    }
});
