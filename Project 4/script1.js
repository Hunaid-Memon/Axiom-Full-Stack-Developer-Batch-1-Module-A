const currencyOne = document.getElementById('currency-one');
const currencyTwo = document.getElementById('currency-two');
const amountCurrencyOne = document.getElementById('amount-one');
const amountCurrencyTwo = document.getElementById('amount-two');
const rate = document.getElementById('rate');
const swap = document.getElementById('swap');


function calculate(){
    const currencyOneCode = currencyOne.value;
    const currencyTwoCode = currencyTwo.value;
    console.log(currencyOneCode, currencyTwoCode);
    fetch(`https://v6.exchangerate-api.com/v6/90090eb878113fc17b55d8d7/pair/${currencyOneCode}/${currencyTwoCode}`)
        .then(res => res.json())
        .then(data => {
            const conversionRate = data.conversion_rate;
            rate.innerText = `1 ${currencyOneCode} ${conversionRate} ${currencyTwoCode}`;
            amountCurrencyTwo.value = (amountCurrencyOne.value * conversionRate).toFixed(2);
        });
}

currencyOne.addEventListener('change', calculate);
amountCurrencyOne.addEventListener('input', calculate);
currencyTwo.addEventListener('change', calculate);
amountCurrencyTwo.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    calculate();
})

calculate();