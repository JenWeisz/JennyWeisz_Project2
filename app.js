
const app = {};


//FOR EACH LOOP OF DRINKS ARRAY TO DISPLAY ON PAGE
app.displayCocktails = (drinks) => {
  
    drinks.forEach(drink => {

        const ingredients = Object.keys(drink).filter(key => {
            return key.indexOf('strIngredient') === 0
        });

        const ingredientsWithValue = ingredients.filter((ingredient) => {
            if (drink[ingredient] === null) {
                return false;
            } else {
                return true;
            }
        })

        const measurements = Object.keys(drink).filter(key => {
            return key.indexOf('strMeasure') === 0
        });

        const measurementsWithValue = measurements.filter((measurement) => {
            if (drink[measurement] === null) {
                return false;
            } else {
                return true;
            }
        });

        const drinkTitle = drink.strDrink;
        const drinkInstructions = drink.strInstructions;
        const drinkImg = drink.strDrinkThumb;
       
        let ingredientListHTML = "";

        let measurementListHTML= "";

        for (let i = 0; i < ingredientsWithValue.length; i++) {
            if (measurementsWithValue[i] === null || measurementsWithValue[i] === undefined) {
                measurementsWithValue.push(`strMeasure${i + 1}`);

            } 
        }
        
        ingredientsWithValue.forEach((ingredient)=> { 
            ingredientListHTML += '<li>' + drink[ingredient] + '</li>';
        })

        measurementsWithValue.forEach((measurement)=> { 
             let tempMeasurement = "";

            if (drink[measurement] !== null) {
                tempMeasurement = drink[measurement];

            } else {
                tempMeasurement = "Any amount ";
            }
            measurementListHTML += '<li>' + tempMeasurement + ': ' + '</li>';
        })

    
        const htmlToAppend = `
        <div class="drinkContainer">
            <div class="imageBox">
                <img class="drinkImage" src="${drinkImg}" alt="${drinkTitle}">
            </div>

            <div class="drinkInfoBox">
                <h4 class="drinkTitle">${drinkTitle}</h4>
                <div class="flexLists">
                    <ul class="ingredientsList">
                    ${measurementListHTML}
                    </ul>
                    <ul class="ingredientsList noBullets">
                    ${ingredientListHTML}
                    </ul>
                </div>
                <p class="instructions">${drinkInstructions}</p>
            </div>
        </div>
        `
        $(".resultsContainer").append(htmlToAppend);

    });

};

//random item function
app.getRandomItem = (array) => {
const randomIndex = Math.floor(Math.random() * array.length);
const randomItem = array[randomIndex];
    return randomItem;
}


//GET COCKTAILS AJAX CALL
app.getCocktails = ingredient => {
    $.ajax({
        url: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${ingredient}`,
        method: "GET",
        dataType: "json",
        crossDomain: true
    }).then(result => {
        $('.resultsContainer').empty();
        app.displayCocktails(result.drinks);
        
    });
};

//FORM SUBMIT EVENT LISTENER
app.getUserInput = () => {
    $('form').on('submit', function(event) {
        event.preventDefault();
        const userInput = $('input').val();
        app.getCocktails(userInput);
    });
}

//button click event
$('#image').on('click', function() {
    $('#image').addClass('animate__animated animate__shakeY');
  })

//??
// animationTimeout = setTimeout(() => {$('#image').removeClass('animate__animated animate__shakeY')}, 1000)

//INIT FUNCTION
app.init = function() {
    app.getUserInput();
};


//DOCUMENT READY START
$(function() {
    app.init();

//DOCUMENT READY END
});
