const canvas = document.querySelector('#game');//selección de elemento -manipulación del DOM
const game = canvas.getContext('2d');//Crear un contexto para acceder a los métodos para dibujar sobre el canvas/ 2d = dos dimensiones
const btnStart = document.querySelector('#new')
const btnUp = document.querySelector('#up');//elemento seleccionado
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');//crea el texto para imprimir las vidas
const spanTime = document.querySelector('#time');//crea texto del tiempo de juego
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');

let canvasSize;//le asigno el valor del width y el height
let elementsSize;// elementos dentro del canvas
let level = 0;//niveles, arranca en cero por que trabajamos con arrays
let lives = 3;//variable de las vidas

let timeStart;
let timePlayer;
let timeInterval;//


const playerPosition = {//variable = a un objeto /el jugador utiliza playerPosition para saber donde posicionarse
  x: undefined,
  y: undefined,  
};
const giftPosition = { //variable = a un objeto , el regalo que aparece en le juego
  x: undefined,
  y: undefined,
};
let enemyPositions = [];//variable tipo let, permite limpiar el arreglo por cada movimiento

window.addEventListener('load', setCanvasSize);// que se ejecute con el Evento a nuestro html, apenas cargue-envento de 'load' a window
window.addEventListener('resize', setCanvasSize);//evento del navegador, ejecuta la función setCanvasSize


function fixNumber(n) {
  return Number(n.toFixed(2));
}

function setCanvasSize() {
  //window.innerHeight y window.innerWidth = propiedades de window/espacio verdadero del html
  if (window.innerHeight > window.innerWidth) {//si el height es mayor que el width
    canvasSize = window.innerWidth * 0.7;// el canvasSize que sea igual al width
  } else {
    canvasSize = window.innerHeight * 0.7;//si el widht es  el mayor que sea igual al height
  }

  canvasSize = Number(canvasSize.toFixed(0));
  
  canvas.setAttribute('width', canvasSize);//le asigno al canvas un width y un height mediante la variable
  canvas.setAttribute('height', canvasSize);//canvasSize
  
  elementsSize = Number((canvasSize / 10).toFixed(0));//El canvasSize se le asignan 10 columnas

  playerPosition.x = undefined;
  playerPosition.y = undefined;

  //startGame();//llamo a la función startGame
  
}


//Crear una función para inicializar, código que se ejecuta al principio
function startGame() {
  //console.log({ canvasSize, elementsSize });
  // console.log(window.innerWidth, window.innerHeight);

  game.font = elementsSize * 0.9 + 'px Verdana';// Propiedad, se le asignan valores, no se los llaman como métodos
  game.textAlign = 'end';// se le asigna un valor fijo, para emepzar o tenerminar en esa posición
  //game.fillStyle = 'red';

  const map = maps[level];//map = string / .split lo convirte en un arreglo

  if(!map) {//si no hy mas mapas
    gameWin();// ejecuta a la función gameWin-detecta cuando termina el juego
    return;
  }

  if (!timeStart) {//si no existe un timeStart el juego acaba de iniciar
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);//set interval se ejecuta cada 100 milisegundos e imprimi la función showTime 
    showRecord();
  }

  const mapRows = map.trim().split('\n');// mapsRows = filas del mapa -  .trim limpia espacios al principio o al final de un string-.split = inicio y final cuando haya un salto de línea \n (new line)
  const mapRowCols = mapRows.map(row => row.trim().split(''));//función que nos permite crear arreglos a partir  de otros arreglos
  console.log({map, mapRows, mapRowCols});//mapRowCols = las columnas de cada fila de nuestro mapa
  
  showLives();

  enemyPositions = [];
  game.clearRect(0,0, canvasSize, canvasSize);//para borrar todo el canvas

  mapRowCols.forEach((row, rowI) => {//forEach para recorrer un array bidimensional mapRowCols; indicado entre parenteis que serán recorridas las filas
    //recibo dos parámetors , la fila (row)como tal y el índice de c/u de las filas (rowI)
    row.forEach((col, colI) => {//este forEach recorrerá las columnas, cada una de ellas(col) y al índice de c/u de las columnas(colI)
      const emoji = emojis[col];//se obtine la letra de la lista de emojis
      const posX = elementsSize * (colI + 1);//calcúlo la posición de las columnas-+1  por que empieza el índice en 0
      const posY = elementsSize * (rowI + 1);//calcúlo la posición de las filas

      if (col == 'O') {
        if (!playerPosition.x && !playerPosition.y) {// si pP.x y pP.y tienen algun valor no se ejecuta el código de abajo
        playerPosition.x = posX;
        playerPosition.y = posY;
        console.log({playerPosition});
        // console.log({playerPosition});
        }
      } else if (col == 'I') { // si nos encontramos con la I
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if (col == 'X') {// si nos encontramos la X  
        enemyPositions.push({//con el método push estamos mutando un array
            x: posX,
            y: posY,
          });
      }

      game.fillText(emoji, posX, posY);//método para insertar texto   
    });
  });

  movePlayer();//llama a la función, mueve al jugador apenas renderiza el mapa
}

function movePlayer() {
  const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);//si el playerP coincide con el giftP
  const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);//toFixed para controlar la natidad de decimales, se indican entre paréntesis
  const giftCollision = giftCollisionX && giftCollisionY;// va a ser true si ambas condiciones se cumplen

  if (giftCollision) {//si chocó con el regalito entoces sube de nivel
    levelWin();   //sube de nivel
  }

  const enemyCollision = enemyPositions.find(enemy => {//método find= devuelve el elemento que cumple con la condición puesta
    const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyCollisionX && enemyCollisionY;//detecta la colisión con enemigos
  });

  if (enemyCollision) {//detecta colisión con un enemigo
    levelFail();//ejecuta la función levelFail
  }

  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin() {
  console.log('Subiste de nivel');
  level++;//suma uno al nivel
  startGame();
}

function levelFail() {//función para detectar colisiones con enemigos
  console.log('Chocaste contra un enemigo:(');
  lives--;//resta de a una vida por cada choque


  console.log(lives)
  if(lives <= 0) {//si las vidas son menores o iguales a cero
    level = 0;//nivel cero
    lives = 3; //vuelven las tres vidas 
    timeStart = undefined; //¿por qué undefined?
  } 
    playerPosition.x = undefined;//¿por qué undefined?
    playerPosition.y = undefined;//¿por qué undefined?
    startGame(); 
  }

function gameWin() {//función para marcar el final del juego
  console.log('¡Terminaste el juego!');
  clearInterval(timeInterval);  

  const recordTime = localStorage.getItem('record_time');
  const playerTime  = spanTime.innerHTML = (Date.now() - timeStart)/1000;

  if (recordTime) {    
    if (recordTime >= playerTime) {
      localStorage.setItem('record_time', playerTime);
      pResult.innerHTML = 'SUPERASTE EL RECORD 😀';
    } else {
      pResult.innerHTML = 'Lo siento, no superaste el record 😲';      
    }
  } else {
    localStorage.setItem('record_time',playerTime);
    pResult.innerHTML = '¿Primera vez?, pero  ahora trata de superar tu record:)';
  }

  console.log({recordTime, playerTime});
}

function showLives() {//muestra la cantidad de vidas
  const heartsArray = Array(lives).fill(emojis['HEART']); // [1,2,3] creo un Array con posiciones insertadas con .fill le doy un contenido 
  //console.log(heartsArray);

  spanLives.innerHTML = "";//limpia el span ¿?
  heartsArray.forEach(heart => spanLives.append(heart));//cada posicion es un corazón
}

function showTime() {//muestra la cantidad de tiempo de juego
  spanTime.innerHTML = parseInt((Date.now() - timeStart)/1000);//Date.now, funcíon,nos permite imprimir
}

function showRecord() {
  spanRecord.innerHTML = localStorage.getItem('record_time');
}

window.addEventListener('keydown', moveByKeys);//escucha cada vez que una tecla es presionada, keydown es al presionarla. 
btnUp.addEventListener('click', moveUp);//escucha el evento de presionar una tecla, un addEventListener por cada direccion de movimiento
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

btnStart.addEventListener('click', newGame);

function moveByKeys(event) {//función que se ejecuta la presionar cualquier tecla
  if (event.key == 'ArrowUp') moveUp();//con el condicional if preguntamos:  si el event.key es igual a ArrowUp ejecutamos la función moveUp 
  else if (event.key == 'ArrowLeft') moveLeft();
  else if (event.key == 'ArrowRight') moveRight();
  else if (event.key == 'ArrowDown') moveDown();
}
function moveUp() {
  console.log('Me quiero mover hacia arriba');
  
  if ((playerPosition.y - elementsSize) < elementsSize) {//resta para subir sobre el eje y
      console.log('OUT');
  } else {
    playerPosition.y -= elementsSize;
    startGame();//la función startGame se ejecuta por cada movimiento
  }
}
function moveLeft() {
  console.log('Me quiero mover hacia izquierda');

  if ((playerPosition.x - elementsSize) < elementsSize) {//resta para ir a la izquierda
    console.log('OUT');
  } else {
    playerPosition.x -= elementsSize;
    startGame();//la función startGame se ejecuta por cada movimiento
  }
}

function moveRight() {
  console.log('Me quiero mover hacia derecha');
  
  if ((playerPosition.x + elementsSize) > canvasSize) {//suma para moverse en el eje x a la derecha y valida contra si es mayor al canvasSize
    console.log('OUT');
  } else {
    playerPosition.x += elementsSize;
    startGame();//la función startGame se ejecuta por cada movimiento
  }
}

function moveDown() {
  console.log('Me quiero mover hacia abajo');
  
  if ((playerPosition.y + elementsSize) > canvasSize) {//suma para moverse en el eje y
    console.log('OUT');
  } else {
    playerPosition.y += elementsSize;
    startGame();//la función startGame se ejecuta por cada movimiento
        }
}

function newGame(){
  level=0;
  lives=3;
  clearInterval( timeInterval )
  timeStart = undefined
  playerTime = undefined
  playerPosition.x = undefined
  playerPosition.y = undefined  
  startGame();
}

    

