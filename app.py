from flask import Flask, render_template, jsonify
import json
from flask import request

app = Flask(__name__)

# Маршрут для основной страницы
@app.route('/')
def index():
    with open('anime_final.json', 'r', encoding='utf-8') as file:
        data = json.load(file)

    # Передаем данные в HTML шаблон
    return render_template('tcard.html', anime_data=data)

@app.route('/load_more_anime')
def load_more_anime():
    page = request.args.get('page', type=int)
    per_page = request.args.get('per_page', type=int)
    genres_param = request.args.get('genres', '')

    # Преобразование параметра жанров в список
    selected_genres = genres_param.split(',') if genres_param else []

    # Открыть файл и загрузить все данные
    with open('anime_final.json', 'r', encoding='utf-8') as file:
        all_data = json.load(file)

    # Фильтрация данных по всем выбранным жанрам
    filtered_data = all_data
    for genre in selected_genres:
        filtered_data = [anime for anime in filtered_data if genre in anime.get('Tags', [])]

    # Вычислить индексы данных для текущей страницы
    start_index = page * per_page
    end_index = start_index + per_page

    # Отправить часть отфильтрованных данных на клиент
    return jsonify(anime_data=filtered_data[start_index:end_index])


if __name__ == "__main__":
    app.run(debug=True)