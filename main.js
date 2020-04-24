const createFoodComponent = (food) => {
    return `
        <section class="foodList__item">
            <h3>${food.name}</h3>
            <ul class="foodList__list">
                <li class="foodList__item--nopadding">${food.category}</li>
                <li class="foodList__item--nopadding">${food.ethnicity}</li>
                </ul>
                <li class="foodList__item--nopadding">${food.ingredients}</li>
                <li class="foodList__item--nopadding">${food.countries}</li>
                <li class="foodList__item--nopadding">${food.calories}</li>
                <li class="foodList__item--nopadding">${food.fat}</li>
                <li class="foodList__item--nopadding">${food.sugar}</li>
        </section>
    `
}

const foodContainer = document.querySelector(".foodList")

// fetch("http://localhost:8088/food")
//     .then(foods => foods.json())
//     .then(parsedFoods => {
//         parsedFoods.forEach(food => {
//             foodComponent = createFoodComponent(food)
//             foodContainer.innerHTML += foodComponent
//         })
//     })

    fetch("http://localhost:8088/food")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            console.log(food)
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    if (productInfo.product.ingredients_text) {
                      food.ingredients = productInfo.product.ingredients_text
                    } else {
                      food.ingredients = "no ingredients listed"
                    }

                    if (productInfo.product.countries) {
                        food.countries = productInfo.product.countries
                    } else {
                        food.countries = "no country listed"
                    }

                    if (productInfo.product.nutriscore_data.energy) {
                        food.calories = productInfo.product.nutriscore_data.energy
                    } else {
                        food.calories = "calories not listed"
                    }

                    if (productInfo.product.nutriscore_data.saturated_fat) {
                        food.fat = productInfo.product.nutriscore_data.saturated_fat
                    } else {
                        food.fat = "fat not listed"
                    }

                    if (productInfo.product.nutriscore_data.sugars) {
                        food.sugar = productInfo.product.nutriscore_data.sugars
                    } else {
                        food.sugar = "sugar not listed"
                    }

                    foodComponent = createFoodComponent(food)
                    foodContainer.innerHTML += foodComponent
                })
        })
    })
