let watchlistSection = document.getElementById("watchlist-section")
let movieIds

    watchlistSection.innerHTML = `
        <div class="temp-section-watchlist"> 
            <h1 class="temp-section-title"> Your watchlist is looking a little empty... </h1>
            <div class="temp-section-watchlist-btn-container">
                <form action="index.html">
                    <input type="submit" value="" class="go-to-search-btn"/>
                </form>
                <h3> Let's add some movies! </h3>
            </div>
        </div>
        `
showLocalStorage()

function showLocalStorage() {
    let dataFromLocalStorage = JSON.parse(window.localStorage.getItem('watchlist'))
    if (dataFromLocalStorage) {

        watchlistSection.innerHTML = ``
        for (i = 0; i < dataFromLocalStorage.length; i++) {
      
            fetch(`https://www.omdbapi.com/?apikey=2e645030&i=${dataFromLocalStorage[i]}`)
                .then(response => response.json())
                .then(data => {
                    watchlistSection.innerHTML += `
                    
                    <div class="container">
                        <div class="movie-poster-container">
                            <img class="movie-img" src="${data.Poster}" alt="Sorry. Image not available at this time">
                        </div>
                        
                        <div>
                            <div class="movie-info-container">
                                
                                <div class="title-rating">
                                <h1> ${data.Title} </h1>
                                <p> ⭐ ${data.Ratings[0].Value} </p>
                                </div>
                                
                                <div class="runtime-type-btn">
                                    <h3> ${data.Runtime} </h3>
                                    <h3 class="genre"> ${data.Genre} </h3>
                                    <button id="remove-btn" class="remove-btn" 
                                    onclick=removeData("${data.imdbID}")>  </button>
                                    <h3 > Remove </h3>
                                </div>
                            
                                <div class="movie-desc">
                                    <p> ${data.Plot} </p>
                                </div>  
                            </div>
                        </div>
                    `
            })    
        }
    }
}

function removeData(ID) {
            movieIds = JSON.parse(localStorage.getItem("watchlist"));
            let index = movieIds.indexOf(ID, 0)
            movieIds.splice(index, 1)
            localStorage.setItem("watchlist", JSON.stringify(movieIds))
            showLocalStorage()
            if (movieIds.length === 0) {
                watchlistSection.innerHTML = `
            <div class="temp-section-watchlist"> 
                <h1 class="temp-section-title"> Your watchlist is looking a little empty... </h1>
                <div class="temp-section-watchlist-btn-container">
                    <form action="index.html">
                        <input type="submit" value="" class="go-to-search-btn"/>
                    </form>
                    <h3> Let's add some movies! </h3>
                </div>
            </div>
            `
            localStorage.clear()
        }
}

