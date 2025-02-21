document.addEventListener("DOMContentLoaded", function () {
    // Verifica se há palavras no localStorage
    let palavras = [];
    try {
        palavras = JSON.parse(localStorage.getItem("palavrasSelecionadas")) || [];
    } catch (e) {
        console.error("Erro ao parsear palavras do localStorage:", e);
        alert("Erro ao carregar palavras selecionadas!");
        window.location.href = "/selection"; // Redireciona para a página de seleção
        return; // Interrompe a execução do código
    }

    // Verifica se há palavras selecionadas
    if (palavras.length === 0) {
        alert("Nenhuma palavra selecionada!");
        window.location.href = "app/views/html/selection"; // Redireciona para a página de seleção
        return; // Interrompe a execução do código
    }

    console.log("Palavras selecionadas:", palavras);
    gerarTabuleiro(palavras); // Gera o tabuleiro com as palavras
});

function gerarTabuleiro(palavras) {
    const tamanho = 20; // Tamanho do grid 20x20
    const tabuleiro = Array.from({ length: tamanho }, () => Array(tamanho).fill(""));

    // Preenche o tabuleiro com as palavras
    palavras.forEach((palavra) => {
        let inserida = false;
        let tentativas = 0;
        const maxTentativas = 100; // Limite de tentativas para evitar loops infinitos

        while (!inserida && tentativas < maxTentativas) {
            tentativas++;
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

        if (!inserida) {
            console.error(`Não foi possível inserir a palavra: ${palavra}`);
        }
    });

    // Renderiza o tabuleiro na página
    const container = document.getElementById("tabuleiro");
    if (!container) {
        console.error("Elemento #tabuleiro não encontrado!");
        return;
    }
    container.innerHTML = ""; // Limpa o conteúdo anterior

    for (let i = 0; i < tamanho; i++) {
        let row = document.createElement("div");
        row.classList.add("linha");

        for (let j = 0; j < tamanho; j++) {
            let cell = document.createElement("span");
            cell.classList.add("celula");
        
            // Verifica se a célula está vazia
            if (tabuleiro[i][j] === undefined || tabuleiro[i][j] === null || tabuleiro[i][j] === "") {
                // Gera uma letra aleatória
                const letras = "abcdefghijklmnopqrstuvwxyz";
                const letraAleatoria = letras[Math.floor(Math.random() * letras.length)];
                cell.textContent = letraAleatoria;
            } else {
                cell.textContent = tabuleiro[i][j];
            }
        
            row.appendChild(cell);
        }

        container.appendChild(row);
    }
}