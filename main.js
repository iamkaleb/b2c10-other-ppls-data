const createFoodComponent = (food) => {
    return `
        <section class="foodList__item">
            <h3>${food.name}</h3>
            <ul class="foodList__list">
                <li class="foodList__item--nopadding">${food.category}</li>
                <li class="foodList__item--nopadding">${food.ethnicity}</li>
                <li class="foodList__item--nopadding">${food.ingredients}</li>
            </ul>
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
                    foodComponent = createFoodComponent(food)
                    foodContainer.innerHTML += foodComponent
                })
        })
    })
