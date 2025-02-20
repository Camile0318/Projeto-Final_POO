<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seleção de Jogo - Caça-Palavras</title>
</head>
<body>
    <h1>Seleção de Jogo - Caça-Palavras</h1>

    <div>
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
    </div>

    <script>
        <script src="selection.js"></script>
    </script>
</body>
</html>
