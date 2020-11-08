'use strict';


function watchForm() {
  $('#js-form').submit(event => {
    event.preventDefault();
    const state = $('#state').val();
    if (state.length != 2) {
      alert('Use abbreviation of a valid US state; Ex.: CA, Ca, or ca');
    } else {
      getResults(state);
    }
  });
}


function getResults(state) {
  fetch(`https://developer.nps.gov/api/v1/campgrounds?api_key=LjDGflPb5rpTne1YebbvKcvQv3UOczyGWZfXyJ0l&stateCode=${state}`)
    .then(response => {
      if (response.ok) {
        response.json().then(function(responseJson) {
          displayResults(responseJson);
        });
      } 
    })
    .catch(err => {
      $('#js-error-message').text(`An error has occurred: ${err.message}`);
    });
}


function displayResults(responseJson) {
  $('#results-list').empty();
  let searchResults = responseJson['data']; 
  if (searchResults.length == 0) {
    alert('Use abbreviation of a valid US state; Ex.: CA, Ca, or ca');
  } else {
    for (let i = 0; i < searchResults.length; i++) {
      $('#results-list').append(
        `<li><h3>${searchResults[i].name}</h3>
            <p>${searchResults[i].description}</p>
            <p><a href="${searchResults[i].directionsUrl}" target="_blank">Link: Park Directions</p>
            <p><a href="${searchResults[i].regulationsurl}" target="_blank">Link: Park Regulations</p>
        </li>`
      )     
    };
  }
  $('#results').removeClass('hidden');
};

$(document).ready(function() {
  watchForm();
 });
