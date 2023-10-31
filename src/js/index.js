const rangeObject = document.querySelector("#rangeObject");
const rangeValue = document.querySelector("#rangeValue");

function init() {}

init();

rangeObject.addEventListener("change", function () {
  rangeValue.textContent = rangeObject.value;
});
