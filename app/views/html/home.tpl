<!DOCTYPE html>
<html>
<head>
    <title>Bem-vindo</title>
    <link rel="stylesheet" href="/static/css/styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Jogo de Caça-Palavras</h1>
            <p>Faça login para começar a jogar.</p>
        </header>

        <section class="form-section">
            <h2>Login</h2>
            % if mensagem:
                <p class="mensagem-erro">{{ mensagem }}</p>
            % end

            <form action="/" method="post">
                <div>
                    <label for="username">Usuário:</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div>
                    <label for="password">Senha:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit">Entrar</button>
            </form>
        </section>

        <footer>
            <p>© 2023 Seu Nome</p>
        </footer>
    </div>
</body>
</html>