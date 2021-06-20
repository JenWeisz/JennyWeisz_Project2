
const app = {};

app.randomButton = $('#random');

app.randomCocktailResult = [];

//GET RANDOM COCKTAILS AJAX CALL
app.randomCocktails = ()=> {
    $.ajax({
        url: `https://www.thecocktaildb.com/api/json/v1/1/random.php`,
        method: "GET",
        dataType: "json",
        crossDomain: true
    }).then(result => {
    app.randomCocktailResult.push(result.drinks[0])
        $('.resultsRandomContainer').empty();
        $('.resultsContainer').empty();
        app.displayRandomCocktail(result.drinks);
    });
};

//RANDOM COCKTAIL INIT FUNCTION ON CLICK BUTTON EVENT LISTENER
app.randomCocktailInit = () => {
    app.randomButton.on('click', () => {
        app.randomCocktails();
    })
}

//DISPLAY RANDOM COCKTAIL (LOOP THROUGH DRINK AND APPEND TO HTML)
app.displayRandomCocktail = (drinks) => {

    drinks.forEach(drink => {
      
        //filter through array for ingredients
        const ingredients = Object.keys(drink).filter(key => {
            return key.indexOf('strIngredient') === 0
        });

        //filter through to only keep ingredients with value
        const ingredientsWithValue = ingredients.filter((ingredient) => {
            if (drink[ingredient] === null) {
                return false;
            } else {
                return true;
            }
        })

        //filter through array for measurements
        const measurements = Object.keys(drink).filter(key => {
            return key.indexOf('strMeasure') === 0
        });

        //filter through to only keep measurements with value
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

        //push to make measurements and ingredients equal length
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
        $(".resultsRandomContainer").append(htmlToAppend);

    });
};


//FOR EACH LOOP OF DRINKS ARRAY TO DISPLAY COCKTAILS ON PAGE
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

//GET COCKTAILS BY INGREDIENT AJAX CALL
app.getCocktails = ingredient => {
    $.ajax({
        url: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${ingredient}`,
        method: "GET",
        dataType: "json",
        crossDomain: true
    }).then(result => {
        $('.resultsContainer').empty();
        $('.resultsRandomContainer').empty();
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

//INIT FUNCTION
app.init = function() {
    app.getUserInput();
    app.randomCocktailInit();
};

//DOCUMENT READY START
$(function() {
    app.init();

//DOCUMENT READY END
});
