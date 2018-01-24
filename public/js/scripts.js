var count = 0;

// on page load
$(function () {

  $('#login').on('click', login);
  // if the add ingredient button is hit, adds it to the html
  $('#add-ing').on("click", addIngredient);

  $('#get-results').on("click", getResults);

  $("#sign-up").on("click", signup);

  $("#sign-out").on("click", signout)

  populate();

  populateRec();

});

var token = localStorage.getItem('token');

function addIngredient(event) {
  let ingredient = $("#ing").val().trim();
  var data = {
    UserId: localStorage.getItem('id'),
    ingredients: []
  };
  data.ingredients.push(ingredient);

  $.ajax({
    headers: {
      "Authorization": "Bearer " + token
    },
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
    headers: {
      "Authorization": "Bearer " + token
    },
    method: "POST",
    url: "/api/recipes",
    data: data
  }).done(function (res) {
    console.log(res);

    // var newDiv = $("<a>");
    // newDiv.addClass("recipe");
    // newDiv.text(res.name);
    // newDiv.attr("href", res.url);
    // $("#rec-row").append(newDiv);
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
    localStorage.setItem('token', data.token);
    console.log("id: " + localStorage.getItem('id'));
    window.location.href = "/index";
  });
}

function signup(event) {
  event.preventDefault();

  var data = {
    email: $('#email').val(),
    username: $('#username').val(),
    password: $('#password').val()
  };

  console.log(data);

  $.ajax({
    method: "POST",
    url: "/user/new",
    data: data
  }).then(function (data) {

    login();
  });
}

function populate() {
  var data = {
    UserId: localStorage.getItem('id')
  };

  $.ajax({
    headers: {
      "Authorization": "Bearer " + token
    },
    method: "POST",
    url: "/api/ingredients/all",
    data: data
  }).then(function (data) {
    console.log("test", data);
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

function populateRec() {
  var data = {
    UserId: localStorage.getItem('id')
  };

  $.ajax({
    headers: {
      "Authorization": "Bearer " + token
    },
    method: "POST",
    url: "/api/recipes/all",
    data: data
  }).then(function (data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      let name = data[i].name;
      let newDiv = $("<button>");
      newDiv.attr("id", "recipe-" + i);
      newDiv.text(data[i].name);
      newDiv.addClass("recipes");
      // newDiv.attr("href", )
      $("#rec-row").append(newDiv);
    }
  })
}

function signout() {
  localStorage.clear();
  token = null;
  window.location.href = "/";
}

// Remove ingredients inputted by user on click

$(document).on('click', '.ingredients', function () {
  $(this).remove();
  var data = {
    UserId: localStorage.getItem('id'),
    name: $(this).val()
  };
  $.ajax({
    method: "DELETE",
    url: "/api/ingredients/delete",
    data: data
  }).then(function (data) {
    location.reload();
  });
});