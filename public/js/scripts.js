var client = {
  count: 0,
  ingredients: []
};

// on page load
$(function () {

  // if the add ingredient button is hit, adds it to the html
  $('#add-ing').on("click", addIngredient);

  $('#get-results').on("click", getResults);

});

// adds ingredient to html
function addIngredient(event) {
  event.preventDefault();

  let ingredient = $("#ing").val().trim();
  client.push(ingredient);
  console.log(ingredient);

  let newDiv = $("<div>");

  newDiv.attr("id", "ingredient-" + count);
  newDiv.addClass("ingredients");

  count++;

  newDiv.append(ingredient);

  $("#ing-row").append(newDiv);
};

function getResults() {
  event.preventDefault();

  for (let i = 0; i < count; i++) {

    let target = "#ingredient-" + count;

    let ing = $(target).val();
    console.log(client.ingredients);
  };
};