<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem-vindo ao Jogo</title>
    <link rel="stylesheet" href="/static/styles.css"> <!-- Verifique se o caminho está correto -->
</head>
<body>
    <div class="container">
        <header>
            <h1>Bem-vindo ao nosso jogo!</h1>
            <p>Estamos felizes por você estar aqui. Prepare-se para se divertir!</p>
        </header>

        <section class="intro">
            <h2>Como Funciona?</h2>
            <p>Este é um jogo interativo onde você pode testar suas habilidades. Clique abaixo para começar a jogar!</p>
        </section>

        <section class="actions">
            <a href="/selection" class="btn btn-primary">Iniciar Jogo</a>
            <p>Ou, se quiser, acesse seus pontos:</p>
            <a href="/points" class="btn btn-secondary">Ver Meus Pontos</a>
        </section>

        <footer>
            <p>&copy; 2025 Jogo Divertido - Todos os direitos reservados.</p>
        </footer>
    </div>

    <!-- Caso precise de JS na home, adicione no final do body -->
    <script src="/static/js/{{script}}"></script> <!-- Se necessário, defina o script para a home -->
</body>
</html>
