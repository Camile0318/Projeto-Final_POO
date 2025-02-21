document.addEventListener("DOMContentLoaded", function () {
    let palavras = [];
    try {
        palavras = JSON.parse(localStorage.getItem("palavrasSelecionadas")) || [];
    } catch (e) {
        console.error("Erro ao parsear palavras do localStorage:", e);
        alert("Erro ao carregar palavras selecionadas!");
        window.location.href = "/selection";
        return;
    }

    if (palavras.length === 0) {
        alert("Nenhuma palavra selecionada!");
        window.location.href = "/selection";
        return;
    }

    console.log("Palavras selecionadas:", palavras);
    gerarTabuleiro(palavras);
});

function gerarTabuleiro(palavras) {
    const tamanho = 20;
    const tabuleiro = Array.from({ length: tamanho }, () => Array(tamanho).fill(""));
    const palavrasNoTabuleiro = []; // Armazena informações sobre as palavras inseridas

    function tentarInserirPalavra(palavra) {
        const direcoes = ['horizontal', 'vertical'];
        for (let tentativa = 0; tentativa < 50; tentativa++) { // Tenta várias vezes
            const direcao = direcoes[Math.floor(Math.random() * direcoes.length)];
            const linhaInicial = Math.floor(Math.random() * tamanho);
            const colunaInicial = Math.floor(Math.random() * tamanho);

            if (direcao === 'horizontal' && colunaInicial + palavra.length > tamanho) continue;
            if (direcao === 'vertical' && linhaInicial + palavra.length > tamanho) continue;

            let podeInserir = true;
            for (let i = 0; i < palavra.length; i++) {
                const linha = direcao === 'horizontal' ? linhaInicial : linhaInicial + i;
                const coluna = direcao === 'horizontal' ? colunaInicial + i : colunaInicial;
                if (tabuleiro[linha][coluna] !== "" && tabuleiro[linha][coluna] !== palavra[i]) {
                    podeInserir = false;
                    break;
                }
            }

            if (podeInserir) {
                for (let i = 0; i < palavra.length; i++) {
                    const linha = direcao === 'horizontal' ? linhaInicial : linhaInicial + i;
                    const coluna = direcao === 'horizontal' ? colunaInicial + i : colunaInicial;
                    tabuleiro[linha][coluna] = palavra[i];
                }
                // Armazena a palavra, sua posição e direção
                palavrasNoTabuleiro.push({
                    palavra: palavra,
                    linhaInicial: linhaInicial,
                    colunaInicial: colunaInicial,
                    direcao: direcao,
                });
                return true;
            }
        }
        return false; // Não conseguiu inserir
    }

    palavras.forEach(palavra => tentarInserirPalavra(palavra));

    const container = document.getElementById("tabuleiro");
    if (!container) {
        console.error("Elemento #tabuleiro não encontrado!");
        return;
    }
    container.innerHTML = "";

    for (let i = 0; i < tamanho; i++) {
        for (let j = 0; j < tamanho; j++) {
            const cell = document.createElement("span");
            cell.classList.add("celula");
            cell.textContent = tabuleiro[i][j] || String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
            cell.dataset.linha = i;
            cell.dataset.coluna = j;
            container.appendChild(cell);
        }
    }

    // --- Lógica de Seleção ---
    let celulasSelecionadas = [];
    let palavraSelecionada = "";

    container.addEventListener('mousedown', function(event) {
        if (!event.target.classList.contains('celula')) return;

        celulasSelecionadas = []; // Começa uma nova seleção
        palavraSelecionada = "";
        selecionarCelula(event.target);
    });

    container.addEventListener('mousemove', function(event) {
      if (celulasSelecionadas.length === 0) return; // Só continua se houver seleção
        if (!event.target.classList.contains('celula')) return;


        const primeiraCelula = celulasSelecionadas[0];
        const celulaAtual = event.target;

        const linha1 = parseInt(primeiraCelula.dataset.linha);
        const coluna1 = parseInt(primeiraCelula.dataset.coluna);
        const linha2 = parseInt(celulaAtual.dataset.linha);
        const coluna2 = parseInt(celulaAtual.dataset.coluna);

        // Verifica se está na mesma linha ou coluna (ou diagonal, se quiser)
        if (linha1 === linha2 || coluna1 === coluna2 || Math.abs(linha1 - linha2) === Math.abs(coluna1 - coluna2)) {
          selecionarCelula(celulaAtual);
        }

    });

     container.addEventListener('mouseup', function(event) {

        const palavraCompleta = palavrasNoTabuleiro.find(p => p.palavra === palavraSelecionada);

        if (palavraCompleta) {
             // Verifica se a seleção corresponde à palavra completa (posição e direção)
            const linhaInicial = parseInt(celulasSelecionadas[0].dataset.linha);
            const colunaInicial = parseInt(celulasSelecionadas[0].dataset.coluna);

             if (linhaInicial === palavraCompleta.linhaInicial && colunaInicial === palavraCompleta.colunaInicial)
             {
                celulasSelecionadas.forEach(c => c.classList.add('encontrada'));
             }
             else{
                //Inverte a palavra
                let palavraInvertida = palavraSelecionada.split("").reverse().join("")
                const palavraCompletaInvertida = palavrasNoTabuleiro.find(p => p.palavra === palavraInvertida);
                if (palavraCompletaInvertida){
                     celulasSelecionadas.forEach(c => c.classList.add('encontrada'));
                }
                else{
                    celulasSelecionadas.forEach(c => c.classList.remove('selecionada'));
                }

             }

        }
        else {
            // Limpa a seleção se a palavra não for encontrada
            celulasSelecionadas.forEach(c => c.classList.remove('selecionada'));
        }

        celulasSelecionadas = []; // Limpa a seleção
        palavraSelecionada = "";

    });

    function selecionarCelula(celula) {
        if (!celulasSelecionadas.includes(celula)) {
            celula.classList.add('selecionada');
            celulasSelecionadas.push(celula);
            palavraSelecionada += celula.textContent;
        }
    }
}