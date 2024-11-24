const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.submit');
const container = document.querySelector('.container');
const recipeDetails = document.querySelector('.content');
const closeBtn = document.querySelector('.close');

const fetchApi = async (query) => {
    container.innerHTML = "<h2>Fetching Recipes...</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    container.innerHTML = "";
    response.meals.forEach(meal => {
        const Div = document.createElement('div');
        Div.classList.add('recipe');
        Div.innerHTML = `<img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>`

        const button = document.createElement('button');
        button.textContent = "View Recipes";
        Div.appendChild(button);

        button.addEventListener('click', () => {
            openRecipePopup(meal);
        })

        container.appendChild(Div);
    });
}

const fetchIngredients = (meal) => {
    let ingredientList = "";
    for(let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
} 

const openRecipePopup = (meal) => {
    recipeDetails.innerHTML = `<h2 class="name">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="list">${fetchIngredients(meal)}</ul>
    <div class="instruct">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>    `
    recipeDetails.parentElement.style.display = "block";
}

closeBtn.addEventListener('click', () => {
    recipeDetails.parentElement.style.display = "none";
})

searchBtn.addEventListener('click' , (e) =>{
    e.preventDefault(); 
    const searchIn = searchBox.value.trim();
    if(!searchIn){
        container.innerHTML = `"<h2>Type the meal in the search box.</h2>`;
        return;
    }
    const Input = searchBox.value.trim();
    fetchApi(Input);   
});