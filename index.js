'use strict';


function watchForm() {
  $('#js-form').submit(event => {
    event.preventDefault();
    const state = $('#state').val();
    console.log(state);
    if (!state ) {
      getResults('');
    } else {
      getResults(state);
    }
  });
}

/* 

if locationtype is not all & location area is not all 
  call specific endpoint for both 

if locationtype is all & location area is  all 
  call general endpoint for both   

if location type is all & location area is not all
  call general endpoint type and specific endpoint for area 

if location type is not all & location area is all 
  call specific endpoint for type and general endpoint for area


*/


function getResults(state) {
  console.log(state);
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
  console.log(responseJson);
  $('#results-list').empty();
  let searchResults = responseJson['data']; 
  for (let i = 0; i < searchResults.length; i++) {
   $('#results-list').append(
     `<li><h3>${searchResults[i].name}</h3>
      <p><a href="${searchResults[i].directionsUrl}">${searchResults[i].description}</a></p>
      <p>If available, a Campground Home URL will appear here:${searchResults[i].url}</p>
      </li>`
      )
  };
  $('#results').removeClass('hidden');
};

$(document).ready(function() {
  watchForm();
 });
