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
  //  ---> resetto campo input per nuova ricerca
  
  
  // Intercetto click su tasto invio (.search-btn)
  $('.search-btn').click( printMovies );
  
  
  
  
  
  
  
  // -------------------- FUNCTIONs --------------------
  
  function printMovies(arrayMovies) {
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
      $('.movie-item').empty();

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

          // // elimino risultati da pagina html
          // $('li').empty();
          
        },
        'error': function() {
            console.log('Ops! Si è verificato un errore.');
        }
      }); // ajax call     
    } else {
      alert('Spiacenti, non è possibile effettuare la ricerca. Devi digitare almeno 2 caratteri');
    }    
  } // fun printMovies
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  }); // document ready