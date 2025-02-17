<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Caça-Palavras</title>
    <link rel="stylesheet" href="/static/style.css">
</head>
<body>
    <h1>Bem-vindo ao Jogo de Caça-Palavras!</h1>
    
    <h2>Faça login para continuar</h2>
    <form action="/login" method="post">
        <label for="username">Usuário:</label>
        <input type="text" id="username" name="username" required>
        <br><br>

        <label for="password">Senha:</label>
        <input type="password" id="password" name="password" required>
        <br><br>

        <button type="submit">Entrar</button>
    </form>

    <p>Não tem uma conta? <a href="/register">Cadastre-se</a></p>

    % if error:
        <p style="color: red;">{{ error }}</p>
    % end
</body>
</html>