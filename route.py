from app.controllers.application import Application
from bottle import Bottle, route, run, request, static_file
from bottle import redirect, template, response
import os
import json

app = Bottle()
ctl = Application()

def carregar_usuarios(filepath):
    """Carrega usuários de um arquivo JSON."""
    try:
        with open(filepath, 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}  # Retorna dicionário vazio se o arquivo não existir ou for inválido

def verificar_credenciais(username, password, users):
    """Verifica se o usuário e a senha correspondem."""
    if username in users:
        if users[username] == password:
            return True  # Usuário e senha corretos
        else:
            return False # Senha incorreta
    return False  # Usuário não encontrado



# Servir arquivos estáticos (CSS, JS, imagens, etc.)
@app.route('/static/<filepath:path>')
def serve_static(filepath):
    return static_file(filepath, root='./app/static')

# Rota para servir arquivos JSON de acordo com o idioma e nível de dificuldade
@app.route('/json/<language>/<level>')
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
            response.content_type = 'application/json'
            return json.dumps(data[level_key])  # Retorna a lista de palavras para o nível escolhido
        else:
            response.status = 404
            return json.dumps({'error': 'Nível de dificuldade não encontrado'})
    else:
        response.status = 404
        return json.dumps({'error': 'Arquivo JSON não encontrado'})

# Rota da página inicial
@app.route('/', method=['GET', 'POST'])  # Permite GET e POST
def home():
    mensagem = None
    if request.method == 'POST':
        username = request.forms.get('username')
        password = request.forms.get('password')

        # Substitua 'caminho/para/seu/arquivo/usuarios.json' pelo caminho real
        users = carregar_usuarios('app/models/db/usuarios.json')
        login_sucesso = verificar_credenciais(username, password, users)


        if login_sucesso:
            # Redireciona para a página de seleção após o login bem-sucedido
            redirect('/selection')
        else:
            mensagem = "Usuário ou senha inválidos."

    return template('app/views/html/home.tpl', mensagem=mensagem) #Passando a mensagem para o template

# Rota da seleção de idioma e nível
@app.route('/selection')
def selection():
    return ctl.render('selection', script="selection.js")

# Rota do jogo onde o tabuleiro será gerado
@app.route('/game')
def game():
    return ctl.render('game', script="game.js")

# Rota de erro
@app.route('/error')
def error():
    return ctl.render('error')

if __name__ == '__main__':
    run(app, host='0.0.0.0', port=7095, debug=True)