const rangeObject = document.querySelector("#rangeObject");
const rangeValue = document.querySelector("#rangeValue");

let tableCountries = [];

function init() {}

init();

rangeObject.addEventListener("change", function () {
  rangeValue.textContent = rangeObject.value;
});

function fetchCountries() {
  return fetch("https://restcountries.com/v3.1/all").then((response) =>
    response.json()
  );
}
