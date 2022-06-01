let currencyForm = document.getElementById("currency-form");
let fromCurrencyInput = document.getElementById("from-currency");
let toCurrencyInput = document.getElementById("to-currency");
let amountInput = document.getElementById("amount");
let convertedParagraph = document.getElementById("paragraph");

let requestData = new XMLHttpRequest();

function showAlert() {
	let alertDiv = document.createElement("div");
	let alertOverlay = document.createElement("div");
	let alertContent = document.createElement("div");
	let alertCrossMark = document.createElement("div");
	let alertP = document.createElement("p");

	alertDiv.id = "alert";
	alertOverlay.classList.add("overlay");
	alertContent.classList.add("content");
	alertCrossMark.classList.add("cross-mark");
	alertP.classList.add("text");
	alertP.textContent = "Please make sure to use 3 characters only for the first and second fields, and use Number only for the third filed";

	alertOverlay.addEventListener("click", deleteAlert);
	alertCrossMark.addEventListener("click", deleteAlert);

	function deleteAlert() {
		alertDiv.remove();
	}

	document.body.append(alertDiv);
	alertDiv.append(alertOverlay);
	alertDiv.append(alertContent);
	alertContent.append(alertCrossMark);
	alertContent.append(alertP);
}

showAlert();

currencyForm.addEventListener("submit", (e) => {
	e.preventDefault();

	let fromCurrency = fromCurrencyInput.value.trim().toUpperCase();
	let toCurrency = toCurrencyInput.value.trim().toUpperCase();
	let amount = amountInput.value.trim();

	let numbersRe = /[0-9]+/;
	let charactersRe = /[A-Z]{3}/i;

	if (numbersRe.test(amount) === true && charactersRe.test(toCurrency) === true && charactersRe.test(fromCurrency)) {
		requestDataFromApi(fromCurrency, toCurrency, amount);
	} else {
		showAlert();

	}
});

function requestDataFromApi(fromCurrency, toCurrency, amount) {
	requestData.open("GET", `https://metals-api.com/api/convert?access_key=7kv2bceg306bgn7xf8h205aswjv413m4tj4z7ekbu8t8oyht8dfit0iwdb7x&%20from=${fromCurrency}&to=${toCurrency}&amount=${amount}`);

	requestData.onreadystatechange = function () {
		if (requestData.readyState === 4 && requestData.status === 200) {
			let dataToUse = JSON.parse(requestData.response);
			convertedParagraph.textContent = `${dataToUse.query.amount} ${dataToUse.query.from} = ${dataToUse.result.toFixed(2)} ${dataToUse.query.to}`;
		}
	};

	requestData.send();
}


