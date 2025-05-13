function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function enviarMensagem() {
  const mensagem = document.getElementById("mensagem").value.trim();
  const sender = document.getElementById("nome").value.trim(); // input com ID 'nome'
  const user = getQueryParam("user") || "Nataraujjo";

  if (!mensagem || !sender) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  fetch("https://script.google.com/macros/s/AKfycbyFhTgflbyASxQSrbez5cHHntkv1fETOxlXL1RCMQ_z5WU8ii61bRqowKBJA27mhC-H/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user: user,
      sender: sender,
      message: mensagem
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === "sucesso") {
      alert("Mensagem enviada com sucesso!");
      document.getElementById("mensagem").value = "";
      document.getElementById("nome").value = "";
    } else {
      alert("Erro ao enviar: " + data.mensagem);
    }
  })
  .catch(error => {
    alert("Erro ao enviar mensagem.");
    console.error(error);
  });
}
