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

        userDiv.innerHTML = `<strong>${user.name}</strong> ${user.balance}`;
        main.appendChild(userDiv);
    })
}

getRandomUser();
getRandomUser();
