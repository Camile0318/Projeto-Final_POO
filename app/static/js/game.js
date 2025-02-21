document.addEventListener("DOMContentLoaded", function () {
    const palavras = JSON.parse(localStorage.getItem("palavrasSelecionadas")) || [];

    if (palavras.length === 0) {
        alert("Nenhuma palavra selecionada!");
        window.location.href = "/selection"; // Corrigir para redirecionar para a URL correta
    }

    console.log("Palavras selecionadas:", palavras);
    gerarTabuleiro(palavras);
});

function gerarTabuleiro(palavras) {
    const tamanho = 10; // Tamanho do grid 10x10
    const tabuleiro = Array.from({ length: tamanho }, () => Array(tamanho).fill(""));

    // Preenche com as palavras (implementando uma lógica simples de posicionamento)
    palavras.forEach((palavra) => {
        let inserida = false;

        while (!inserida) {
            const direcao = Math.random() < 0.5 ? 'horizontal' : 'vertical';
            const linha = Math.floor(Math.random() * tamanho);
            const coluna = Math.floor(Math.random() * tamanho);

            if (direcao === 'horizontal' && coluna + palavra.length <= tamanho) {
                // Verifica se há espaço horizontal
                if (tabuleiro[linha].slice(coluna, coluna + palavra.length).every(celula => celula === "")) {
                    for (let i = 0; i < palavra.length; i++) {
                        tabuleiro[linha][coluna + i] = palavra[i];
                    }
                    inserida = true;
                }
            } else if (direcao === 'vertical' && linha + palavra.length <= tamanho) {
                // Verifica se há espaço vertical
                if (tabuleiro.slice(linha, linha + palavra.length).every(row => row[coluna] === "")) {
                    for (let i = 0; i < palavra.length; i++) {
                        tabuleiro[linha + i][coluna] = palavra[i];
                    }
                    inserida = true;
                }
            }
        }
    });

    // Renderiza o tabuleiro na página
    const container = document.getElementById("tabuleiro");
    container.innerHTML = ""; // Limpa antes de inserir

    for (let i = 0; i < tamanho; i++) {
        let row = document.createElement("div");
        row.classList.add("linha");

        for (let j = 0; j < tamanho; j++) {
            let cell = document.createElement("span");
            cell.classList.add("celula");
            cell.textContent = tabuleiro[i][j] || "_"; // Se vazio, mostra "_"
            row.appendChild(cell);
        }

        container.appendChild(row);
    }
}
