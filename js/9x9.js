//Declara variaveis
var jogoIniciado = false;
var modoSelecionado;
var jogadorAtual = 'P1';

// Tamanho do tabuleiro
var tamanhoTabuleiro = 9;

//Função responsável por verificar qual modo de jogo foi selecionado e registrar o inicio da partida
function modoJogoSubmit() {
    var modoFoiSelecionado = document.querySelector('input[name="modoJogo"]:checked');
    
    if (modoFoiSelecionado) {
        modoSelecionado = modoFoiSelecionado.value;
        jogoIniciado = true;
    } else {
        window.alert("Selecione um modo de jogo antes de iniciar");
    }
}

//Função que possibilita a marcação das células
function clicarCelula(linha, coluna) {
    if (!jogoIniciado) {
        alert("Por favor, inicie o jogo primeiro!");
        return;
    }
    //Modo 1x1
    if(modoSelecionado == "doisJogadores"){

        var celula = document.getElementById('c' + linha + coluna);

        // Verifica se a célula está vazia antes de marcar
        if (celula.innerHTML === '') {
            celula.innerHTML = (jogadorAtual === 'P1') ? 'X' : 'O';

            verificarVitoria();
            // Alternar para o próximo jogador
            jogadorAtual = (jogadorAtual === 'P1') ? 'P2' : 'P1';
            }
        }
    
    //Modo Bot
    else if(modoSelecionado == "ia"){
        var celula = document.getElementById('c' + linha + coluna);
        jogadorAtual = "P1"
    // Verifica se a célula está vazia antes de marcar
    if (celula.innerHTML === '' && jogadorAtual == 'P1') {
        celula.innerHTML = "X";
        verificarVitoria();
        //O bot joga na função jogadaIA
        jogadaIA();
        }
    }
}    

//Função responsável por verificar se um player ganhou ou se ambos players empataram
function verificarVitoria() {
    // Verificar linhas
    for (var i = 0; i < tamanhoTabuleiro; i++) {
        if (verificarCelulas('c' + i + '0', 'c' + i + '1', 'c' + i + '2', 'c' + i + '3',  'c' + i + '4', 'c' + i + '5', 'c' + i + '6' , 'c' + i + '7' , 'c' + i + '8')) {
            alert("Vitória! Jogador " + jogadorAtual + " ganhou!");
            reiniciarJogo();
            return;
        }
    }

     // Verificar colunas
     for (var j = 0; j < tamanhoTabuleiro; j++) {
        if (verificarCelulas('c0' + j, 'c1' + j, 'c2' + j, 'c3' + j,  'c4' + j,  'c5' + j,  'c6' + j,  'c7' + j,  'c8' + j)) {
            alert("Vitória! Jogador " + jogadorAtual + " ganhou!");
            reiniciarJogo();
            return;
        }
    }

    // Verificar diagonais
    if (verificarCelulas('c00', 'c11', 'c22', 'c33', 'c44', 'c55', 'c66' , 'c77', 'c88') || verificarCelulas('c08', 'c17', 'c26', 'c35', 'c44', 'c53', 'c62', 'c71', 'c80')) {
        alert("Vitória! Jogador " + jogadorAtual + " ganhou!");
            reiniciarJogo();
            return;
        }

     // Verificar empate
    if (verificarEmpate()) {
        alert("Empate! O jogo terminou sem vencedor.");
        reiniciarJogo();
        return;
        }
    }

//Retorna True se 4 células estiverem preenchidas e tiveram a mesma letra
function verificarCelulas(idCelula1, idCelula2, idCelula3, idCelula4, idCelula5, idCelula6, idCelula7, idCelula8, idCelula9) {
    var celula1 = document.getElementById(idCelula1).innerHTML;
    var celula2 = document.getElementById(idCelula2).innerHTML;
    var celula3 = document.getElementById(idCelula3).innerHTML;
    var celula4 = document.getElementById(idCelula4).innerHTML;
    var celula5 = document.getElementById(idCelula5).innerHTML;
    var celula6 = document.getElementById(idCelula6).innerHTML;
    var celula7 = document.getElementById(idCelula7).innerHTML;
    var celula8 = document.getElementById(idCelula8).innerHTML;
    var celula9 = document.getElementById(idCelula9).innerHTML;

    return (celula1 !== '' && celula1 === celula2 && celula2 === celula3 && celula3 === celula4 && celula4 === celula5 && celula5 === celula6 && celula6 === celula7 && celula7 === celula8 && celula8 === celula9);
}

//Função responsável por verificar o empate, essa analisa se todas as células foram preenchidas mesmo sem um vencedor, caso sim, empate
function verificarEmpate() {
    for (var i = 0; i < tamanhoTabuleiro; i++) {
        for (var j = 0; j < tamanhoTabuleiro; j++) {
            var celula = document.getElementById('c' + i + j);
            if (celula.innerHTML === '') {
                return false; // Se ainda há células vazias, o jogo não está empatado
            }
        }
    }
    return true; // Todas as células estão preenchidas, o jogo está empatado
}

//Função responsável por reiniciar o Jogo
function reiniciarJogo() {
    // Limpa o conteúdo de todas as células
    for (var i = 0; i < tamanhoTabuleiro; i++) {
        for (var j = 0; j < tamanhoTabuleiro; j++) {
            document.getElementById('c' + i + j).innerHTML = '';
        }
    }
}

setTimeout(function() {}, 2000);

//Função onde o Bot joga, observação, esse função é assincrona pois assim é possível por um await nela, sem o await o bot acaba jogando muito rápido
async function jogadaIA() {
    // Implementa a lógica para a IA jogar (marcar uma posição aleatória vazia)
    var celulasVazias = obterCelulasVazias();
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (celulasVazias.length > 0) {
        var indiceAleatorio = Math.floor(Math.random() * celulasVazias.length);
        var celulaAleatoria = celulasVazias[indiceAleatorio];
        var linha = celulaAleatoria[0];
        var coluna = celulaAleatoria[1];
        
        // Marcar a posição aleatória com 'O'
        document.getElementById('c' + linha + coluna).innerHTML = 'O';

        //Troca de P1 para IA antes da verificação
        jogadorAtual = 'IA';

        // Adicione o código adicional necessário para verificar o estado do jogo
        verificarVitoria();
        //Após verificação volta para P1
        jogadorAtual = 'P1';
    }
}

//Função que retorna vetor com as possição das células vazias
function obterCelulasVazias() {
    var celulasVazias = [];

    for (var i = 0; i < tamanhoTabuleiro; i++) {
        for (var j = 0; j < tamanhoTabuleiro; j++) {
            var celula = document.getElementById('c' + i + j);
            if (celula.innerHTML === '') {
                celulasVazias.push([i, j]);
            }
        }
    }

    return celulasVazias;
}
