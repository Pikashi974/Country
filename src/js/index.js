const rangeObject = document.querySelector("#rangeObject");
const rangeValue = document.querySelector("#rangeValue");

let tableMapped;
let tableCountries;

async function init() {
  tableCountries = await fetchCountries();
  tableMapped = displayCountries();
  showCountries(tableMapped.length);
}

init();

rangeObject.addEventListener("change", function () {
  rangeValue.textContent = rangeObject.value;
  showCountries(rangeObject.value);
});

function fetchCountries() {
  return fetch("https://restcountries.com/v3.1/all").then((response) =>
    response.json()
  );
}
function displayCountries() {
  var valeur = document.querySelector("#floatingInput").value;

  return tableCountries
    .filter(
      (country) =>
        (country.capital && country.capital[0].includes(valeur)) ||
        country.translations.fra.common.includes(valeur)
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
  for (let index = 0; index < max; index++) {
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
