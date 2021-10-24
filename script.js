const dino = document.querySelector('.dino');
const background = document.querySelector(".background");
const btn = document.querySelector('.new-game');
let position = 0;
let isJumping = false;

//Início interações do Dino

//keycode.info é um site que nos mostra qual o código de uma tecla
//A "barra de espaço" corresponde ao número 32
function handleKeyUp(event){
    if (event.keyCode === 32){
        if(!isJumping){
            jump();
        }
    }
}

function jump() {

    isJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 150){
            clearInterval(upInterval)

            //descendo
            let downInterval = setInterval(() =>{
                if(position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                }else{
                    position -= 20;
                    dino.style.bottom = position +'px'
                }

            },20)
        }else{
            //subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }

    }, 20);
}
//Fim interações com Dino

//Início interação Cactus
function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {

        if(cactusPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){
            //game over
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1> <button class="new-game" onClick="window.location.reload();">Jogar Novamente</button>'
        }else{
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    },20)

    setTimeout(createCactus, randomTime)
}

createCactus();
//Fim interação Cactus

document.addEventListener('keydown',handleKeyUp);
