const searchForm = document.getElementById('form');
const searchInput = document.getElementById('search');
const resultsContainer = document.getElementById('results');
const pagination = document.getElementById('pagination');

const apiURL = 'https://api.deezer.com';

async function search(searchText) {
    // console.log(`${apiURL}/search?q=${searchText}`);
    const res = await fetch(`${apiURL}/search?q=${searchText}`);
    const data = await res.json();
    console.log(data);
}


searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const searchText = searchInput.value.trim();
    if (!searchText) {
        alert('Please Provide Valid Input');
    } else {
        search(searchText)
    }
})