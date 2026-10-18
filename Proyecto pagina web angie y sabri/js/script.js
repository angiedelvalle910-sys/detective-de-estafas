/*==================================================
DETECTIVE DE ESTAFAS
Cyber Security Interactive Engine

SCRIPT.JS - PARTE 3A

Funciones:
- Inicialización AOS
- Cursor Glow
- Scroll inteligente
- Botones interactivos
- Sistema de sonido
- Variables principales
==================================================*/


//==============================
// INICIALIZAR ANIMACIONES AOS
//==============================


AOS.init({

duration:1200,

once:true,

offset:120

});



//==============================
// CURSOR GLOW FUTURISTA
//==============================


const cursorGlow = document.querySelector(".cursor-glow");


document.addEventListener(

"mousemove",

(event)=>{


cursorGlow.style.left =

event.clientX + "px";


cursorGlow.style.top =

event.clientY + "px";


}

);



//==============================
// EFECTO EXTRA AL HACER CLICK
//==============================


document.addEventListener(

"click",

()=>{


cursorGlow.style.transform =
"scale(2)";


setTimeout(()=>{


cursorGlow.style.transform =
"scale(1)";


},150);


}

);




//==============================
// BOTON HERO HACIA ESCANER
//==============================


const scrollScanner = document.getElementById(
"scrollScanner"
);


if(scrollScanner){


scrollScanner.addEventListener(

"click",

()=>{


document
.getElementById("scanner")
.scrollIntoView({

behavior:"smooth"

});


}

);


}




//==============================
// SISTEMA DE SONIDO DIGITAL
// WEB AUDIO API
//==============================


function playSound(
frequency = 440,
duration = 0.15
){


const audioContext =

new(
window.AudioContext ||
window.webkitAudioContext
);



const oscillator =

audioContext.createOscillator();



const gainNode =

audioContext.createGain();



oscillator.type="sine";


oscillator.frequency.value =
frequency;


gainNode.gain.value=.05;



oscillator.connect(
gainNode
);


gainNode.connect(
audioContext.destination
);



oscillator.start();



setTimeout(()=>{


oscillator.stop();


},

duration*1000);



}




//==============================
// BOTONES CON EFECTOS SONOROS
//==============================


const buttons =
document.querySelectorAll(
"button"
);



buttons.forEach(

button=>{


button.addEventListener(

"mouseenter",

()=>{


playSound(
620,
0.08
);


}

);



button.addEventListener(

"click",

()=>{


playSound(
850,
0.12
);


}

);


}

);




//==============================
// EFECTO PARALLAX HERO
//==============================


const heroImage =
document.querySelector(
".glass-card"
);



document.addEventListener(

"mousemove",

(e)=>{


if(!heroImage)
return;



const x =
(e.clientX / window.innerWidth - .5)
*20;



const y =
(e.clientY / window.innerHeight - .5)
*20;



heroImage.style.transform =

`
translateY(-10px)
rotateY(${x}deg)
rotateX(${-y}deg)
`;



}

);




//==============================
// RESET PARALLAX
//==============================


document.addEventListener(

"mouseleave",

()=>{


if(heroImage){

heroImage.style.transform=

"translateY(0)";


}


}

);



//==============================
// VARIABLES DEL ESCANER
//==============================


const scanButton =
document.getElementById(
"scanButton"
);


const scannerInput =
document.getElementById(
"scannerInput"
);


const terminalText =
document.getElementById(
"terminalText"
);


const resultCard =
document.getElementById(
"resultCard"
);


const resultMessage =
document.getElementById(
"resultMessage"
);



//==============================
// MENSAJES DE TERMINAL
//==============================


const scanLines = [


"[SYSTEM] Inicializando Cyber Radar...",


"[SECURITY] Conectando con base de datos...",


"[AI] Analizando patrones sospechosos...",


"[NETWORK] Revisando reputación del dominio...",


"[ENGINE] Detectando amenazas digitales...",


"[AI] Generando informe de seguridad...",


"[SYSTEM] Análisis completado."


];



//==============================
// FUNCIÓN ESCRITURA TERMINAL
//==============================


function typeTerminalText(
text,
speed=25
){


return new Promise(

(resolve)=>{


let index=0;


const interval=setInterval(()=>{


terminalText.textContent +=

text[index];


index++;



if(index>=text.length){


clearInterval(interval);


resolve();


}



},speed);



}

);


}
/*==================================================
ESCANER CYBER RADAR
PARTE 3B

Motor principal de análisis
==================================================*/


let scanning = false;



//==============================
// FUNCION LIMPIAR TERMINAL
//==============================


function clearTerminal(){

terminalText.textContent="";

}



//==============================
// FUNCION PAUSA
//==============================


function wait(time){

return new Promise(

resolve=>{

setTimeout(resolve,time);

}

);

}



//==============================
// GENERADOR DE ANALISIS
//==============================


function generateAnalysis(){


const text =

scannerInput.value
.trim()
.toLowerCase();



if(text.includes("free") ||
text.includes("ganaste") ||
text.includes("premio") ||
text.includes("password") ||
text.includes("login") ||
text.includes("verify")){


return "danger";


}



if(text.includes("http") ||
text.includes("correo") ||
text.includes("email") ||
text.includes("mensaje")){


return "warning";


}



return "safe";


}



//==============================
// CONFIGURACION DE RESULTADOS
//==============================


const results = {


safe:{


title:"🟢 SITIO SEGURO",


message:

"No encontramos patrones peligrosos. El contenido parece confiable.",


className:"safe"



},



warning:{


title:"🟠 ACTIVIDAD SOSPECHOSA",


message:

"Detectamos señales que podrían indicar un intento de fraude. Se recomienda precaución.",


className:"warning"



},



danger:{


title:"🔴 PELIGRO DETECTADO",


message:

"Se encontraron patrones relacionados con posibles estafas digitales.",


className:"danger"



}



};




//==============================
// ANIMACION DE ESCANEO
//==============================


async function startScanner(){


if(scanning)
return;



scanning=true;



if(scannerInput.value.trim()===""){


resultCard.className=
"result-card danger";


resultMessage.textContent=

"⚠️ Ingresa un enlace o texto para analizar";


playSound(
300,
0.2
);



scanning=false;


return;


}




scanButton.classList.add(
"loading"
);


scanButton.innerHTML=

`
<i class="fa-solid fa-spinner fa-spin"></i>

Analizando...
`;



resultCard.className=
"result-card";



resultMessage.textContent=

"Procesando información...";



clearTerminal();



playSound(
700,
0.15
);



// agregar línea visual de escaneo


const scanLine =
document.createElement(
"div"
);


scanLine.className=
"scan-line";


document
.querySelector(".scanner-box")
.appendChild(
scanLine
);




// escribir consola


for(
let line of scanLines
){


await typeTerminalText(

line+"\n",

20

);



await wait(250);



}



// barra simulada


await typeTerminalText(

"\n[AI] Calculando nivel de riesgo...\n",

25

);



await wait(1000);



await typeTerminalText(

"[SYSTEM] Veredicto generado.\n",

25

);



await wait(500);




// obtener resultado


const analysis =
generateAnalysis();



showResult(
analysis
);




// eliminar linea radar


scanLine.remove();



scanButton.classList.remove(
"loading"
);



scanButton.innerHTML=

`
<i class="fa-solid fa-radar"></i>

Iniciar Análisis
`;



scanning=false;


}





//==============================
// MOSTRAR RESULTADO
//==============================


function showResult(type){


const data =
results[type];



resultCard.className=

"result-card " +
data.className;



resultMessage.innerHTML=

`
<h3>${data.title}</h3>

<p>${data.message}</p>

`;



resultCard.animate(

[

{

transform:"scale(.9)",

opacity:0

},


{

transform:"scale(1)",

opacity:1

}

],

{

duration:600,

easing:"ease-out"

}

);



if(type==="safe"){


playSound(
900,
0.3
);


}



if(type==="warning"){


playSound(
500,
0.3
);


}



if(type==="danger"){


playSound(
220,
0.5
);


}



}




//==============================
// EVENTO BOTON ESCANEAR
//==============================


if(scanButton){


scanButton.addEventListener(

"click",

()=>{


startScanner();



}

);


}
/*==================================================
DETECTIVE DE ESTAFAS

SCRIPT.JS - PARTE 3C FINAL

Efectos visuales finales
==================================================*/


//==============================
// PARTICULAS CYBERPUNK
//==============================


function createParticles(){


const amount = 35;



for(
let i=0;
i<amount;
i++
){


const particle =
document.createElement(
"span"
);



particle.className=
"particle";



particle.style.left =

Math.random()*100+"%";



particle.style.top =

Math.random()*100+"%";



particle.style.animationDuration =

(5+Math.random()*10)+"s";



particle.style.animationDelay =

Math.random()*5+"s";



document
.body
.appendChild(
particle
);



}



}


createParticles();




//==============================
// TITULO DINAMICO
//==============================


const heroTitle =
document.querySelector(
".hero h1"
);



if(heroTitle){


heroTitle.style.animation=

"neon 4s infinite";



}




//==============================
// CONTADORES ANIMADOS
//==============================


const counters =
document.querySelectorAll(
".stats h3"
);



function animateCounter(
element
){


const text =
element.textContent;



let target;



if(text.includes("%")){

target=98;

}

else if(text.includes("K")){

target=25;

}

else{

target=24;

}



let current=0;



const interval=setInterval(()=>{


current++;



if(text.includes("%")){


element.textContent=
current+"%";


}



else if(text.includes("K")){


element.textContent=
current+"K";


}



else{


element.textContent=
current+"/7";


}



if(current>=target){


clearInterval(interval);


}



},35);



}



const observer =
new IntersectionObserver(

(entries)=>{


entries.forEach(

entry=>{


if(entry.isIntersecting){


animateCounter(
entry.target
);


observer.unobserve(
entry.target
);


}


}

);


},

{

threshold:.5

}

);



counters.forEach(

counter=>{


observer.observe(
counter
);


}

);





//==============================
// REPORTE FUTURISTA
//==============================


const reportForm =
document.querySelector(
".report-form"
);



if(reportForm){



reportForm.addEventListener(

"submit",

(event)=>{


event.preventDefault();



playSound(
1000,
0.2
);



createNotification(

"Reporte enviado correctamente. Nuestro sistema analizará la información."

);



reportForm.reset();



}

);


}





//==============================
// NOTIFICACION HUD
//==============================


function createNotification(
message
){



const notification =
document.createElement(
"div"
);



notification.className=
"cyber-notification";



notification.innerHTML=

`

<i class="fa-solid fa-shield-halved"></i>

<span>${message}</span>

`;



document
.body
.appendChild(
notification
);



setTimeout(()=>{


notification.classList.add(
"show"
);



},100);



setTimeout(()=>{


notification.classList.remove(
"show"
);



setTimeout(()=>{


notification.remove();



},500);



},4000);



}





//==============================
// EFECTO HOVER TARJETAS
//==============================


const cards =
document.querySelectorAll(
".card"
);



cards.forEach(

card=>{


card.addEventListener(

"mousemove",

(event)=>{


const rect =
card.getBoundingClientRect();



const x =
event.clientX -
rect.left;



const y =
event.clientY -
rect.top;



const centerX =
rect.width/2;



const centerY =
rect.height/2;



const rotateX =
(y-centerY)/20;



const rotateY =
(centerX-x)/20;



card.style.transform=

`

perspective(800px)

rotateX(${rotateX}deg)

rotateY(${rotateY}deg)

translateY(-10px)

`;



}

);



card.addEventListener(

"mouseleave",

()=>{


card.style.transform=

"translateY(0)";


}

);



});




//==============================
// DETECCION DE SCROLL
//==============================


window.addEventListener(

"scroll",

()=>{


const header =
document.querySelector(
"header"
);



if(window.scrollY>50){


header.style.background=

"rgba(5,7,15,.85)";


}

else{


header.style.background=

"rgba(10,10,20,.45)";


}



}

);




//==============================
// MENSAJE DE INICIO
//==============================


window.addEventListener(

"load",

()=>{


setTimeout(()=>{


createNotification(

"Cyber Radar conectado. Sistema listo."

);



},1500);



});