<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seleção de Jogo - Caça-Palavras</title>
    <link rel="stylesheet" href="/static/css/styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Seleção de Jogo - Caça-Palavras</h1>
        </header>

        <section class="form-section">
            <label for="language">Idioma:</label>
            <select id="language">
                <option value="portuguese">Português</option>
                <option value="english">Inglês</option>
                <option value="spanish">Espanhol</option>
                <option value="french">Francês</option>
                <option value="italian">Italiano</option>
            </select>

            <label for="level">Nível:</label>
            <select id="level">
                <option value="easy">Fácil</option>
                <option value="medium">Médio</option>
                <option value="hard">Difícil</option>
            </select>

            <button onclick="startGame()">Iniciar Jogo</button>
        </section>
    </div>

    <script src="/static/js/{{script}}"></script>

    <script>
        function startGame() {
            const language = document.getElementById("language").value;
            const level = document.getElementById("level").value;

            // Salva as seleções de idioma e nível no localStorage
            localStorage.setItem("language", language);
            localStorage.setItem("level", level);

            // Faz a requisição ao backend para pegar as palavras do JSON
            fetch(`/json/${language}/${level}`)
                .then(response => response.json())
                .then(data => {
                    // Salva as palavras no localStorage
                    if (data.error) {
                        alert(data.error);
                    } else {
                        localStorage.setItem("palavrasSelecionadas", JSON.stringify(data));
                        // Redireciona para a página do jogo
                        window.location.href = "/game";
                    }
                })
                .catch(error => {
                    alert("Erro ao carregar as palavras do jogo.");
                    console.error(error);
                });
        }
    </script>

</body>
</html>
