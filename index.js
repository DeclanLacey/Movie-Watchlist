const titleInput = document.getElementById("input-bar")
const searchBtn = document.getElementById("search-btn")
let resultSection = document.getElementById("result-section") 
let watchlistSection = document.getElementById("watchlist-section")
let badSearchText = document.getElementById("search-not-found")

    resultSection.innerHTML = `
            <div class="temp-section-search">
                <img class="start-searching-img" src="images/startsearchingicon.png">
                <h1 class="start-searching-text"> Start Exploring </h1>
            </div>
        `

searchBtn.addEventListener("click", function() {
    resultSection.innerHTML = ``
    
        fetch(`https://www.omdbapi.com/?apikey=2e645030&s=${titleInput.value}`)
        .then(response => response.json())
        .then(dataOne => { 
        if (!titleInput.value || dataOne.Response === "False") {
            badSearchText.classList.remove("dont-show-text")
            badSearchText.classList.add("show-text")
            } else {
                badSearchText.classList.remove("show-text")
                badSearchText.classList.add("dont-show-text")
            
            for (i = 0; i < dataOne.Search.length; i++) {
            let imdbID = dataOne.Search[i].imdbID
        
            fetch(`https://www.omdbapi.com/?apikey=2e645030&i=${imdbID}`)
                .then(response => response.json())
                .then(dataTwo => { 
        
                    resultSection.innerHTML += `
                <div class="container">
                    <div class="movie-poster-container">
                        <img class="movie-img" src="${dataTwo.Poster}" alt="Sorry. Image not available at this time">
                    </div>
                    
                    <div>
                        <div class="movie-info-container">
                
                            <div class="title-rating">
                            <h1> ${dataTwo.Title} </h1>
                            <p> ⭐ ${dataTwo.Ratings[0].Value} </p>
                            </div>
                            
                            <div class="runtime-type-btn">
                                <h3> ${dataTwo.Runtime} </h3>
                                <h3 class="genre"> ${dataTwo.Genre} </h3>
                                <button id="add-btn" class="add-btn" onclick=storeData("${dataTwo.imdbID}")>  </button>
                                <h3> Watchlist </h3>
                            </div>
                        
                            <div class="movie-desc">
                                <p> ${dataTwo.Plot}</p>
                            </div>  
                        </div>
                    </div>
                `
                })
            }
        }
    })  
})

function storeData(ID) {
            let movieIds = JSON.parse(localStorage.getItem("watchlist")) || [];
            movieIds.push(ID);
            localStorage.setItem("watchlist", JSON.stringify(movieIds))
}


   



    

   
    