from bottle import template
from models.word_loader import WordLoader

class Application:
    def __init__(self):
        # Usando um dicionário para mapear páginas aos seus templates
        self.pages = {
            'home': lambda: template('app/views/html/home'),
            'game': lambda: template('app/views/html/game')
        }

    def render(self, page):
        # Tenta renderizar a página; se não existir, chama `helper()`
        content = self.pages.get(page, self.helper)
        return content()

    def helper(self):
        return "Página não encontrada! Verifique o nome da página."


word_loader = WordLoader()
words = word_loader.get_words("portuguese")  # Pegando palavras em português
print(words)  # Deve exibir as palavras do JSON