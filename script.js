function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function enviarMensagem() {
  const mensagem = document.getElementById("mensagem").value;
  const usuario = getQueryParam("user") || "desconhecido";

  if (!mensagem.trim()) {
    alert("Por favor, digite uma mensagem.");
    return;
  }

  fetch("https://script.google.com/macros/s/AKfycbzuYYbZlJO9q5j_7NcvFq4rOhY4p3539SO8jCEdWugHjA1FiJTdG9RavcH2q3KyJxCi/exec", {
    method: "POST",
    body: JSON.stringify({
      user: usuario,
      message: mensagem
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.text())
  .then(data => {
    alert("Mensagem enviada com sucesso!");
    document.getElementById("mensagem").value = "";
  })
  .catch(error => {
    alert("Erro ao enviar mensagem.");
    console.error(error);
  });
}
