// Função para obter os parâmetros da URL
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Função para enviar a mensagem ao Google Apps Script
function enviarMensagem() {
  // Coleta os valores dos campos de nome e mensagem
  const mensagem = document.getElementById("mensagem").value.trim();
  const nome = document.getElementById("nome").value.trim();

  // Coleta o parâmetro 'user' da URL ou define "desconhecido" como padrão
  const usuario = getQueryParam("user") || "desconhecido";

  // Valida se os campos 'nome' e 'mensagem' não estão vazios
  if (!nome || !mensagem) {
    alert("Por favor, preencha seu nome e a mensagem.");
    return;
  }

  // Monta a URL de requisição para o Google Apps Script
  const url = `https://script.google.com/macros/s/AKfycbyFhTgflbyASxQSrbez5cHHntkv1fETOxlXL1RCMQ_z5WU8ii61bRqowKBJA27mhC-H/exec` +
              `?user=${encodeURIComponent(usuario)}` +
              `&sender=${encodeURIComponent(nome)}` +
              `&message=${encodeURIComponent(mensagem)}`;

  // Faz a requisição HTTP para o Google Apps Script
  fetch(url)
    .then(response => response.text()) // Converte a resposta para texto
    .then(data => {
      alert("Mensagem enviada com sucesso!");
      // Limpa os campos após o envio
      document.getElementById("mensagem").value = "";
      document.getElementById("nome").value = "";
    })
    .catch(error => {
      console.error(error); // Exibe o erro no console se ocorrer
      alert("Erro ao enviar mensagem.");
    });
}
