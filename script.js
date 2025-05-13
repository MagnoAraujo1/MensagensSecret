function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function enviarMensagem() {
  const nome = document.getElementById("nome").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();
  const usuario = getQueryParam("user") || "desconhecido";

  if (!nome) {
    alert("Por favor, preencha seu nome.");
    return;
  }

  if (!mensagem) {
    alert("Por favor, digite uma mensagem.");
    return;
  }

  fetch("https://script.google.com/macros/s/AKfycbyFhTgflbyASxQSrbez5cHHntkv1fETOxlXL1RCMQ_z5WU8ii61bRqowKBJA27mhC-H/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user: usuario,
      sender: nome,
      message: mensagem
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === "sucesso") {
      alert("Mensagem enviada com sucesso!");
      document.getElementById("nome").value = "";
      document.getElementById("mensagem").value = "";
    } else {
      alert("Erro ao enviar: " + data.mensagem);
    }
  })
  .catch(error => {
    alert("Erro ao enviar mensagem.");
    console.error("Erro:", error);
  });
}
