//Get DOM Elements
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const filterBtn = document.getElementById('show-millionairs');
const sortBtn = document.getElementById('sort');
const sumBtn = document.getElementById('sum');

let data = [];

//fetch Random user for ramdomuser.me API

async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    // console.log(data);

    const user = data.results[0]
    // console.log(user);

    const newUser = {
        name: `${user.name.title} ${user.name.first} ${user.name.last}`,
        balance: Math.floor(Math.random() * 1000000)
    }

    // console.log(newUser);

    addData(newUser);

}

addData = function (newUser) {
    data.push(newUser);
    // console.log(data);
     
    updateDOM()
};

function updateDOM(userData = data){
    // console.log(userData);
    //clear previous UI
    main.innerHTML = `<h2><strong>User</strong> Wealth</h2>`

    userData.forEach( user => {
        // console.log(data.length,user);
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');

        userDiv.innerHTML = `<strong>${user.name}</strong> ${formatNumberToDollar(user.balance)}`;
        main.appendChild(userDiv);
    })
}

function formatNumberToDollar(number){
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

function doubleMoney(){
    data = data.map(user => {
        return {
            ...user , balance: user.balance * 2
        }
    });
    updateDOM()
}

function filterUser(){
    // data = data.filter(user => user.balance >= 1000000);
    data = data.filter(function(user){
        return user.balance >= 1000000;
    })

    updateDOM()
}

function sortByBalance(){
    data = data.sort((a,b) => a.balance - b.balance)
    updateDOM();
}

function totalBalance(){
    updateDOM();
    const balance = data.reduce((acc,user) => (acc += user.balance), 0);
    const balanceElement = document.createElement('div');
    balanceElement.innerHTML = `<h3>Total Balance: ${formatNumberToDollar(balance)}</h3>`;
    main.appendChild(balanceElement)
}

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
filterBtn.addEventListener('click', filterUser);
sortBtn.addEventListener('click', sortByBalance);
sumBtn.addEventListener('click', totalBalance)


getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();
