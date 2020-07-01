$(document).ready(function () {

// ******************** BOOLFLIX ********************


// -------------------- Milestone #1 --------------------
// API_key : 93ff06dbd828057f991c11587fba6244
// ES. Richiesta API : https://api.themoviedb.org/3/movie/550?api_key=93ff06dbd828057f991c11587fba6244

// var per chiamata ajax
var urlMovie = 'https://api.themoviedb.org/3/search/movie';
var myApiKey = '93ff06dbd828057f991c11587fba6244';



// Lancio chiamata ajax per effettuare la ricerca titoli
//  ---> utente immette stringa nella searchbar (.search-inputbox)
//  ---> intercetto click su tasto invio (.search-btn)
//  ---> avvio funzione per stampa titoli; parte chiamata ajax che restituisce i risultati corrispondenti alla ricerca
//  ---> inserisco risultati in html (con handlebars)
//  ---> resetto campo input  


// Intercetto click su tasto invio (.search-btn)
$('.search-btn').click( printMovies );







// -------------------- FUNCTIONs --------------------

// Fun printMovies : si avvia al click del tasto "Invia" e restituisce i film cercati dall'utente
function printMovies(arrayMovies) {

  // leggo il testo inserito dall'utente nella searchbar
  var userText = $('#search-text').val().toLowerCase();
  console.log(userText);
  
  // faccio partire la chiamata ajax per cercare i film
  $.ajax({
    'url': urlMovie,
    'method': 'GET',
    'data': {
        'api_key': myApiKey,
        'query': userText,
        'language': 'it-IT'
    },
    'success': function(data) {
      var arrayMovies = data.results;
      console.log(arrayMovies);

      // creo ciclo For per stampare tutti i film in array
      for (var i = 0; i < arrayMovies.length; i++) {
        var singleMovie = arrayMovies[i];

        // recupero info film e inserisco in html (stampo con handlebars)
        var context = {
          'titolo': singleMovie.title,
          'titolo-originale': singleMovie.original_title,
          'lingua-originale': singleMovie.original_language,
          'voto': singleMovie.vote_average,
        };

        // appendo elemento in html 
        var source = $('#movie-template').html();
        var template = Handlebars.compile(source);
        var html = template(context);
        $('#movie-list').append(html);
      } // For loop
      
    },
    'error': function() {
        console.log('Ops! Si è verificato un errore.');
    }
  }); 
} // fun printMovies

















}); // document ready
