const dino = document.querySelector('.dino');
const fundo = document.querySelector('.fundo');
const pontuacao = document.querySelector('.pontuacao');
let pulando = false;
let posicaoDino = 0;
let tamanhoObjetos = 100;
let fimTela = document.body.clientWidth;
let pontos = 0;

function comandarPulo(event) {
    if (event.keyCode === 32) {
        if (!pulando) {
            pulando = true;

            pular();
        }
    }
}

function pular() {
    let subindo = setInterval(() => {
        if (posicaoDino >= 300) {
            clearInterval(subindo);

            let descendo = setInterval(() => {
                if (posicaoDino <= 0) {
                    clearInterval(descendo);

                    pulando = false;
                } else {
                    posicaoDino -= 20;
                    dino.style.bottom = posicaoDino + 'px';
                }
            }, 20);
        } else {
            posicaoDino += 20;
            dino.style.bottom = posicaoDino + 'px';
        }
    }, 20);
}

function criarCacto() {
    const cacto = document.createElement('div');
    let posicaoCacto = fimTela;
    let tempoAleatorio = Math.random() * 6000;

    cacto.classList.add('cacto');
    cacto.style.left = posicaoCacto + 'px';

    fundo.appendChild(cacto);

    let aproximando = setInterval(() => {
        if (posicaoCacto < -tamanhoObjetos) {
            clearInterval(aproximando);

            fundo.removeChild(cacto);

            pontos++;
            pontuacao.innerHTML = pontos;    
        } else if (posicaoCacto > 0 && posicaoCacto < tamanhoObjetos && posicaoDino < tamanhoObjetos) {
            clearInterval(aproximando);
            
            document.body.innerHTML = `<h1 class="fim-de-jogo">Fim de Jogo, sua pontuação foi ${pontos} ponto${pontos > 1 ? 's' : ''}.</h1>`;
            document.body.innerHTML += `<button class="reiniciar" onclick="window.location.reload();">Reiniciar</button>`;
        } else {
            posicaoCacto -= 10;
            cacto.style.left = posicaoCacto + 'px';
        }
    }, 20);

    setTimeout(criarCacto, tempoAleatorio);
}

criarCacto();

document.addEventListener('keyup', comandarPulo);