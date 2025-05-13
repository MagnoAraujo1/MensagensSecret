function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function enviarMensagem() {
  const mensagem = document.getElementById("mensagem").value.trim();
  const nome = document.getElementById("nome").value.trim();
  const usuario = getQueryParam("user") || "desconhecido";

  if (!nome || !mensagem) {
    alert("Por favor, preencha seu nome e a mensagem.");
    return;
  }

  const url = `https://script.google.com/macros/s/AKfycbyFhTgflbyASxQSrbez5cHHntkv1fETOxlXL1RCMQ_z5WU8ii61bRqowKBJA27mhC-H/exec` +
              `?user=${encodeURIComponent(usuario)}` +
              `&sender=${encodeURIComponent(nome)}` +
              `&message=${encodeURIComponent(mensagem)}`;

  fetch(url)
    .then(response => response.text())
    .then(data => {
      alert("Mensagem enviada com sucesso!");
      document.getElementById("mensagem").value = "";
      document.getElementById("nome").value = "";
    })
    .catch(error => {
      console.error(error);
      alert("Erro ao enviar mensagem.");
    });
}
