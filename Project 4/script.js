const currencyOne = document.getElementById('currency-one');
const amountOne = document.getElementById('amount-one');
const currencyTwo = document.getElementById('currency-two');
const amountTwo = document.getElementById('amount-two');
const rate = document.getElementById('rate');
const swap = document.getElementById('swap');


function calculate() {
    const currencyCodeOne = currencyOne.value;
    const currencyCodeTwo = currencyTwo.value;
    console.log(currencyCodeOne, currencyCodeTwo);
    fetch(`https://v6.exchangerate-api.com/v6/90090eb878113fc17b55d8d7/pair/${currencyCodeOne}/${currencyCodeTwo}`)
        .then(res => res.json())
        .then(data => {
            const exchangeRate = data.conversion_rate;
            if (amountOne.value >= 0) {
                rate.innerText = `1 ${currencyCodeOne} =  ${exchangeRate} ${currencyCodeTwo}`;
                amountTwo.value = (exchangeRate * amountOne.value).toFixed(2)
            }else{
                alert('Please Enter Positive Value!')
            }
        })
}


currencyOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
currencyTwo.addEventListener('change', calculate);
amountTwo.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    calculate();
})


calculate();