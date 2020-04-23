const createFoodComponent = (food) => {
    return `
        <section class="foodList__item">
            <h3>${food.name}</h3>
            <ul class="foodList__list">
                <li class="foodList__item--nopadding">${food.category}</li>
                <li class="foodList__item--nopadding">${food.ethnicity}</li>
            </ul>
        </section>
    `
}

const foodContainer = document.querySelector(".foodList")

fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            foodComponent = createFoodComponent(food)
            foodContainer.innerHTML += foodComponent
        })
    })

