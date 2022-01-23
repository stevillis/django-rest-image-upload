const getUrl = window.location;
const baseUrl = getUrl.protocol + "//" + getUrl.host;

const inputFoto = document.querySelector("#foto");
const inputsubmit = document.querySelector("#submit");
const imageFromServer = document.querySelector("#imageFromServer");
const small = document.querySelector("small");

function validateForm() {
  const file = inputFoto.files[0];
  const descricao = file.name;

  if (file) {
    let data = new FormData();
    data.append("foto", file);
    data.append("descricao", descricao);

    fetch(`${baseUrl}/imagens/`, {
      method: "POST",
      body: data,
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          imageFromServer.style.display = "block";
          imageFromServer.setAttribute("src", data.foto);
          imageFromServer.setAttribute("descricao", data.descricao);
        });
      }
    });
  } else {
    small.style.display = "block";
  }
}

inputsubmit.addEventListener("click", () => {
  validateForm();
});

small.style.display = "none";
imageFromServer.style.display = "none";
