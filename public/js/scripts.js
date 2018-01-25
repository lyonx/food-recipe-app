var count = 0;

// on page load
$(function () {

  populate();

  populateRec();

  $('#login').on('click', login);
  // if the add ingredient button is hit, adds it to the html
  $('#add-ing').on("click", addIngredient);

  $('#get-results').on("click", getResults);

  $("#sign-up").on("click", signup);

  $("#sign-out").on("click", signout);

  $("#unfav").on("click", unfav);

});

var token = localStorage.getItem('token');

function addIngredient(event) {
  event.preventDefault();
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
    console.log("test0");
  });
  location.reload();
}

function getResults(event) {
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
    window.location.href = "/ingredients";
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

    setTimeout(function () {
      login()
    }, 1000);
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
      newDiv.addClass("ingredients btn btn-primary");
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
      wrapper.addClass("recipes");

      let panel = $("<div>");
      panel.addClass("card");
      panel.attr("id", "recipe-" + i);

      var title = $("<h5>");
      title.addClass("card-title");
      title.text(data[i].name);



      var body = $("<div>");
      body.addClass("card-body");

      // var thumbnail = $("<a>");
      // thumbnail.addClass("thumbnail");
      var thumb = $("<img>");
      thumb.addClass("card-img-top");
      thumb.attr("src", data[i].imgurl);

      console.log(data[i].favorited);

      var link = $("<a>");
      link.text("Link");
      link.addClass("btn btn-primary");
      link.attr("href", data[i].url);



      panel.append(thumb);
      body.append(title);
      body.append(link);
      // thumbnail.append(thumb);
      if (!data[i].favorited) {
        var fav = $("<button>");
        fav.attr("id", "fav");
        fav.addClass("btn btn-secondary");
        fav.text("Add Favorite");
        // fav.attr("data-id", data[i].id);
        fav.val(data[i].id);
        body.append(fav);
      } else {
        var unfav = $("<button>");
        unfav.attr("id", "unfav");
        unfav.addClass("btn btn-success");
        unfav.text("Favorited");
        // unfav.attr("data-id", data[i].id);
        unfav.val(data[i].id);
        body.append(unfav);
      }
      var del = $("<button>");
      del.addClass("btn btn-danger");
      del.attr("id", "rec-del");
      del.text("X");
      del.val(data[i].id);
      body.append(del);
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

function fav() {
  console.log("test");
}

function unfav() {
  console.log(this.val());
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

$(document).on("click", "#fav", function () {

  let id = $(this).val();

  $.ajax({
    headers: {
      "Authorization": "Bearer " + token
    },
    method: "POST",
    url: "/api/recipes/favorite/" + id
  }).done(function (data) {
    location.reload();
  });
});

$(document).on("click", "#unfav", function () {

  let id = $(this).val();

  $.ajax({
    headers: {
      "Authorization": "Bearer " + token
    },
    method: "POST",
    url: "/api/recipes/unfavorite/" + id
  }).done(function (data) {
    location.reload();
  });
});

$(document).on("click", "#rec-del", function () {

  let id = $(this).val();

  $.ajax({
    headers: {
      "Authorization": "Bearer " + token
    },
    method: "DELETE",
    url: "/api/recipes/remove/" + id
  }).done(function (data) {
    location.reload();
  });
});