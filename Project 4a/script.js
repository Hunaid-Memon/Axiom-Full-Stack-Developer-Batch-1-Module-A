const currencyOne = document.getElementById('currency-one');
const amountOne = document.getElementById('amount-one');
const currencyValue = document.getElementById('currency-value');
const currencyAmount = document.getElementById('currency-amount');

// conversionRates = [];
// function addData(data){
//     conersionRates.push(data)
//     console.log(conversionRates);
// }

function calculate() {
    currencyCodeValue = currencyOne.value;
    fetch(`https://v6.exchangerate-api.com/v6/90090eb878113fc17b55d8d7/latest/${currencyCodeValue}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data.conversion_rates);
            const conversionRates = data.conversion_rates;
            for (const key in conversionRates) {

                // console.log(`${key}: ${conversionRates[key]} ${amountOne.value}`);
                // currencyValue.innerHTML = (`${key}: ${conversionRates[key]} `);
                // currencyValue.innerHTML = (`${key}: ${conversionRates[key]} `);
                const currency = key;
                const exchangeRate = conversionRates[key]
                const value = exchangeRate * amountOne.value
                console.log(currency,exchangeRate,value);
                currencyValue.innerHTML +=`<p></p>`
                // currencyAmount.innerHTML +=`<p></p>`
                currencyValue.innerHTML += `<p>${currency} ${value}</p>`;
                // currencyAmount.innerHTML += `<p>${value}</p>`;
                break;
            }
            // console.log(amountOne.value);
            // for(i=0;i<=data.conversion_rates.length;i++){
            //     const element = data.conversion_rates[i];
            //     console.log(element);
            // }
            // const conversionRates = data.conversion_rates[0];
            // console.log(conversionRates);
            // currencyValue.innerHTML = `<h3>${conversionRates}</h3>`
        })

}  
calculate();

currencyOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate)
// currencyValue.addEventListener('change', calculate)