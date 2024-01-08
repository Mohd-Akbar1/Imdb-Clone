// localStorage
let favlist=JSON.parse(localStorage.getItem('fav')) || [];

const apibaseUrl="https://api.themoviedb.org/3";
const apikey='f701dee9e048e65c574e8d80d6097eec';
const imageBaseUrl="https://image.tmdb.org/t/p/w300"

const moviesGrid=document.getElementById('movies-grid')
const searchInput =document.getElementById('search-input')
const Searchform=document.getElementById('search-form')

const CategoryTitle=document.getElementById('category-title')
const container=document.getElementById('container')
const searchGlass=document.getElementById('magnifying')



///.......................................


//async function for latest movies fetching API

async function MovieNowPlaying(){
  
        const response=await fetch(`${apibaseUrl}/movie/now_playing?api_key=${apikey}`)
    const jsonresponse=await response.json()
    const movies= jsonresponse.results
  
    
    console.log(movies)
        DisplayMovies(movies)
    
   
}

//function to search movie By user Inputs
async function SearchMovies(query){
    
        const response=await fetch(`${apibaseUrl}/search/movie?api_key=${apikey}&query=${query}`)
        const jsonresponse=await response.json()
        const movies= jsonresponse.results
       console.log(movies)
       if(movies.length===0){
        console.log('No')
        CategoryTitle.innerHTML='Movie Not Found...'
    }
    DisplayMovies(movies)
    
  
}


//function to display movies on main page
function DisplayMovies(movies){
    
   
        moviesGrid.innerHTML=movies.map((movie)=>
        `<div class="movie-card" >
       
       
        
             <img src="${imageBaseUrl}${movie.poster_path}"  />
        <div class="tag">
                <p> ⭐ ${movie.vote_average}</p>
                <button id="${movie.id}">+</button> 
           
       </div>
                <h1 id="${movie.id}" > ${ movie.title}</h1>
        </div>
        `).join('')


      //function onclicking movie name to display movie info on new page
      addMovieTileClickedListner();


      //function to add movie detail in localstorage and favourite page
      addFavButtonListner();
    
       

}


 //function onclicking movie name to display movie info on new page
function addMovieTileClickedListner(){

    const movieTiles = document.querySelectorAll(".movie-card h1");
    
    movieTiles.forEach((movieTile) => {
       movieTile.addEventListener("click", handleMovieTileClick);
    });
}

//opening new Page with movie details using SearchParams

function handleMovieTileClick(e) {
   
    let id = e.target.getAttribute('id');
   
    var params = new URLSearchParams();
      params.append("movie", id);
      var url = "/movie.html?" + params.toString();
      location.href = url;
   }
    



//handling user inputs and searching movies

function handleSearchformEvent(event){
    event.preventDefault();
     CategoryTitle.innerHTML='Search Results'
        const Searchquery=searchInput.value
        const movies=SearchMovies(Searchquery)
    


}

function addFavButtonListner() {
    const favButtons = document.querySelectorAll(".movie-card button");
   
   
    favButtons.forEach((button) => {
       button.addEventListener("click", handleFavButtonClick);
    });
 }

 function handleFavButtonClick(event) {
   
    event.stopPropagation();
    const buttonId = event.target.getAttribute("id");
    if ((favlist.includes(buttonId))){
        alert('Already Added ')
        return
    }
    favlist.push(buttonId)
    alert('Added to favourite')
    localStorage.setItem('fav',JSON.stringify(favlist))
    
          
 }
  


Searchform.addEventListener('input',handleSearchformEvent)
searchGlass.addEventListener('click',handleSearchformEvent)
MovieNowPlaying()
















