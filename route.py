#Esse código cria um servidor web simples usando o framework Bottle

from app.controllers.application import Application
from bottle import Bottle, route, run, request, static_file
from bottle import redirect, template, response


app = Bottle() #instância do objeto Bottle, que representa a aplicação web
ctl = Application() #instância da classe aplication 

# Rotas:

@app.route('/static/<filepath:path>')
def serve_static(filepath):
    return static_file(filepath, root='./app/static')

@app.route('/helper')
def helper(info= None):
    return ctl.render('helper')

# Minhas rotas aqui:
@app.route ('/home')
def home():
    return ctl.render ('home') #renderiza o template da home
#login - estará na home
# --- CONFIGURAR ROTA DO LOGIN
#configurando o jogo
    #idiomas
    # nivel - determinado pelo tamanho das palavras


if __name__ == '__main__':

    run(app, host='0.0.0.0', port=8080, debug=True)