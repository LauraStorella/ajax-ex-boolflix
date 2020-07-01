$(document).ready(function () {

// ******************** BOOLFLIX ********************


// -------------------- Milestone #1 --------------------
// API_key : 93ff06dbd828057f991c11587fba6244
// ES. Richiesta API : https://api.themoviedb.org/3/movie/550?api_key=93ff06dbd828057f991c11587fba6244

// var per chiamata ajax
var myApiKey = '93ff06dbd828057f991c11587fba6244';

// Chiamata ajax per comunicare con API
$.ajax(
  {
    url: 'https://api.themoviedb.org/3/search/movie',
    method: 'GET',
    data: {
      api_key: myApiKey,
      query: 'ritorno al futuro',
      language: 'it-IT',
    },
    success: function (data) {
      console.log(data);
      
    },
    error: function () {
      alert('Ops! Si è verificato un errore.');
    }
  }
 ); // ajax call



































}); // document ready
