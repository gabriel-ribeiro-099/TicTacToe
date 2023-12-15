function iniciarJogo() {

    var tamanhoSelecionado = document.getElementById("tamanhoTabuleiro").value;
    
    switch (tamanhoSelecionado) {
        case "3x3": window.location.href = "3x3.html"; break;
        case "4x4": window.location.href = "4x4.html"; break;
        case "5x5": window.location.href = "5x5.html"; break;
        case "6x6": window.location.href = "6x6.html"; break;
        case "7x7": window.location.href = "7x7.html"; break;
        case "8x8": window.location.href = "8x8.html"; break;
        case "9x9": window.location.href = "9x9.html"; break;
        case "10x10": window.location.href = "10x10.html"; break;

        default:
            console.log("Tamanho não suportado");
            break;
    }
    
}