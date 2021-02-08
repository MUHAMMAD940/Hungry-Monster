//search button js
const error = document.getElementById('error-msg');
document.getElementById('search-btn').addEventListener("click", () => {
    const inputMeal = document.getElementById('food-name').value;
    if (inputMeal === "") {
        error.style.display = 'block';
    } else {
        displayMeal(inputMeal);
        error.style.display = 'none';
    }
})

//Search food js code
const displayMeal = name => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then((res) => res.json())
        .then(data => displayFoodName(data.meals));

    const displayFoodName = foods => {
        console.log("cfffaa");
        if (foods != null) {
            console.log("foods if");
            const foodsDiv = document.getElementById('foods');
            foodsDiv.innerHTML = "";
            foods.forEach(food => {
                const foodDiv = document.createElement('div');
                foodDiv.className = 'all-food';
                const foodInfo = `
                <div onclick="displayFoodDetails('${food.idMeal}')"> 
                    <img src="${food.strMealThumb}">
                    <h3>${food.strMeal}</h3>
                </div>
            `;

                foodDiv.innerHTML = foodInfo;
                foodsDiv.appendChild(foodDiv);
            });
        } else {
            error.style.display = 'block';
        }
    }
};

//Show food details information
const displayFoodDetails = foodId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayRecipe(data.meals[0]));
}

let displayRecipe = (data) => {
    document.getElementById("foods").style.display = "none";
    document.getElementById('search-bar').style.display = 'none';
    let fullDescription = `
    <div id="food-main">
            <img src="${data.strMealThumb}">
        <div class="text-item">
            <h3>${data.strMeal}</h3>
            <p>Ingredient</p>
            <h4>${data.strMeasure1}, ${data.strIngredient1}</h4>
            <h4>${data.strMeasure2}, ${data.strIngredient2}</h4>
            <h4>${data.strMeasure3}, ${data.strIngredient3}</h4>
            <h4>${data.strMeasure4}, ${data.strIngredient4}</h4>
            <h4>${data.strMeasure5}, ${data.strIngredient5}</h4>
            <h4>${data.strMeasure6}, ${data.strIngredient6}</h4>
            <h4>${data.strMeasure7}, ${data.strIngredient7}</h4>
            <h4>${data.strMeasure8}, ${data.strIngredient8}</h4>
            <h4>${data.strMeasure9}, ${data.strIngredient9}</h4>
        </div>
    </div>
    `;

    // create new div
    let newDiv = document.createElement("div");
    newDiv.className = "Description";
    newDiv.id = "Description";
    newDiv.innerHTML = fullDescription;

    document.body.appendChild(newDiv);
};