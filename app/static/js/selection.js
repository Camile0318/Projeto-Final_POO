function startGame() {
    const language = document.getElementById("language").value;
    const level = document.getElementById("level").value;

    // CORREÇÃO: Usa a rota correta para buscar o JSON
    const jsonUrl = `/json/${language}/${level}`;

    fetch(jsonUrl) // Usa a URL construída
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`); // Trata erros de rede/HTTP
            }
            return response.json();
        })
        .then(palavrasSelecionadas => {

            if (!palavrasSelecionadas || palavrasSelecionadas.length === 0) {
                alert("Nenhuma palavra disponível para essa configuração.");
                return;
            }

            localStorage.setItem("palavrasSelecionadas", JSON.stringify(palavrasSelecionadas));
             // CORREÇÃO: Redireciona para /game (a rota), não para o nome do template
            window.location.href = "/game";
        })
        .catch(error => {
            console.error("Erro ao carregar o arquivo JSON:", error);
            alert("Erro ao carregar palavras. Tente novamente.");
        });
}