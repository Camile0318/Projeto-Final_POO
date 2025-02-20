function startGame() {
    const language = document.getElementById("language").value;
    const level = document.getElementById("level").value;

    // Define o caminho do arquivo JSON com base no idioma escolhido
    const jsonFile = `${language}.json`;

    // Carrega o JSON com as palavras do idioma escolhido
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            // Define a chave correta para acessar as palavras (ex: "portuguese_easy")
            const key = `${language}_${level}`;
            const palavrasSelecionadas = data[key];

            if (!palavrasSelecionadas || palavrasSelecionadas.length === 0) {
                alert("Nenhuma palavra disponível para essa configuração.");
                return;
            }

            // Armazena as palavras no localStorage
            localStorage.setItem("palavrasSelecionadas", JSON.stringify(palavrasSelecionadas));

            // Redireciona para a página do jogo
            window.location.href = "game.tpl";
        })
        .catch(error => {
            console.error("Erro ao carregar o arquivo JSON:", error);
            alert("Erro ao carregar palavras. Tente novamente.");
        });
}
