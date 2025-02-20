from app.controllers.application import Application
from bottle import Bottle, route, run, request, static_file
from bottle import redirect, template, response
import os
import json

app = Bottle()
ctl = Application()

#css
@app.route('/static/app/static')
def serve_static(filepath):
    return static_file(filepath, root='./app/static')
#js
@app.route('/static/app/static')
def serve_static(filepath):
    return static_file(filepath, root='./app/static')

# Rota para servir arquivos JSON de acordo com o idioma e nível de dificuldade
@app.route('/json/{language}/{level}')
def serve_json(language, level):
    # Caminho do arquivo JSON baseado no idioma
    json_filename = f"{language}.json"
    json_path = os.path.join('./app/models/db', json_filename)
    
    # Verifica se o arquivo JSON existe
    if os.path.exists(json_path):
        # Carregar o conteúdo do arquivo JSON
        with open(json_path, 'r') as f:
            data = json.load(f)
        
        # Verifica se o nível de dificuldade existe para o idioma escolhido
        level_key = f"{language}_{level}"
        if level_key in data:
            return response.json(data[level_key])  # Retorna a lista de palavras para o nível escolhido
        else:
            return {'error': 'Nível de dificuldade não encontrado para esse idioma'}
    else:
        return {'error': 'Arquivo JSON não encontrado'}

@app.route('/helper')
def helper(info=None):
    # Usando a lógica de renderização do controlador
    return ctl.render('helper')


@app.route('/')
def home():
    return ctl.render('home')


@app.route('/selection')
def selection():
    return ctl.render('selection')


@app.route('/game')
def game():
    return ctl.render('game')

@app.route('/points')
def points():
    return ctl.render('points')

@app.route('/error')
def error():
    return ctl.render('error') 



if __name__ == '__main__':
    run(app, host='0.0.0.0', port=7082, debug=True)
