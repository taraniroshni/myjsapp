document.addEventListener("DOMContentLoaded", function () {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const resultDisplay = document.getElementById('result');

    async function convertCurrency(amount, fromCurrency, toCurrency) {
        const apiKey = 'e8c1cc40ce01dce9350980d8';
        const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.result === 'success') {
                const result = amount * data.conversion_rate;
                return result.toFixed(2);
            } else {
                throw new Error(`Error: ${data.result} - ${data['error-type']}`);
            }
        } catch (error) {
            console.error('Error fetching exchange rates:', error.message);
            throw new Error('Unable to fetch exchange rates. Please try again later.');
        }
    }

    function handleCurrencyConversion() {
        const amountToConvert = parseFloat(amountInput.value);
        const fromCurrencyCode = fromCurrencySelect.value;
        const toCurrencyCode = toCurrencySelect.value;

        // Call the convertCurrency function
        convertCurrency(amountToConvert, fromCurrencyCode, toCurrencyCode)
            .then(result => {
                resultDisplay.innerText = `${amountToConvert} ${fromCurrencyCode} is ${result} ${toCurrencyCode}`;
            })
            .catch(error => {
                console.error(error.message);
                resultDisplay.innerText = 'Error converting currency. Please try again.';
            });
    }

    // Attach event listener to the Convert button
    const convertButton = document.querySelector('button');
    convertButton.addEventListener('click', handleCurrencyConversion);
});
