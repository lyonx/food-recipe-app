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
  client.ingredients.push(ingredient);
  console.log(ingredient);

  let newDiv = $("<button>");

  newDiv.addClass("ingredients");
  newDiv.attr("id", client.count);
  newDiv.attr("value", ingredient);

  client.count++;

  newDiv.append(ingredient);

  $("#ing-row").append(newDiv);
};

function getResults() {
  event.preventDefault();
  console.log(client.ingredients);

  for (let i = 0; i < client.count; i++) {
    console.log($("#" + i).val());
  }
};