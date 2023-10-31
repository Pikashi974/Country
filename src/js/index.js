const rangeObject = document.querySelector("#rangeObject");
const rangeValue = document.querySelector("#rangeValue");

let tableCountries = [];

async function init() {
  tableCountries = await fetchCountries();
}

init();

rangeObject.addEventListener("change", function () {
  rangeValue.textContent = rangeObject.value;
});

function fetchCountries() {
  return fetch("https://restcountries.com/v3.1/all").then((response) =>
    response.json()
  );
}
function displayCountries() {
  return tableCountries.map((country) => {
    var objetCountry = {};
    objetCountry.Drapeau = country.flags.svg;
    objetCountry.Nom = country.translations.fra.common;
    objetCountry.Capitale = country.capital;
    objetCountry.Population = country.population;
    return objetCountry;
  });
}
