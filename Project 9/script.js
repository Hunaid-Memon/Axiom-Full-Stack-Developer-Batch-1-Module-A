const balance = document.getElementById('balance');
const moneyCredit = document.getElementById('money-credit');
const moneyDebit = document.getElementById('money-debit');
const list = document.getElementById('list');
const form = document.getElementById('add-form');
const reason = document.getElementById('reason');
const amount = document.getElementById('amount');

const Transactions = [
    {id: 1, reason: 'Salary', amount: 5000},
    {id: 2, reason: 'Dinner', amount: -300},
    {id: 3, reason: 'Salary', amount: -100},
    {id: 4, reason: 'Expense', amount: -1000}
];

let transactions = Transactions;

function updateTransactions(transaction){
    const type = transaction.amount > 0 ? '+' : '-';
    // console.log(transactions.amount, type);
    let transactionLi = document.createElement('li');
    transactionLi.classList.add(transaction.amount > 0 ? 'credit' : 'debit');
    transactionLi.innerHTML = `${transaction.reason}<span>$${transaction.amount}</span>
    <button class="dlt-btn" onclick='deleteTransaction(${transaction.id})'>X</button>`
    list.appendChild(transactionLi)
}

function deleteTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    init();
}

function totalBalance(){
    const transactionAmount = Transactions.map(transaction => transaction.amount);
    // console.log(transactionAmount);
    const balanceTotal = transactionAmount.reduce((acc, account) => (acc += account), 0);
    const creditBalance = transactionAmount
                                .filter(amount => amount > 0)
                                .reduce((acc, account) => (acc +=account), 0);
    const debitBalance = transactionAmount
                                .filter(amount => amount < 0)
                                .reduce((acc, account) => (acc += account), 0)
    
    balance.innerText = `$${balanceTotal}`;
    moneyCredit.innerText = `$${creditBalance}`;
    moneyDebit.innerText = `$${debitBalance}`;
    
}

function addTransactions(e){
    e.preventDefault()
    if(reason.value.trim() === '' || amount.value.trim() === ''){
        alert('Please Enter Valid reason and amount')
    }else {
        const transaction = {
            id: createId(),
            reason: reason.value,
            amount: +amount.value
        }
        transactions.push(transaction);
        updateTransactions(transaction);
        totalBalance();
        reason.value = '';
        amount.value = '';
    }
}

function createId(){
    return Math.floor(Math.random() * 1000000000)
}

function init (){
    list.innerHTML = ''
    transactions.forEach(updateTransactions);
    totalBalance()
    // addTransactions()
}
init()

form.addEventListener('submit', addTransactions)
