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
  console.log("test");
  $.ajax({
    headers: {
      "Authorization": "Bearer " + token
    },
    method: "POST",
    url: "/api/recipes",
    data: data
  }).done(function (res) {
    console.log(res);
    console.log("test");
    location.reload();
  });
};

function login() {
 
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

    setTimeout(function(){login()}, 1000);
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

      let wrapper = $("<div>");
      wrapper.addClass("col-md-4");

      let panel = $("<div>");
      panel.addClass("recipes");
      panel.addClass("panel panel-default");
      panel.attr("id", "recipe-" + i);

      var title = $("<div>");
      title.addClass("panel-heading");
      title.text(data[i].name);

      panel.append(title);

      var body = $("<div>");
      body.addClass("panel-body");

      var thumbnail = $("<a>");
      thumbnail.addClass("thumbnail");
      var thumb = $("<img>");
      thumb.attr("src", data[i].imgurl);

      thumbnail.append(thumb);

      var link = $("<a>");
      link.text("Link");
      link.addClass("btn btn-primary");
      link.attr("href", data[i].url);

      body.append(thumbnail);
      body.append(link);
      panel.append(body);
      wrapper.append(panel);
      // newDiv.attr("href", )
      $("#rec-row").append(wrapper);
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