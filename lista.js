window.onload = function() {
    const listaClientes = document.getElementById("clientes-lista");
    listaClientes.innerHTML = "<h2>Clientes Cadastrados</h2>";
    
    // Recupera os clientes da sessionStorage
    let clientes = JSON.parse(sessionStorage.getItem('clientes')) || [];
    
    // Verifica se há clientes cadastrados
    if (clientes.length === 0) {
        listaClientes.innerHTML += "<p>Nenhum cliente cadastrado ainda.</p>";
    } else {
        // Exibe os clientes cadastrados
        clientes.forEach(function(cliente, index) {
            // Formata a data de entrada para DD/MM/AAAA
            const dataEntradaFormatada = formatarData(cliente.dataEntrada);

            listaClientes.innerHTML += `
                <div class="cliente">
                    <h3>${cliente.nome}</h3>
                    <p><strong>CPF:</strong> ${cliente.cpf}</p>
                    <p><strong>RG:</strong> ${cliente.rg}</p>
                    <p><strong>Endereço:</strong> ${cliente.endereco}</p>
                    <p><strong>Data de Entrada:</strong> ${dataEntradaFormatada}</p>

                    <p><strong>Status:</strong> 
                        <select id="status-${index}" onchange="alterarStatus(${index}, this.value)">
                            <option value="em-andamento" ${cliente.status === 'em-andamento' ? 'selected' : ''}>Em Andamento</option>
                            <option value="concluído" ${cliente.status === 'concluído' ? 'selected' : ''}>Concluído</option>
                        </select>
                    </p>
                    <p><strong>Renovva:</strong> 
                        <select id="status-${index}" onchange="alterarStatus(${index}, this.value)">
                            <option value="em-andamento" ${cliente.status === 'em-andamento' ? 'selected' : ''}>Em Andamento</option>
                            <option value="concluído" ${cliente.status === 'concluído' ? 'selected' : ''}>Concluído</option>
                        </select>
                    </p>

                    <p><strong>Forma de Pagamento:</strong> ${cliente.formaPagamento}</p>
                    <p><strong>Valor:</strong> R$ ${cliente.valor}</p>
                    <p><strong>Data de Conclusão:</strong> ${cliente.dataConclusao || 'Não concluído'}</p>
                </div>`;
        });
    }
};

function formatarData(data) {
    const partesData = data.split("-");
    return `${partesData[2]}/${partesData[1]}/${partesData[0]}`;
}


function alterarStatus(index, novoStatus) {
    let clientes = JSON.parse(sessionStorage.getItem('clientes')) || [];
    if (novoStatus === 'concluído') {
        clientes[index].status = novoStatus;
        clientes[index].dataConclusao = new Date().toLocaleDateString(); // Adiciona a data de conclusão atual
    } else {
        clientes[index].status = novoStatus;
        clientes[index].dataConclusao = null; // Remove a data de conclusão se o status não for "concluído"
    }
    sessionStorage.setItem('clientes', JSON.stringify(clientes));
    location.reload(); // Recarrega a página para atualizar a lista de clientes
}

function downloadRelatorio() {
    const clientes = JSON.parse(sessionStorage.getItem('clientes')) || [];
    let relatorio = "Relatório de Clientes Cadastrados:\n\n";

    clientes.forEach(function(cliente, index) {
        relatorio += `Cliente ${index + 1}:\n`;
        relatorio += `Nome: ${cliente.nome}\n`;
        relatorio += `CPF: ${cliente.cpf}\n`;
        relatorio += `RG: ${cliente.rg}\n`;
        relatorio += `Endereço: ${cliente.endereco}\n`;
        relatorio += `Data de Entrada: ${cliente.dataEntrada}\n`;
        relatorio += `Status: ${cliente.status}\n`;
        relatorio += `Renovva: ${cliente.status}\n`;
        relatorio += `Forma de Pagamento: ${cliente.formaPagamento}\n`;
        relatorio += `Valor: R$ ${cliente.valor}\n`;
        if (cliente.status === 'concluído' && cliente.dataConclusao) {
            relatorio += `Data de Conclusão: ${cliente.dataConclusao}\n`;
        }
        relatorio += "\n";
    });

    const blob = new Blob([relatorio], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "relatorio_clientes.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
