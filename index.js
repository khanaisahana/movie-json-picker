
const JSON_FILE_URL = "movies.json";  // Replace with the correct path to your JSON file
let movies;

const main = document.getElementById("content");
const form = document.getElementById("form");
const search = document.getElementById("search");
const startDateInput = document.getElementById("start-date");
const endDateInput = document.getElementById("end-date");

// initially get fav movies
getMovies(JSON_FILE_URL);

async function getMovies(url) {
    const resp = await fetch(url);
    movies = await resp.json();
    console.log(movies);
    showMovies(movies.results);
}

function showMovies(movies) {
    // clear main
    main.innerHTML = "";
    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview, release_date } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
            <img src="${poster_path}" alt="${title}" />
            <div class="movie-info">
                <span class="${getClassByRate(vote_average)}">Rating ${vote_average}</span>
                <h3>${title}</h3>
                <span>${release_date}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;
        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    let filteredMovies = movies.results;

    if (startDate && endDate) {
        // Filter movies based on the date range (modify as needed)
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        filteredMovies = movies.results.filter(movie => {
            const movieDate = new Date(movie.release_date);
            return movieDate >= startDateObj && movieDate <= endDateObj;
        });
    }

    showMovies(filteredMovies);
});