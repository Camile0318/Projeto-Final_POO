// Aguardando o carregamento completo da página antes de executar o código
document.addEventListener("DOMContentLoaded", function () {

    // Função para manipular a transição de botões
    const buttons = document.querySelectorAll('.btn');
    
    // Adicionando um efeito de foco nos botões
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = "#2980b9";
        });

        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = "#3498db";
        });
    });

    // Exemplo de exibição de uma mensagem após o clique de um botão
    const startButton = document.querySelector('.btn-primary');
    if (startButton) {
        startButton.addEventListener('click', function () {
            alert('O jogo está prestes a começar!');
        });
    }

    // Função de validação simples para a página de "selection" (configuração do jogo)
    const selectionForm = document.querySelector('#selection-form');
    if (selectionForm) {
        selectionForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Impede o envio do formulário

            const selectedOption = document.querySelector('input[name="game-option"]:checked');
            if (!selectedOption) {
                alert('Por favor, escolha uma opção para iniciar o jogo.');
            } else {
                alert('Opção selecionada: ' + selectedOption.value);
                // Aqui você pode adicionar redirecionamento ou outra ação
            }
        });
    }

    // Função para manipulação de dados localmente (Exemplo: Armazenar pontos no localStorage)
    const pointsButton = document.querySelector('.btn-secondary');
    if (pointsButton) {
        pointsButton.addEventListener('click', function () {
            // Exemplo simples de manipulação de pontos do usuário
            let points = localStorage.getItem('userPoints') || 0;
            points = parseInt(points) + 10; // Simula o aumento de pontos
            localStorage.setItem('userPoints', points);
            alert('Seus pontos atuais: ' + points);
        });
    }

    // Função para exibir pontos armazenados (quando o usuário acessa /points)
    const pointsDisplay = document.querySelector('#points-display');
    if (pointsDisplay) {
        const storedPoints = localStorage.getItem('userPoints') || 0;
        pointsDisplay.textContent = `Seus pontos atuais: ${storedPoints}`;
    }
    
    // Exemplo de manipulação de um botão de "Voltar"
    const backButton = document.querySelector('.back-btn');
    if (backButton) {
        backButton.addEventListener('click', function () {
            window.location.href = '/'; // Redireciona para a página inicial
        });
    }

});
