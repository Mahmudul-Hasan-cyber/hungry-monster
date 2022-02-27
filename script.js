const getSearchResult = () => {
    const searchField = document.getElementById('search-text');
   const searchText = searchField.value;
   // Clear Search Field
     searchField.value = '';
      // Clear Error Message
     document.getElementById('empty-field').innerText = '';
     if(searchText == ''){
      document.getElementById('empty-field').innerText = 'Please type your meal name!!';
     
     }else{
       // Load Data
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

          fetch(url)
          .then(res => res.json())
          .then(data => displaySearchResult(data.meals))
  }
  
  
}

// Function Display Meals
const displaySearchResult = meals => {
  if(meals) 
  {
    let mealContainer = ''
    meals.forEach(meal => {
        mealContainer += `
      <div class="col-xm-1 col-md-3 p-3 d-flex justify-content-center">
        <div onclick="getMealDetails(${meal.idMeal})" class="card border-0 shadow" style="width:18rem; border-radius:10px">
            <img src="${meal.strMealThumb}" class="card-img-top" style="width:18rem; border-radius: 10px 10px 0 0">
            <div class="card-body">
            <h5 class="card-title text-center">${meal.strMeal}</h5>
            </div>
      </div>
    </div>
  `;

    });
  const searchResult =   document.getElementById('container-meal')
  searchResult.textContent = '';
  searchResult.innerHTML = mealContainer;

  } else{
    const noSearchResult = document.getElementById('empty-field')
    noSearchResult.innerText = "Your search name didn't match, please type proper meal name!!";
  }
   
  
}

// Function Display Meal Details
const getMealDetails = mealId => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
  .then(res => res.json())
  .then(data => displayMealDetails(data.meals[0]))
}

const displayMealDetails = meals => {
  const containerMealDetails = document.getElementById('container-meal-details');
    containerMealDetails.innerHTML = `
    <div id="meal-details" class="card px-0 pb-1 shadow col-xm-12 col-sm-12 col-md-6" style="border-radius: 10px">
        <img src="${meals.strMealThumb}"class="card-img-top" style="border-radius: 10px 10px 0 0">
        <div class="card-body">
        <h2 class="card-title text-center my-4">${meals.strMeal}</h2>
        <h4 class="card-title mt-4">Meal Ingredients</h4>
        <ol id="meal-ingredients"></ol> 
      </div>
    </div>
    `;
  const mealIngredients = document.getElementById('meal-ingredients')

  for (let i = 1; meals[`strIngredient${i}`]; i++) {
    const ingredients = `
    ${meals[`strMeasure${i}`]} ${meals[`strIngredient${i}`]}
    `;
    const mealDetailsLi = document.createElement('li');
    
    mealDetailsLi.innerText = ingredients
    mealIngredients.appendChild(mealDetailsLi)
  }
}
