let page = 0; // Счетчик страниц
const perPage = 10;  
// Подгрузка новых карточек при скролл
// Загрузка новых карточек
function loadMoreAnime() {
    console.log("Loading more anime with genres:", selectedGenres);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                appendAnimeToPage(data.anime_data);
                page++;
            } else {
                console.error('Error loading anime data:', xhr.status);
            }
        }
    };
    xhr.open('GET', `/load_more_anime?page=${page}&per_page=${perPage}`, true);
    xhr.send();
}
// Добавление на сайт новых карточек
function appendAnimeToPage(animeData) {
    const animeList = document.getElementById('anime-list');
    animeData.forEach(anime => {
        const newAnimeCard = document.createElement('div');
        newAnimeCard.classList.add('card', 'show', 'anims');
        anime['Tags'] = anime['Tags'].split(', ');
        anime['Tags']= anime['Tags'].join(', ');
        newAnimeCard.innerHTML = `
            <div class="picture no-select">
                <img src="${anime['Image src']}" class="img-banner">
            </div>
            <div class="content">
                <div class="names">
                    <div class="shortName">${anime['Short title']}</div>
                    <div class="name">${anime['Title']}</div>
                </div>
                <div class="episodes">${anime['Count episodes']} серий</div>
                <div class='episodes'><b>${Array.isArray(anime['Tags']) ? anime['Tags'].join(', ') : anime['Tags'].replace(/'/g, '').replace(/^\[|\]$/g, '').split(', ').join(', ').toUpperCase()}</b></div>
                <div class="description">${anime['Description']}</div>
                <!-- Другие данные о аниме -->
            </div>
        `;
        animeList.appendChild(newAnimeCard);
    });
}

window.onload = loadMoreAnime;

