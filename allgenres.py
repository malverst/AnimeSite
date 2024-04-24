import json

# Загрузка данных из файла JSON
with open('anime_final.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Создаем пустое множество для хранения уникальных жанров
genres_set = set()

# Проходимся по каждой записи в данных
for anime in data:
    # Проверяем наличие ключа 'Tags' в записи
    if 'Tags' in anime and anime['Tags']:
        # Убираем квадратные скобки, кавычки и лишние пробелы из строки и разделяем ее по запятым
        tags_list = [tag.strip("[]' ") for tag in anime['Tags'].split(',')]
        # Добавляем все жанры из списка в множество
        genres_set.update(tags_list)

# Преобразуем множество в список, чтобы получить уникальные значения жанров
unique_genres = list(genres_set)

# Выводим уникальные жанры
for genre in unique_genres:
    print(genre)