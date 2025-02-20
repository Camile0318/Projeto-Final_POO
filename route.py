#Esse código cria um servidor web simples usando o framework Bottle

from app.controllers.application import Application
from bottle import Bottle, route, run, request, static_file, response, redirect 
import random
import json

app = Bottle()
ctl = Application()
USERS_FILE = "users.json" 

# Lista de palavras por idioma
# Modificar essa lista
WORDS = {
    "english": ["apple", "banana", "orange", "grape", "strawberry"],
    "portuguese": ["maçã", "banana", "laranja", "uva", "morango"],
    "french": ["pomme", "banane", "orange", "raisin", "fraise"],
    "spanish": ["manzana", "plátano", "naranja", "uva", "fresa"],
    "italian": ["mela", "banana", "arancia", "uva", "fragola"]
}

# Servir arquivos estáticos (CSS, JS, imagens)
@app.route('/static/<filepath:path>')
def serve_static(filepath):
    return static_file(filepath, root='./app/static')

# Página de ajuda
@app.route('/helper')
def helper():
    return ctl.render('helper')


# Função para carregar usuários do JSON
def load_users():
    try:
        with open(USERS_FILE, "r") as file:
            return json.load(file)
    except FileNotFoundError:
        return {}

# Função para salvar usuários no JSON
def save_users(users):
    with open(USERS_FILE, "w") as file:
        json.dump(users, file, indent=4)

# Página inicial
@app.route('/home')
def home():
    return ctl.render('home') #renderiza a home 

@app.route('/register', method=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return ctl.render('register', error=None)  # Renderiza a página de login no método GET
    
    # Quando o formulário de login for enviado, processa com POST
    username = request.forms.get('username')
    password = request.forms.get('password')

    users = load_users()

    # Verifica se o usuário existe e se a senha está correta
    if username in users and bcrypt.checkpw(password.encode('utf-8'), users[username].encode('utf-8')):
        redirect('/game')  # Redireciona para o jogo se o login for bem-sucedido
    else:
        # Se as credenciais estiverem incorretas, retorna um erro
        return ctl.render('home', error="Usuário ou senha inválidos!")


@app.route('/game')
def game():
    return "<h1>Bem-vindo ao Jogo de Caça-Palavras!</h1><p>Agora você pode jogar.</p>"


# Rota para obter palavras aleatórias do jogo
@app.route('/get-words')
def get_words():
    language = request.query.get('lang', 'english')  # Padrão: inglês
    level = int(request.query.get('level', 3))  # Número de palavras a retornar

    if language in WORDS:
        words = random.sample(WORDS[language], min(level, len(WORDS[language])))
        return {"words": words}
    
    response.status = 400
    return {"error": "Idioma não encontrado"}

# Rota para verificar se uma palavra é válida
@app.route('/check-word', method='POST')
def check_word():
    data = request.json
    word = data.get('word', "").lower()
    language = data.get('lang', 'english')

    if language in WORDS and word in WORDS[language]:
        return {"valid": True}
    
    return {"valid": False}

# Iniciar o servidor
if __name__ == '__main__':
    run(app, host='0.0.0.0', port=8080, debug=True)
