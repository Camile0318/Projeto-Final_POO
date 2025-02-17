<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro - Caça-Palavras</title>
    <link rel="stylesheet" href="/static/style.css">
</head>
<body>
    <h1>Crie sua conta</h1>
    
    <form action="/login" method="POST">
    <label for="username">Usuário:</label>
    <input type="text" id="username" name="username" required>
    
    <label for="password">Senha:</label>
    <input type="password" id="password" name="password" required>
    
    <button type="submit">Entrar</button>
</form>

    <p>Já tem uma conta? <a href="/home">Faça login</a></p>

    % if error:
        <p style="color: red;">{{ error }}</p>
    % end

    % if success:
        <p style="color: green;">{{ success }}</p>
    % end
</body>
</html>