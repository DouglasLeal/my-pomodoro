const display = document.getElementById('display');
const menu = document.getElementById('menu');

const inputPomodoro = document.getElementById('pomodoro');
const inputPausaCurta = document.getElementById('pausaCurta');
const inputPausaLonga = document.getElementById('pausaLonga');

const btnMenu = document.getElementById('btnMenu');
const btnSalvar = document.getElementById('btnSalvar');
const btnIniciar = document.getElementById('btnIniciar');
const btnParar = document.getElementById('btnParar');
const btnContinuar = document.getElementById('btnContinuar');
const btnReiniciar = document.getElementById('btnReiniciar');
//------------------------------

let tempoPomodoro = null;
let tempoPausaCurta = null;
let tempoPausaLonga = null;

let segundos = 0;
let minutos = 0;

let contador = null;

let descanso = false;
let quantidadePausasCurtas = 0;


//------------------------------
function alterarTempos(){
    tempoPomodoro = inputPomodoro.value;
    tempoPausaCurta = inputPausaCurta.value;
    tempoPausaLonga = inputPausaLonga.value;
    reiniciar();
}

function prepararPomodoro() {
    minutos = tempoPomodoro;
}

function prepararPausaCurta() {
    minutos = tempoPausaCurta;
}

function prepararPausaLonga() {
    minutos = tempoPausaLonga;
}

function atualizarDisplay() {
    let s = `${segundos}`.padStart(2, "0");
    let m = `${minutos}`.padStart(2, "0");
    display.innerText = `${m}:${s}`;
}

function pararContador(){
    clearInterval(contador);
}

function contar() {
    if (segundos > 0) {
        segundos--;
    } else {
        if (minutos > 0) {
            minutos--;
            segundos = 59;
        }else{
            pararContador();
            btnParar.classList.add('d-none');
            btnIniciar.classList.remove('d-none');
            
            descanso = !descanso;
            if(descanso && quantidadePausasCurtas < 3){
                quantidadePausasCurtas++;
                prepararPausaCurta();
            }else if(descanso && quantidadePausasCurtas == 3){
                quantidadePausasCurtas = 0;
                prepararPausaLonga();
            }else{
                prepararPomodoro();
            }
        }
    }
    atualizarDisplay();
}

function iniciar() {
    btnIniciar.classList.add('d-none');
    btnContinuar.classList.add('d-none');
    btnReiniciar.classList.add('d-none');
    btnParar.classList.remove('d-none');

    contador = setInterval(()=>{
        contar();
    }, 1000)
}

function parar() {
    btnParar.classList.add('d-none');
    btnContinuar.classList.remove('d-none');
    btnReiniciar.classList.remove('d-none');
    pararContador();
}

function reiniciar(){
    btnIniciar.classList.remove('d-none');
    btnParar.classList.add('d-none');
    btnReiniciar.classList.add('d-none');
    btnContinuar.classList.add('d-none');

    descanso = false;
    segundos = 0;
    quantidadePausasCurtas=0;
    pararContador();
    prepararPomodoro();
    atualizarDisplay();   
}

btnIniciar.onclick = () => iniciar();
btnContinuar.onclick = () => iniciar();
btnParar.onclick = () => parar();
btnReiniciar.onclick = () => reiniciar();
btnSalvar.onclick = () => alterarTempos();
btnMenu.onclick = () => {
    menu.classList.toggle('show-menu');
    btnMenu.classList.toggle('show-menu');
}

//------------------------------
alterarTempos();
prepararPomodoro();
atualizarDisplay();