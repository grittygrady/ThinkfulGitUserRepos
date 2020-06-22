'use strict'

const searchURL = `https://api.github.com/users/${username}/repos`

$(gitUserRepos);

function gitUserRepos() {
  console.log('App ready, awaiting input');
  formListener();
}

function userInput() {
  let username = $("#username").val();
  return username;
}

function formListener() {
  $("form").on("submit", function(event){
    event.preventDefault();
    fetchUserName(userInput);
    $(".js-repos").empty();
    $(".headline").empty();
  });
}

function fetchUserName() {
  fetch(`https://api.github.com/users/${userInput()}/repos`)
  .then(response => response.json())
  .then(responseJson => {
    if (responseJson.message !== "Not Found") {
      displayResults(responseJson);
    } else {
      alert("No user found by that handle. Please try again.")
    }
  })
  .catch(error => alert("An error occurred. Please try again."));
}

function displayResults(responseJson) {
  $("#js-handle-headline").text(`${userInput()}'s Repositories`);
  for (let i = 0; i < responseJson.length; i++) {
    $(".js-repos").append(`<a href="https://github.com/${userInput()}/${responseJson[i].name}" target="_blank"><li>${responseJson[i]["name"]}</li></a>`);
    $(".results").removeClass("hidden");
  }
}
