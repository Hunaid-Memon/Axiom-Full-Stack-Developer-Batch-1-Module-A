const submit = document.getElementById('submit');
const search = document.getElementById('search');
const generate = document.getElementById('generate');
const resultsHeading = document.getElementById('results-heading');
const meals = document.getElementById('meals');
const selectedMeal = document.getElementById('selected-meal');


function searchMeal(e) {
    e.preventDefault();
    const searchText = search.value;
    // console.log(searchText);
    if (searchText.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.meals);
                resultsHeading.innerHTML = `<h2>Search Results for ${searchText}</h2>`
                if (data.meals === null) {
                    resultsHeading.innerHTML = `<h2>No Result found for ${searchText}</h2>`
                }else{
                    meals.innerHTML = data.meals.map(meal => `
                    <div class='meal'>
                        <img src='${meal.strMealThumb}' alt='${meal.strMeal}' />
                        <div class='meal-info' data-mealID='${meal.idMeal}'>
                            <h3>${meal.strMeal}
                        </div>
                    </div>
                    `).join('');
                }
            });
        search.value = ''
    }else{
        return false
    }
    selectedMeal.innerHTML = ''
}

function getMeal(mealId){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0]
            displayMealDetail(meal);
        })
}

function displayMealDetail(meal){
    meals.innerHTML = '';
    resultsHeading.innerHTML = '';
    const ingredients = [];
    for(i=1;i<=20;i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]} : ${meal[`strMeasure${i}`]}`);
        }else{
            break;
        }
        // console.log(i);
    };
    selectedMeal.innerHTML = `
        <div class='selected-meal-detail'>
            <h1>${meal.strMeal}</h1>
            <img src='${meal.strMealThumb}' alt='${meal.strMeal}'/>
            <div class='selected-meal-info'>
                ${meal.strCategory ? `<h4>Catogory : ${meal.strCategory}</h4>` : ''}
                ${meal.strArea ? `<h4>Area : ${meal.strArea}</h4>` : ''}
            </div>
            <div class='selected-meal-instructions'>
                ${meal.strInstructions}
                <h3>Ingredients</h3>
                <ul>
                    ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
        </div>
    `
};

meals.addEventListener('click' , e =>{
    const mealInfo = e.path.find(item => {
        if(item.classList){
            return item.classList.contains('meal-info')
        }else {
            return false
        }
    });

    if(mealInfo){
        const mealId = mealInfo.getAttribute('data-mealId');
        getMeal(mealId)
    }
})

generate.addEventListener('click',() =>{
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data =>{
        // console.log(data.meals[0]);
        const meal = data.meals[0];
        displayMealDetail(meal)
    })
})

submit.addEventListener('submit', searchMeal);