let currencyForm = document.getElementById("currency-form");
let fromCurrencyInput = document.getElementById("from-currency");
let toCurrencyInput = document.getElementById("to-currency");
let amountInput = document.getElementById("amount");
let convertedParagraph = document.getElementById("paragraph");

let requestData = new XMLHttpRequest();

currencyForm.addEventListener("submit", (e) => {
	e.preventDefault();

	let fromCurrency = fromCurrencyInput.value.trim().toUpperCase();
	let toCurrency = toCurrencyInput.value.trim().toUpperCase();
	let amount = amountInput.value.trim();

	let numbersRe = /[0-9]+/;
	let charactersRe = /[A-Z]{3}/i;

	if (numbersRe.test(amount) === true && charactersRe.test(toCurrency) === true && charactersRe.test(fromCurrency)) {
		requestDataFromApi(fromCurrency, toCurrency, amount);
	}
});

function requestDataFromApi(fromCurrency, toCurrency, amount) {
	requestData.open("GET", `https://metals-api.com/api/convert?access_key=7kv2bceg306bgn7xf8h205aswjv413m4tj4z7ekbu8t8oyht8dfit0iwdb7x&%20from=${fromCurrency}&to=${toCurrency}&amount=${amount}`);
	// https://metals-api.com/api/convert?access_key=7kv2bceg306bgn7xf8h205aswjv413m4tj4z7ekbu8t8oyht8dfit0iwdb7x&%20from=GBP&to=JPY&amount=25

	requestData.onreadystatechange = function () {
		if (requestData.readyState === 4 && requestData.status === 200) {
			let dataToUse = JSON.parse(requestData.response);
			convertedParagraph.textContent = `${dataToUse.query.amount} ${dataToUse.query.from} = ${dataToUse.result.toFixed(2)} ${dataToUse.query.to}`;
		}
	};
	requestData.send();
}


