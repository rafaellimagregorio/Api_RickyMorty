const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});
const listCharacters = document.getElementById("list");
let nextUrl = null;
let prevUrl = null;
let page = 1;
let pages = 0;
let response;
let statusColor;
let statusText;

function getCharacters(url, name = "") {
  api
    .get(url)
    .then((response) => {
      const data = response.data;
      nextUrl = data.info.next;
      prevUrl = data.info.prev;
      const characters = data.results;

      if (name !== "") {
        response = `${url}?name=${name}`;
      } else {
        response = url;
      }

      render(characters);
    })
    .catch((err) => {
      alert(err);
    });
}

function searchCharacters(event) {
  event.preventDefault();
  const name = document.getElementById("input").value;
  const url = name !== "" ? `/character/?name=${name}` : "/character";
  getCharacters(url);
}

function render(characters) {
  listCharacters.innerHTML = "";

  characters.forEach((character) => {
    if (character.status === "Alive") {
      statusColor = "#56CD42";
      statusText = "Vivo";
    } else if (character.status === "Dead") {
      statusColor = "#CD4242";
      statusText = "Morto";
    } else {
      statusColor = "#BBBBBB";
      statusText = "Desconhecido";
    }

    listCharacters.innerHTML += `<div class="card">
      <div id="cardBody" class="card-img">
        <img src="${character.image}" alt="${character.name}" />
      </div>

      <div id="cardBody" class="card-body">
        <h2>${character.name}</h2>
        <div class="status">
          <li style="color: ${statusColor}"></li><strong>${statusText} - ${character.species}</strong>
        </div>
        <p style="color: gray;">Última localização conhecida</p>

        <p>
          <strong>${character.location.name}</strong>
        </p>

        <p style="color: gray;">Visto a última vez em</p>

        <p><strong>Nome do episódio</strong></p>
      </div>
    </div>`;
  });
}

function changePage(url) {
  if (url != null) {
    getCharacters(url);
  }
}

const buttonPrevPage = document.getElementById("prev");
buttonPrevPage.addEventListener("click", () => {
  changePage(prevUrl);
});

const buttonNextPage = document.getElementById("next");
buttonNextPage.addEventListener("click", () => {
  changePage(nextUrl);
});

getCharacters("/character");
