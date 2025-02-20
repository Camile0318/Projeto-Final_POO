<!AAAAAAAAA html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Caça-Palavras</title>
    <style>
        /* Estilos básicos para o caça-palavras */
        .grid {
            display: grid;
            grid-gap: 5px;
            margin-bottom: 20px;
        }

        .cell {
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            border: 1px solid #ddd;
            cursor: pointer;
            font-size: 16px;
        }

        .found {
            background-color: yellow;
        }
    </style>
</head>
<body>
    <h1>Caça-Palavras</h1>

    <div>
        <label for="language">Idioma:</label>
        <select id="language">
            <option value="portuguese">Português</option>
            <option value="english">Inglês</option>
            <option value="spanish">Espanhol</option>
            <option value="french">Francês</option>
            <option value="italian">Italiano</option>
        </select>

        <label for="level">Nível:</label>
        <select id="level">
            <option value="easy">Fácil</option>
            <option value="medium">Médio</option>
            <option value="hard">Difícil</option>
        </select>

        <button onclick="startGame()">Iniciar Jogo</button>
    </div>

    <div id="game-container"></div>

    <script>
        function startGame() {
            const language = document.getElementById("language").value;
            const level = document.getElementById("level").value;

            // Fazer a requisição para obter as palavras
            fetch(`/json/${language}/${level}`)
                .then(response => response.json())
                .then(data => {
                    if (data[`${language}_${level}`]) {
                        const words = data[`${language}_${level}`];
                        console.log("Palavras: ", words);
                        generateWordSearch(words);
                    } else {
                        alert("Erro ao carregar as palavras.");
                    }
                })
                .catch(error => {
                    alert("Erro ao carregar as palavras: " + error);
                });
        }

        function generateWordSearch(words) {
            const maxWordLength = Math.max(...words.map(word => word.length)); // Pega o comprimento da maior palavra
            const gridSize = Math.max(15, maxWordLength); // Define a grade com no mínimo 15x15

            const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));

            // Função para inserir as palavras no grid
            function insertWord(word) {
                const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
                const wordLength = word.length;

                let row, col;
                if (direction === 'horizontal') {
                    row = Math.floor(Math.random() * gridSize);
                    col = Math.floor(Math.random() * (gridSize - wordLength));
                } else {
                    row = Math.floor(Math.random() * (gridSize - wordLength));
                    col = Math.floor(Math.random() * gridSize);
                }

                // Verificar se há espaço para a palavra
                for (let i = 0; i < wordLength; i++) {
                    if (direction === 'horizontal' && grid[row][col + i] !== '') return false;
                    if (direction === 'vertical' && grid[row + i][col] !== '') return false;
                }

                // Inserir a palavra no grid
                for (let i = 0; i < wordLength; i++) {
                    if (direction === 'horizontal') {
                        grid[row][col + i] = word[i];
                    } else {
                        grid[row + i][col] = word[i];
                    }
                }
                return true;
            }

            // Tentar colocar todas as palavras no grid
            words.forEach(word => {
                let placed = false;
                while (!placed) {
                    placed = insertWord(word);
                }
            });

            // Preencher as células vazias com letras aleatórias
            for (let row = 0; row < gridSize; row++) {
                for (let col = 0; col < gridSize; col++) {
                    if (grid[row][col] === '') {
                        grid[row][col] = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
                    }
                }
            }

            // Exibir o grid na página
            const gameContainer = document.getElementById("game-container");
            gameContainer.innerHTML = '';
            const gridDiv = document.createElement("div");
            gridDiv.classList.add("grid");
            gridDiv.style.gridTemplateColumns = `repeat(${gridSize}, 30px)`; // Ajusta as colunas com base no tamanho da grade

            grid.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {
                    const cellDiv = document.createElement("div");
                    cellDiv.classList.add("cell");
                    cellDiv.innerText = cell;
                    cellDiv.addEventListener('click', () => markCell(rowIndex, colIndex));
                    gridDiv.appendChild(cellDiv);
                });
            });

            gameContainer.appendChild(gridDiv);
        }

        // Função para marcar a célula
        function markCell(row, col) {
            const gridDiv = document.querySelector(".grid");
            const cellDiv = gridDiv.children[row * 15 + col];
            cellDiv.classList.toggle('found');
        }
    </script>
</body>
</html>
