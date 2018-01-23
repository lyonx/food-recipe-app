var count = 0;

// on page load
$(function () {

  $('#login').on('click', login);
  // if the add ingredient button is hit, adds it to the html
  $('#add-ing').on("click", addIngredient);

  $('#get-results').on("click", getResults);

  populate();

});

// // adds ingredient to html
// function addIngredient(event) {
//   event.preventDefault();

//   let ingredient = $("#ing").val().trim();
//   console.log(ingredient);

//   let newDiv = $("<button>");

//   newDiv.attr("id", "ingredient-" + count);
//   newDiv.addClass("ingredients");
//   newDiv.attr("id", count);
//   newDiv.attr("value", ingredient);

//   count++;

//   newDiv.append(ingredient);

//   $("#ing-row").append(newDiv);
// };

function addIngredient(event) {
  let ingredient = $("#ing").val().trim();
  var data = {
    UserId: localStorage.getItem('id'),
    ingredients: []
  };
  data.ingredients.push(ingredient);

  $.ajax({
    method: "POST",
    url: "/api/ingredients",
    data: data
  }).done(function (res) {
    console.log(res);
  });
}

function getResults() {
  event.preventDefault();

  var data = {

    UserId: localStorage.getItem('id'),
    ingredients: []
  };

  for (let i = 0; i < count; i++) {
    if ($("#" + i).val()) {
      data.ingredients.push($("#" + i).val());
    }
  };

  console.log(data);

  $.ajax({
    method: "POST",
    url: "/api/ingredients",
    data: data
  }).done(function (res) {
    console.log(res);
  });
};

function login() {
  event.preventDefault();
  var data = {
    username: $('#username').val(),
    password: $('#password').val()
  };

  $.ajax({
    method: "POST",
    url: "/user/login",
    data: data
  }).then(function (data) {
    console.log(data);
    localStorage.setItem('id', data.user_id);
    console.log("id: " + localStorage.getItem('id'));
    window.location.href = "/";
  });
}

function populate() {
  var data = {
    UserId: localStorage.getItem('id')
  };

  $.ajax({
    method: "POST",
    url: "/api/ingredients/all",
    data: data
  }).then(function (data) {
    for (let i = 0; i < data.length; i++) {

      let ingredient = data[i].name;
      console.log(ingredient);

      let newDiv = $("<button>");

      newDiv.attr("id", "ingredient-" + count);
      newDiv.addClass("ingredients");
      newDiv.attr("id", count);
      newDiv.attr("value", ingredient);

      count++;

      newDiv.append(ingredient);

      $("#ing-row").append(newDiv);
    }
  })
}

// Remove ingredients inputted by user on click
$(document).on('click', '.ingredients', function () {
  var data = {
    UserId: localStorage.getItem('id'),
    name: $(this).val()
  };
  $.ajax({
    method: "DELETE",
    url: "/api/ingredients/delete",
    data: data
  }).then(function(data){
    location.reload();
  });
});