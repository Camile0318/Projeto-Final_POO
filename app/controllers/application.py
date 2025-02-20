from bottle import template

class Application:
    def __init__(self):
        # Dicionário para mapear as páginas aos seus respectivos templates
        self.pages = {
            'home': 'home',        # boas-vindas e registro
            'selection': 'selection',  # configuração do jogo
            'game': 'game',        # jogo
            'points': 'points' ,
            'error' : 'error'    # jogador acessa seus pontos
        }

    def render(self, page):
        # Se a página não for encontrada, renderiza um template de erro
        template_name = self.pages.get(page, 'error')  # 'error' se a página não existir
        return template(f'app/views/html/{template_name}.tpl')

    def page_not_found(self):
        # Retorna um template de erro personalizado
        return "Página não encontrada!"
