import json
import os

class WordLoader:
    def __init__(self, folder_path="/home/camile/Área de Trabalho/Projeto final POO/app/models/db"):
        self.folder_path = folder_path
        self.words = {}  # Dicionário para armazenar as palavras
        self.load_words()

    def load_words(self):
        # Verifica se o diretório existe
        if not os.path.abspath(self.folder_path):
            print("Erro: O diretório não foi encontrado!")
            return {}

        try:
            # Itera sobre todos os arquivos na pasta
            for filename in os.listdir(self.folder_path):
                file_path = os.path.join(self.folder_path, filename)

                # Verifica se o arquivo é um JSON
                if os.path.isfile(file_path) and filename.endswith(".json"):
                    language = filename.split(".")[0]  # Extrai o nome da língua do arquivo, como "english", "portuguese"
                    self.words[language] = self.load_language(file_path)

        except PermissionError:
            print(f"Erro: Permissão negada para acessar {self.folder_path}!")
        except Exception as e:
            print(f"Erro inesperado: {e}")

    def load_language(self, file_path):
        try:
            with open(file_path, "r", encoding="utf-8") as file:
                return json.load(file)
        except json.JSONDecodeError:
            print(f"Erro ao carregar o arquivo {file_path}. O conteúdo pode estar corrompido.")
            return {}
        except Exception as e:
            print(f"Erro ao abrir o arquivo {file_path}: {e}")
            return {}

    def get_words(self, languages, lists):
        words_list = []

        # Para cada língua solicitada
        for language in languages:
            if language in self.words:
                # Para cada lista solicitada
                for list_name in lists:
                    if list_name in self.words[language]:
                        words_list.extend(self.words[language][list_name])  # Adiciona as palavras da lista à lista final
                    else:
                        print(f"A lista '{list_name}' não foi encontrada no arquivo '{language}.json'.")
            else:
                print(f"A língua '{language}' não foi encontrada.")
        
        return words_list

# Testando o carregamento
if __name__ == "__main__":
    loader = WordLoader()

    # Solicitando palavras para "english" e "portuguese", das listas "greetings" e "colors"
    words = loader.get_words(
        #seleções do usuário
    )
    
    print(words)  # Exibindo as palavras selecionadas
