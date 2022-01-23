const inputFoto = document.querySelector("#foto");
const inputDescricao = document.querySelector("#descricao");
inputFoto.addEventListener("change", (event) => {
  const file = event.target.files[0];
  inputDescricao.value = file.name;
});
