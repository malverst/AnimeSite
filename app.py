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

# Маршрут для загрузки дополнительных данных аниме
@app.route('/load_more_anime')
def load_more_anime():
    page = request.args.get('page', type=int)
    per_page = request.args.get('per_page', type=int)

    # Открыть файл и загрузить данные
    with open('anime_final.json', 'r', encoding='utf-8') as file:
        all_data = json.load(file)

    # Вычислить индексы данных для текущей страницы
    start_index = page * per_page
    end_index = start_index + per_page

    # Отправить часть данных на клиент
    return jsonify(anime_data=all_data[start_index:end_index])

if __name__ == "__main__":
    app.run(debug=True)