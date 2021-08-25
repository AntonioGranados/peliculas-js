// const apiKey = '151b779eaa4dac826da47d5c745454a2';
const apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=151b779eaa4dac826da47d5c745454a2&language=es-ES&sort_by=popularity.desc&page=1';
const imgPath = 'https://image.tmdb.org/t/p/w1280';
const busquedaDePeliculas = 'https://api.themoviedb.org/3/search/movie?&api_key=151b779eaa4dac826da47d5c745454a2&language=es-ES&query=';
const imgNoDisponible = 'https://www.mobileservicepoint.es/wp-content/uploads/2019/04/no_image.png';

const main = document.getElementById('main');
const formulario = document.getElementById('formulario');
const buscarPelicula = document.getElementById('buscarPelicula');

getPeliculas(apiUrl);

async function getPeliculas(url) {
    const response = await fetch(url);
    const datosDeLaRespuesta = await response.json();

    console.log(datosDeLaRespuesta);

    mostrarPeliculas(datosDeLaRespuesta.results);

    return datosDeLaRespuesta;
}

function mostrarPeliculas(peliculas) {
    main.innerHTML = '';

    peliculas.forEach(pelicula => {
        const { poster_path, title, vote_average, overview } = pelicula;
        const peliculaEl = document.createElement('div');
        peliculaEl.classList.add('pelicula');

        peliculaEl.innerHTML = `
            <img src="${getImage(poster_path)}" alt="${title}">
            <div class="pelicula-info">
                <h3>${title}</h3><span class="${getClassByVote(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h4>Reseña:</h4>
                ${overview}        
            </div>
        `;

        main.appendChild(peliculaEl);
    })
}

function getImage(imagen) {
    if (imagen) {
        return imgPath + imagen;
    } else {
        return imgNoDisponible;
    }
}

function getClassByVote(voto) {
    if (voto >= 8) {
        return 'green'
    } else if (voto >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const peliculaABuscar = buscarPelicula.value;

    if (peliculaABuscar) {
        getPeliculas(busquedaDePeliculas + peliculaABuscar);
        buscarPelicula.value = "";
    }




})