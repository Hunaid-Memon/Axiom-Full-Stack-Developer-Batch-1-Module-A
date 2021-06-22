const submit = document.getElementById('submit');
const search = document.getElementById('search');
const generate = document.getElementById('generate');
const resultsHeading = document.getElementById('results-heading');
const meals = document.getElementById('meals');
const selectedMeal = document.getElementById('selected-meal');


function searchMeal(e) {
    e.preventDefault()
    const searchValue = search.value;
    // console.log(searchValue);
    if (searchValue.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data.meals)
                // console.log(data.meals[0])
                resultsHeading.innerHTML = `<h2>Search Results for ${searchValue}</h2>`;
                if (data.meals === null) {
                    resultsHeading.innerHTML = `<h2>No Results found for ${searchValue}</h2>`;

                } else {
                    // console.log(data.meals);
                    meals.innerHTML = data.meals.map(meal => `
                        <div class='meal'>
                            <img src='${meal.strMealThumb}' alt='${meal.strMeal}'/>
                            <div class='meal-info' data-mealID='${meal.idMeal}'>
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                    `).join('')

                }
                search.value = ''
            })
    } else {
        alert('Please Enter Meal for search')
    }
}
submit.addEventListener('submit', searchMeal);

meals.addEventListener('click', (e) => {
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info')
        } else {
            return false
        }
    });
    if (mealInfo) {
        const mealId = mealInfo.getAttribute('data-mealID');
        getMeal(mealId)
    }
});

function getMeal(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            // console.log(data.meals[0]);
            const meal = data.meals[0];
            displayMealDetail(meal);
        })
}

function displayMealDetail(meal) {
    meals.innerHTML = '';
    resultsHeading.innerHTML = '';
    const ingredients = [];
    // console.log(meal);
    // console.log(meal['strIngredient1']);
    for (i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]}: ${meal[`strMeasure${i}`]}`);
            // console.log(ingredients);
        } else {
            break;
        }
    }
    selectedMeal.innerHTML = `
        <div class='selected-meal-detail'>
            <h3>${meal.strMeal}</h3>
            <img src='${meal.strMealThumb}' alt='${meal.strMeal}'/>
            <div class='selected-meal-info'>
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class='selected-meal-instructions'>
                <p>${meal.strInstructions}</p>
                <h3>Ingredients</h3>
                <ul>
                    ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
        </div> `
}

generate.addEventListener('click', () =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => {
            // console.log(data.meals);
            // console.log(data.meals[0]['strIngredient1']);
            // console.log(data.meals[0].strIngredient1)
            const meal = data.meals[0]
            // console.log(meal['strIngredient1']);
            displayMealDetail(meal)
        })
})