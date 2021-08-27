const searchFood = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    displayMealDetail(null);
    // console.log(searchText);

    // clear data 
    searchField.value = '';
    if (searchText != '') {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        // console.log(url);

        const res = await fetch(url);
        const data = await res.json();
        displaySearchResult(data.meals);

        /* 
            fetch(url)
           .then(res => res.json())
           .then(data => displaySearchResult(data.meals))
         */
    }
    else {
        displaySearchResult(null);

    }
}

const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    const noResult = document.getElementById('no-result');
    noResult.textContent = ``;
    searchResult.textContent = ``;
    if (meals == null) {
        noResult.innerHTML = `<h1 class="text-danger text-center mt-5">Sorry! No result is found.Please input a valid data.</h1>`;
    }
    else {
        meals.forEach(meal => {
            // console.log(meal);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div onclick="mealDetail(${meal.idMeal})" class="card h-100">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">
                        ${meal.strInstructions.slice(0, 250)}
                        </p>
                    </div>
                </div>
            `
            searchResult.appendChild(div);
        })
    }
}

const mealDetail = async mealId => {
    // console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    const res = await fetch(url);
    const data = await res.json();
    displayMealDetail(data.meals[0])

    /* fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]));
     */
}

const displayMealDetail = meal => {
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = ``;
    if (meal != null) {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <div id="meal-details">
        <div class="card"">
            <img src="${meal.strMealThumb}"  class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">
                ${meal.strInstructions.slice(0, 150)}
                </p>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-primary">Go to youtube</a>
            </div>
        </div>
        `
        mealDetails.appendChild(div);
    }
    else {
        mealDetails.textContent = ``;
    }

}