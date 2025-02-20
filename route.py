from app.controllers.application import Application
from bottle import Bottle, route, run, request, static_file
from bottle import redirect, template, response

app = Bottle()
ctl = Application()


@app.route('/static/app/static')
def serve_static(filepath):
    return static_file(filepath, root='./app/static')
    

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
    run(app, host='0.0.0.0', port=7072, debug=True)
