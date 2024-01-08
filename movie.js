// function getMovieFromQueryParam() {
//     var params = new URLSearchParams(window.location.search);
//     const movie = JSON.parse(params.get("movie"));
//     console.log(movie)
// }
const moviesGrid=document.getElementById('movies-grid')
const imageBaseUrl="https://image.tmdb.org/t/p/w300"
const query=window.location.search
        const urlparams=new URLSearchParams(query)
        var id=urlparams.get('movie')
       
        console.log(id)

fetch(`https://api.themoviedb.org/3/movie/${id}?&append_to_response=videos,images&api_key=f701dee9e048e65c574e8d80d6097eec`)
.then(res=>res.json())
.then(movie=>{(
 
    moviesGrid.innerHTML=`
    <div class="movie-card" id="${movie.id}" onclick='getdata(${movie.id})'>
    <img src="${imageBaseUrl}${movie.poster_path}"/>
    
    <div class='details'>
    <p> ⭐ ${movie.vote_average}</p>
    <h1> ${ movie.title}</h1>
    <p>  ${movie.tagline}</p><br>
    <p> ${movie.genres.map((gen=>`<span class='genre'>${gen.name}</span>`)).join(' ')}</p>
    <p> <span>Release Date:</span>  ${movie.release_date}</p>
    <p class='runtime'><img src='./clock.png' id='clock'></span>   ${movie.runtime} min</p>
    <p><span>languages:</span>   ${movie.spoken_languages.map(lan=>`${lan.english_name
    }`)}</p>
    <p> <span>Overview:</span>  ${movie.overview}</p>

    <div class='fav'>
    <p> <span>vote average:</span>  ${movie.vote_average}</p>
   
    </div>
   
    </div>
    </div>
    `)
    console.log(movie)
  
})
function AddToFav(){
   
    alert('Added to Favourite')
    console.log('inside')

}


