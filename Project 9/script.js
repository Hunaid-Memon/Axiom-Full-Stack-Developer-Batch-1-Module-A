const balance = document.getElementById('balance')
const moneyCredit = document.getElementById('money-credit');
const moneyDebit = document.getElementById('money-debit');
const list = document.getElementById('list');
const reason = document.getElementById('reason');
const amount = document.getElementById('amount');
const form = document.getElementById('add-form')

const Transactions = [
    {id: 1, reason: 'Salary', amount: 5000},
    {id: 2, reason: 'Dinner', amount: -200},
    {id: 3, reason: 'Utility', amount: -300},
    {id: 4, reason: 'Expense', amount: -340}
];

let transactions = Transactions;

function displayTransaction(transaction){
    const type = transaction.amount > 0 ? '+' : '-';
    const transactionLI = document.createElement('li');
    transactionLI.classList.add(transaction.amount > 0 ? 'credit' : 'debit');
    transactionLI.innerHTML = `${transaction.reason}<span>${transaction.amount}</span>
    <button class='dlt-btn' onclick='deleteTransaction(${transaction.id})'>X</button>`
    list.appendChild(transactionLI)
}

function deleteTransaction(id){
    transactions = transactions.filter( transaction => transaction.id !== id);
    init(); 
}

function updateBalance(){
    const transactionAmounts = transactions.map(transaction => transaction.amount);
    // console.log(transactionAmounts);
    const totalBalance = transactionAmounts.reduce((acc, amount) => (acc += amount), 0)
    // console.log(totalBalance);
    const creditBalance = transactionAmounts
                            .filter(amount => amount > 0)
                            .reduce((acc, account) => (acc += account), 0)
    const debitBalance = transactionAmounts
                            .filter(amount => amount < 0)
                            .reduce((acc,account) => (acc += account), 0)
    // console.log(debitBalance, creditBalance);
    balance.innerText = `$${totalBalance}`;
    moneyCredit.innertext = `$${creditBalance}`;
    moneyDebit.innerText = `$${debitBalance}`;

}

function addTransacion(e){
    e.preventDefault();
    if(reason.value.trim() === '' || amount.value.trim() === ''){
        alert('Please Provide a valid reason and amount')
    }else{
        const transaction = {
            id: createID(),
            reason: reason.value,
            amount: +amount.value
        }
        transactions.push(transaction);
        displayTransaction(transaction);
        updateBalance();
        reason.value = '';
        amount.value = '';
    }
}

function createID(){
    return Math.floor(Math.random() * 100000000000)
}

form.addEventListener('submit', addTransacion)

function init(){
    list.innerHTML = '';
    transactions.forEach(displayTransaction);
    updateBalance();
}

init();
