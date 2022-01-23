const getUrl = window.location;
const baseUrl = getUrl.protocol + "//" + getUrl.host;

const inputImagem = document.querySelector("#imagem");
const inputsubmit = document.querySelector("#submit");
const imagemFromServer = document.querySelector("#imagemFromServer");
const imagemWaiting = document.querySelector("#imagemWaiting");
const mensagemErro = document.querySelector("#mensagemErro");
const linkImagemFromServer = document.querySelector("#linkImagemFromServer");

function hideMessages() {
  mensagemErro.style.display = "none";
  imagemWaiting.style.display = "none";
  imagemFromServer.style.display = "none";
  linkImagemFromServer.style.display = "none";
}

function validateForm() {
  const file = inputImagem.files[0];
  // const descricao = file.name;

  if (file) {
    imagemWaiting.style.display = "block";

    let data = new FormData();
    data.append("imagem", file);
    // data.append("descricao", descricao);

    fetch(`${baseUrl}/imagens/`, {
      method: "POST",
      body: data,
    }).then((response) => {
      switch (response.status) {
        case 200:
          response.json().then((data) => {
            const quantidadeGatos = parseInt(data.quantidade_gatos);

            imagemWaiting.style.display = "none";
            mensagemErro.style.display = "none";

            imagemFromServer.style.display = "block";
            imagemFromServer.setAttribute("src", data.imagem);
            // imagemFromServer.setAttribute("alt", data.descricao);

            linkImagemFromServer.style.display = "block";
            if (quantidadeGatos > 0) {
              linkImagemFromServer.setAttribute("href", data.imagem);
              linkImagemFromServer.innerText =
                "Abrir imagem em tamanho original";
              linkImagemFromServer.style.pointerEvents = "auto";
            } else {
              linkImagemFromServer.innerText =
                "Não consegui encontrar nenhum gatinho na imagem ;'(";
              linkImagemFromServer.style.pointerEvents = "none";
            }
          });
          break;
        case 400:
          imagemWaiting.style.display = "none";

          mensagemErro.style.display = "block";
          mensagemErro.innerText =
            "Ops! Parece que o a imagem que você enviou não pode ser processada. :(";
          break;
      }
    });
  } else {
    imagemWaiting.style.display = "none";

    mensagemErro.style.display = "block";
    mensagemErro.innerText =
      "Ocorreu um erro ao enviar sua Imagem. Por favor, selecione novamente.";
  }
}

inputsubmit.addEventListener("click", () => {
  hideMessages();
  validateForm();
});

hideMessages();
