var count = 0;

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
  console.log(ingredient);

  let newDiv = $("<button>");

  newDiv.attr("id", "ingredient-" + count);
  newDiv.addClass("ingredients");
  newDiv.attr("id", count);
  newDiv.attr("value", ingredient);

  count++;

  newDiv.append(ingredient);

  $("#ing-row").append(newDiv);
};

function getResults() {
  event.preventDefault();

  var data = {

    user_id: 1,
    ingredients: []
  };

  for (let i = 0; i < count; i++) {
    if ($("#" + i).val()) {
      data.ingredients.push($("#" + i).val());
    }
  };

  console.log(data);
};

// Remove ingredients inputted by user on click
$(document).on('click', '.ingredients', function() {
  console.log('click');
  $(this).remove();

  //$(this).html('newText');
});
