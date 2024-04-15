window.addEventListener('scroll', function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        // Пользователь достиг конца страницы
        loadMoreData();
    }
});

function loadMoreData() {
    // Показываем индикатор загрузки
    document.getElementById('load-more').style.display = 'block';

    // Выполняем AJAX запрос для загрузки данных
    fetch('/load_more_anime')
        .then(response => response.json())
        .then(data => {
            // Добавляем загруженные данные на страницу
            appendDataToPage(data);

            // Скрываем индикатор загрузки
            document.getElementById('load-more').style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function appendDataToPage(data) {
    // Получаем контейнер списка аниме
    var animeList = document.getElementById('anime-list');

    // Добавляем новые элементы в список
    data.anime_data.forEach(function(anime) {
        var newAnimeCard = document.createElement('div');
        newAnimeCard.classList.add('card');
        newAnimeCard.innerHTML = `
            <div class="picture">
                <img src="${anime['Image src']}" class="img-banner">
            </div>
            <div class="content">
                <div class="names">
                    <div class="shortName">${anime['Short title']}</div>
                    <div class="name">${anime['Title']}</div>
                </div>
                <div class="episodes">${anime['Count episodes']} серий</div>
                <div class="description">${anime['Description']}</div>
                <!-- Другие данные о аниме -->
            </div>
        `;
        animeList.appendChild(newAnimeCard);
    });
}