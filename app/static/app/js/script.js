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

/*
* Ao clicar no botão "Enviar", é feita uma requisição POST na rota imagens/
* enviando a imagem selecionada no corpo da Requisição.
*
* Detectando ou não rostos de gatos na imagem enviada, será exibida uma imagem
* redimensionada com largura de 350px abaixo do botão "Enviar" e um link para abrir a imagem
* com tamanho original logo abaixo.
*
* Caso sejam detectados gatos nas imagens, a resposta HTTP terá o código 200 e a imagem exibida
* mostrará os retângulos verdes em torno dos gatos.
*
* Se uma imagem não puder ser lida pela API, um erro 400 e uma mensagem de erro é exibida.
*
* Se a requisição for feita sem o envio da imagem, uma mensagem de erro também é exibida.
* */
inputsubmit.addEventListener("click", () => {
  hideMessages();
  validateForm();
});

hideMessages();
