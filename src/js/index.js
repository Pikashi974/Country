const rangeObject = document.querySelector("#rangeObject");
const rangeValue = document.querySelector("#rangeValue");

let tableMapped;
let tableCountries;

async function init() {
  tableCountries = await fetchCountries();
  tableMapped = displayCountries();
  rangeValue.textContent = rangeObject.value;
  showCountries(rangeObject.value);
}

init();

rangeObject.addEventListener("change", function () {
  rangeValue.textContent = rangeObject.value;
  showCountries(rangeObject.value);
});

floatingInput.addEventListener("keyup", function () {
  rangeValue.textContent = rangeObject.value;
  tableMapped = displayCountries();
  showCountries(rangeObject.value);
});

function fetchCountries() {
  return fetch("https://restcountries.com/v3.1/all").then((response) =>
    response.json()
  );
}
function displayCountries() {
  var valeur = document.querySelector("#floatingInput").value.toLowerCase();
  return tableCountries
    .filter(
      (country) =>
        (country.capital &&
          country.capital[0].toLowerCase().includes(valeur)) ||
        country.translations.fra.common.toLowerCase().includes(valeur)
    )
    .map((country) => {
      var objetCountry = {};
      objetCountry.Drapeau = country.flags.svg;
      objetCountry.Nom = country.translations.fra.common;
      objetCountry.Capitale = country.capital;
      objetCountry.Population = country.population;
      return objetCountry;
    });
}

function showCountries(max) {
  document.querySelector("#showCountries").innerHTML = "";
  for (let index = 0; index < Math.min(max, tableMapped.length); index++) {
    const element = tableMapped[index];
    // On vérifie que la capitale a bien été renseignée
    let capitale = element.Capitale ? element.Capitale[0] : "Inconnu";
    document.querySelector("#showCountries").innerHTML +=
      `<div class="list-group m-1">
        <img src="` +
      element.Drapeau +
      `" width=100>
            <h5>` +
      element.Nom +
      `</h5>
             <small>` +
      capitale +
      `</small>
      <small>Population: ` +
      element.Population +
      `</small>
      </div>`;
  }
}

function sortTable(texte) {
  switch (texte) {
    case "croissant":
      tableMapped.sort((a, b) => a.Population - b.Population);
      break;
    case "decroissant":
      tableMapped.sort((a, b) => b.Population - a.Population);
      break;
    case "alphabet":
      tableMapped.sort((a, b) => {
        if (a.Nom < b.Nom) {
          return -1;
        } else if (a.Nom > b.Nom) {
          return 1;
        } else {
          return 0;
        }
      });
      break;
    default:
      break;
  }
  showCountries(rangeObject.value);
}
