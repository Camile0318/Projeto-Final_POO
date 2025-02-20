document.addEventListener("DOMContentLoaded", function () {
    const palavras = JSON.parse(localStorage.getItem("palavrasSelecionadas")) || [];

    if (palavras.length === 0) {
        alert("Nenhuma palavra selecionada!");
        window.location.href = "selection.tpl";
    }

    console.log("Palavras selecionadas:", palavras);
    gerarTabuleiro(palavras);
});



function gerarTabuleiro(palavras) {
    const tamanho = 10; // Tamanho do grid 10x10
    const tabuleiro = Array.from({ length: tamanho }, () => Array(tamanho).fill(""));

    // Preenche com as palavras (implementar lógica para posicionamento)
    palavras.forEach((palavra, index) => {
        for (let i = 0; i < palavra.length; i++) {
            tabuleiro[index][i] = palavra[i]; // Simples, só para testar
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
