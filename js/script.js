$(document).ready(function () {

  // ******************** BOOLFLIX ********************
  
  
  // -------------------- Milestone #1 --------------------
  // API_key : 93ff06dbd828057f991c11587fba6244
  // ES. Richiesta API : https://api.themoviedb.org/3/movie/550?api_key=93ff06dbd828057f991c11587fba6244
  
  // var per chiamata ajax
  var myApiKey = '93ff06dbd828057f991c11587fba6244';
  var urlMovie = 'https://api.themoviedb.org/3/search/movie';
  var urlSeries = 'https://api.themoviedb.org/3/search/tv';
  var fixedCoverPath = 'https://image.tmdb.org/t/p/';
  var sizeCoverPath = 'w1280';
  var imgNotAvailable = 'img/no-img-cover.jpg';
  
  
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
    // console.log(userText);
  
    // Verifico che l'utente abbia immesso un dato > 1 per avviare la ricerca
    //  ---> se dato > 1, resetto campo per nuova ricerca e faccio chiamata ajax
    //  ---> in caso contrario, compare alert 
    if (userText.length > 1) {
      // reset searchbar per immissione nuova ricerca (inserisco stringa vuota)
      $('#search-text').val('');
  
      // elimino schede film sulla pagina HTML
      $('.card').remove();
      // $('.cover-img').remove();
  
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
          var results = data.results;
          // console.log(results);
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
          //   var source = $('#cards-container-template').html();
          //   var template = Handlebars.compile(source);
          //   var html = template(context);
          //   $('#cards-container').append(html);
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
          var results = data.results;
          // console.log(results);
          printTvSeries(data.results);
  
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
        // 'lingua-originale': singleMovie.original_language,
        'lingua-originale': printFlag(singleMovie.original_language),
        'voto': giveStars( singleMovie.vote_average),
        // 'voto': singleMovie.vote_average, // debug (stampa voto in numero)
        'cover-link': createCover(singleMovie.poster_path),
        'trama': getPlot(singleMovie.overview),
      };
      // console.log(context);
      // console.log(singleMovie.vote_average);
      // console.log(giveStars( singleMovie.vote_average));
      console.log(singleMovie.overview);
      
      
      // // Salvo la lingua del film in una variabile
      // var langFlag = singleMovie.original_language;
      // // console.log(langFlag);
      
  
      
      
  
      // appendo elemento in html 
      var source = $('#cards-container-template').html();
      var template = Handlebars.compile(source);
      var html = template(context);
      $('#cards-container').append(html);
    } // For loop
  } // end fun printMovies
  
  
  
  function printTvSeries(arrayTvSeries) {
    // DESCRIZIONE : 
    // prende elementi della ricerca (array di objects = serieTV) e li stampa in html
  
    // creo ciclo For per stampare tutti i film in array
    for (var i = 0; i < arrayTvSeries.length; i++) {
      var singleTvSeries = arrayTvSeries[i];
  
      // recupero info serieTV e inserisco in html (stampo con handlebars)
      var context = {
        'titolo': singleTvSeries.name,
        'titolo-originale': singleTvSeries.original_name,
        // 'lingua-originale': singleTvSeries.original_language,
        'lingua-originale': printFlag(singleTvSeries.original_language),
        'voto': giveStars( singleTvSeries.vote_average),
        // 'voto': singleTvSeries.vote_average, // debug (stampa voto in numero)
        'cover-link': createCover(singleTvSeries.poster_path),
        'trama': getPlot(singleTvSeries.overview),
      };
      // console.log(context);
      // console.log(singleTvSeries.vote_average);
      // console.log(giveStars( singleTvSeries.vote_average));
      
      // // Salvo la lingua del film in una variabile
      // var langFlag = singleTvSeries.original_language;
      // // console.log(langFlag);
      
  
      
      
  
      // appendo elemento in html 
      var source = $('#cards-container-template').html();
      var template = Handlebars.compile(source);
      var html = template(context);
      $('#cards-container').append(html);
    } // For loop
  } // end fun seriesTV
  
  
  // -------------------- Milestone #2 --------------------
  
  function giveStars(voto) {
    // DESCRIZIONE : 
    // prende il voto del film espresso in numero decimale da 1 a 10,
    // lo converte in un numero intero da 1 a 5,
    // stampa a schermo un numero di stelle piene da 1 a 5, lasciando le restanti vuote (arrotonda per eccesso a unità successiva).
  
    // Converto il voto decimale in numero intero da 1 a 5
    //  ---> il num intero corrisponde al n° di stelle piene da stampare (è il counter che mi servirà nel ciclo For)
    var starsCounter = Math.ceil( voto / 2 );
    // Creo var per icone stelle corrispondenti al voto del film
    var stars = '';
    var fullStar = '<i class="fas fa-star"></i>';
    var emptyStar = '<i class="far fa-star"></i>';
  
    for (var i = 0; i < 5; i++) {
      if (starsCounter > 0) {
        stars += fullStar; // aggiungo stella piena 
        starsCounter--;
      }
      else {
        stars += emptyStar; // aggiungo stella vuota
      }      
    } // end for loop
    return stars;
  } // end fun rateStars
  
  
  
  function printFlag(langFlag) {
    // DESCRIZIONE : 
    // stampa a schermo <img> bandiera in base alla lingua originale del film
  
    // Creo var per inserire valore di ritorno della fun
    //  ---> se bandiera disponibile, aggiungo <img> (visualizzo img tramite attr src)
    //  ---> se bandiera non disponibile, lascio formato testo
    //  ---> considero lingue principali: it, en, fr, es, de 
  
    switch (langFlag) {
      case "it":
        return '<img class="flag-img" src="img/it-flag.png" alt="it-flag">'
      case "en":
        return '<img class="flag-img" src="img/en-flag.png" alt="en-flag">';
      case "fr":
        return '<img class="flag-img" src="img/fr-flag.png" alt="fr-flag">';
      case "de":
        return '<img class="flag-img" src="img/de-flag.png" alt="de-flag">';
      case "es":
        return '<img class="flag-img" src="img/es-flag.png" alt="es.flag">';
      default:
        return langFlag;
    } // end switch
  } // end fun printFlag
  
  
  
  // function getCategory(params) {
  //   // DESCRIZIONE : 
  //   // stabilisce se risultato della ricerca appartiene alla categoria film o serieTV, così da poter visualizzare il risultato corretto
    
  //   // verifico se la ricerca è film o serieTV
  //   if (tipologia == 'film') {
  //     // se film : leggo title e original_title
  //     var resultTitle = singleMovie.title;
  //     var resultOriginalTitle = singleMovie.original_title;
  //   } 
  //   else {
  //     // se serieTV : leggo name e original_name
  //     var resultTitle = dati.name;
  //     var resultOriginalTitle = dati.original_name;
  //   }
  // }
  
  
  // -------------------- Milestone #3 --------------------
  
  function createCover(coverLink) {
    // DESCRIZIONE:
    // crea il path completo per inserire cover film/serie tv
  
    // url dell' <img> richiesta tramite API
    //  ---> se cover non disponibile, uso <img> di default
    //  ---> se <img> disponibile, compongo il path con urlfissa + pathsize + pathvariable
  
    var imgUrlVariable = coverLink; 
    var fullCoverPath = "";
  
    if (imgUrlVariable === null) {    
      fullCoverPath = imgNotAvailable;
    } 
    else {
      fullCoverPath = fixedCoverPath + sizeCoverPath + imgUrlVariable;
    }
    return fullCoverPath;
  } // end fun createCover
  
  
  
  function getPlot(text) {
    // DESCRIZIONE:
    // legge e visualizza valore "overview" (trama film/serieTV)
    // se overview non è presente, ritorna "non disponibile"
  
    var plotText; // overview da inserire in pagina
  
    if (text == "" || text == null) {
      plotText = 'non disponibile';
    } else {
      plotText = text;
    }
    return plotText;
  }
  
  
  
  }); // document ready