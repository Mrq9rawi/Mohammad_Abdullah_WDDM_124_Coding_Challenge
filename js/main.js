// declare variables
let currencyForm = document.getElementById("currency-form");
let fromCurrencyInput = document.getElementById("from-currency");
let toCurrencyInput = document.getElementById("to-currency");
let amountInput = document.getElementById("amount");
let convertedParagraph = document.getElementById("paragraph");

// create a request
let requestData = new XMLHttpRequest();

// make a show alert function to give the use instructions
function showAlert() {
	// create elements
	let alertDiv = document.createElement("div");
	let alertOverlay = document.createElement("div");
	let alertContent = document.createElement("div");
	let alertCrossMark = document.createElement("div");
	let alertP = document.createElement("p");
	// add classes and content and events
	alertDiv.id = "alert";
	alertOverlay.classList.add("overlay");
	alertContent.classList.add("content");
	alertCrossMark.classList.add("cross-mark");
	alertP.classList.add("text");
	alertP.innerHTML = `
	1. Please make sure to use 3 characters only for the first and second fields. <br><br>
	2. Please make sure to use real currencies like: USD, CAD, JOD. <br><br>
	3. Please use Number only for the third filed.`;
	alertOverlay.addEventListener("click", deleteAlert);
	alertCrossMark.addEventListener("click", deleteAlert);
	// delete the alert if the user click the overlay or the cross-mark
	function deleteAlert() {
		alertDiv.remove();
	}
	// add elements to the DOM
	document.body.append(alertDiv);
	alertDiv.append(alertOverlay);
	alertDiv.append(alertContent);
	alertContent.append(alertCrossMark);
	alertContent.append(alertP);
}

// show the alert after 2 seconds of the site loading
window.onload = setTimeout(showAlert, 1000);

// add the event to the from
currencyForm.addEventListener("submit", (e) => {
	// prevent the site from loading
	e.preventDefault();
	// get the user input variables
	let fromCurrency = fromCurrencyInput.value.trim().toUpperCase();
	let toCurrency = toCurrencyInput.value.trim().toUpperCase();
	let amount = amountInput.value.trim();
	// declare regex
	let numbersRe = /[0-9]+/;
	let charactersRe = /[A-Z]{3}/i;
	// validate user input
	if (numbersRe.test(amount) === true && charactersRe.test(toCurrency) === true && charactersRe.test(fromCurrency)) {
		requestDataFromApi(fromCurrency, toCurrency, amount);
	} else {
		// show alert if the validation did not go throw
		showAlert();
	}
});

// GET the data from the API
function requestDataFromApi(fromCurrency, toCurrency, amount) {
	// open the request
	requestData.open("GET", `https://metals-api.com/api/convert?access_key=7kv2bceg306bgn7xf8h205aswjv413m4tj4z7ekbu8t8oyht8dfit0iwdb7x&%20from=${fromCurrency}&to=${toCurrency}&amount=${amount}`);
	// check the state and status of the request on state change
	requestData.onreadystatechange = function () {
		// check the state and status of the request
		if (requestData.readyState === 4 && requestData.status === 200) {
			// convert the data to JS object to use
			let dataToUse = JSON.parse(requestData.response);
			// check if the conversion went successfully
			if (dataToUse.success) {
				// show response
				convertedParagraph.textContent = `${dataToUse.query.amount} ${dataToUse.query.from} = ${dataToUse.result.toFixed(2)} ${dataToUse.query.to}`;
			} else {
				// show alert
				showAlert();
			}
		}
	};
	// send the request
	requestData.send();
}