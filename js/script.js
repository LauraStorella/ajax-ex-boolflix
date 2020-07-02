$(document).ready(function () {

// ******************** BOOLFLIX ********************


// -------------------- Milestone #1 --------------------
// API_key : 93ff06dbd828057f991c11587fba6244
// ES. Richiesta API : https://api.themoviedb.org/3/movie/550?api_key=93ff06dbd828057f991c11587fba6244

// var per chiamata ajax
var myApiKey = '93ff06dbd828057f991c11587fba6244';
var urlMovie = 'https://api.themoviedb.org/3/search/movie';
var urlSeries = 'https://api.themoviedb.org/3/search/tv';




// Lancio chiamata ajax per effettuare la ricerca titoli
//  ---> utente immette stringa nella searchbar (.search-inputbox)
//  ---> intercetto click su tasto invio (.search-btn)
//  ---> avvio funzione per stampa titoli; parte chiamata ajax che restituisce i risultati corrispondenti alla ricerca
//  ---> inserisco risultati in html (con handlebars)
//  ---> resetto campo input per nuova ricerca


// Intercetto click su tasto invio (.search-btn)
//  ---> Al click di .search-btn, faccio ricerca e stampa dei risultati
//  ---> fun getMovies contiene anche fun printMovies
$('.search-btn').click( getMovies );







// -------------------- FUNCTIONs --------------------

function getMovies(userText) {
  // DESCRIZIONE : 
  // si avvia al click del tasto "Cerca" e restituisce i film cercati dall'utente

  // leggo il testo inserito dall'utente nella searchbar
  var userText = $('#search-text').val().trim().toLowerCase();
  console.log(userText);

  // Verifico che l'utente abbia immesso un dato > 1 per avviare la ricerca
  //  ---> se dato > 1, resetto campo per nuova ricerca e faccio chiamata ajax
  //  ---> in caso contrario, compare alert 
  if (userText.length > 1) {
    // reset searchbar per immissione nuova ricerca (inserisco stringa vuota)
    $('#search-text').val('');

    // elimino schede film sulla pagina HTML
    $('.movie-item').remove();

    // Ricerca Film : faccio partire la chiamata ajax per cercare i film
    $.ajax({
      'url': urlMovie,
      'method': 'GET',
      'data': {
          'api_key': myApiKey,
          'query': userText,
          'language': 'it-IT'
      },
      'success': function(data) {
        var results = data. results;
        console.log(results);
        printMovies(data.results);


        // --------- 1° prova con 'stampa film' in fun 'getMovies' ---------
        // --------- Refactoring con fun apposita 'printMovies' per separare ruoli --------- 
        // // creo ciclo For per stampare tutti i film in array
        // for (var i = 0; i < arrayMovies.length; i++) {
        //   var singleMovie = arrayMovies[i];
  
        //   // recupero info film e inserisco in html (stampo con handlebars)
        //   var context = {
        //     'titolo': singleMovie.title,
        //     'titolo-originale': singleMovie.original_title,
        //     'lingua-originale': singleMovie.original_language,
        //     'voto': singleMovie.vote_average,
        //   };
  
        //   // appendo elemento in html 
        //   var source = $('#movie-template').html();
        //   var template = Handlebars.compile(source);
        //   var html = template(context);
        //   $('#movie-list').append(html);
        // } // For loop
        
      },
      'error': function() {
          console.log('Ops! Si è verificato un errore.');
      }
    }); // end ajax call per ricerca film
    
    
    // Ricerca SerieTV : faccio partire la chiamata ajax per cercare serie tv
    $.ajax({
      'url': urlSeries,
      'method': 'GET',
      'data': {
          'api_key': myApiKey,
          'query': userText,
          'language': 'it-IT'
      },
      'success': function(data) {
        var results = data. results;
        console.log(results);
        printMovies(data.results);

      },
      'error': function() {
          console.log('Ops! Si è verificato un errore.');
      }
    }); // end ajax call per ricerca SerieTV

  } else {
    alert('Spiacenti, non è possibile effettuare la ricerca. Devi digitare almeno 2 caratteri');
  }    
} // end fun getMovies





function printMovies(arrayMovies) {
  // DESCRIZIONE : 
  // prende elementi della ricerca (array di objects = film) e li stampa in html

  // creo ciclo For per stampare tutti i film in array
  for (var i = 0; i < arrayMovies.length; i++) {
    var singleMovie = arrayMovies[i];

    // recupero info film e inserisco in html (stampo con handlebars)
    var context = {
      'titolo': singleMovie.title,
      'titolo-originale': singleMovie.original_title,
      'lingua-originale': singleMovie.original_language,
      'voto': giveStars( singleMovie.vote_average / 2 ),
    };
    console.log(context);
    console.log(giveStars( singleMovie.vote_average / 2 ));
    
    

    // appendo elemento in html 
    var source = $('#movie-template').html();
    var template = Handlebars.compile(source);
    var html = template(context);
    $('#movie-list').append(html);
  } // For loop
} // end fun printMovies


// -------------------- Milestone #2 --------------------

function giveStars(voto) {
  // DESCRIZIONE : 
  // prende il voto del film espresso in numero decimale da 1 a 10,
  // lo converte in un numero intero da 1 a 5,
  // stampa a schermo un numero di stelle piene da 1 a 5, lasciando le restanti vuote (arrotonda per eccesso a unità successiva).

  // Creo var per icone stelle corrispondenti al voto del film
  var stars = '';
  var fullStar = '<i class="fas fa-star"></i>';
  var emptyStar = '<i class="far fa-star"></i>';

  // Converto il voto decimale in numero intero da 1 a 5
  //  ---> il num intero corrisponde al n° di stelle piene da stampare (è il counter che mi servirà nel ciclo For)
  var starsCounter = Math.floor( voto / 2 );

  for (var i = 0; i < 5; i++) {
    if (starsCounter > 0) {
      stars += fullStar; // aggiungo stella piena 
    }
    else {
      stars += emptyStar; // aggiungo stella vuota
    }      
  } // end for loop

  return stars
} // end fun rateStars
































































}); // document ready