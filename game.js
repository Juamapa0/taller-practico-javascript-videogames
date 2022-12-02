const canvas = document.querySelector('#game');//selección de elemento -manipulación del DOM
const game = canvas.getContext('2d');//Crear un contexto para acceder a los métodos para dibujar sobre el canvas/ 2d = dos dimensiones
const btnStart = document.querySelector('#new')
const btnUp = document.querySelector('#up');//elemento seleccionado
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');

let canvasSize;//le asigno el valor del width y el height
let elementsSize;// elementos dentro del canvas
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;


const playerPosition = {
  x: undefined,
  y: undefined,  
};
const giftPosition = {
  x: undefined,
  y: undefined,
};
let enemyPositions = [];

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

  if(!map) {
    gameWin();
    return;
  }

  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);
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
        if (!playerPosition.x && !playerPosition.y) {
        playerPosition.x = posX;
        playerPosition.y = posY;
        console.log({playerPosition});
        // console.log({playerPosition});
        }
      } else if (col == 'I') {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if (col == 'X') {
        enemyPositions.push({
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
  const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
  const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
  const giftCollision = giftCollisionX && giftCollisionY;

  if (giftCollision) {
    levelWin();   
  }

  const enemyCollision = enemyPositions.find(enemy => {
    const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyCollisionX && enemyCollisionY;
  });

  if (enemyCollision) {
    levelFail();
  }

  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin() {
  console.log('Subiste de nivel');
  level++;
  startGame();
}

function levelFail() {
  console.log('Chocaste contra un enemigo:(');
  lives--;


  console.log(lives)
  if(lives <= 0) {
    level = 0;
    lives = 3;  
    timeStart = undefined; 
  } 
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame(); 
  }

function gameWin() {
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

function showLives() {
  const heartsArray = Array(lives).fill(emojis['HEART']); // [1,2,3]
  //console.log(heartsArray);

  spanLives.innerHTML = "";
  heartsArray.forEach(heart => spanLives.append(heart));
}

function showTime() {
  spanTime.innerHTML = parseInt((Date.now() - timeStart)/1000);
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
  
  if ((playerPosition.y - elementsSize) < elementsSize) {
      console.log('OUT');
  } else {
    playerPosition.y -= elementsSize;
    startGame();//la función startGame se ejecuta por cada movimiento
  }
}
function moveLeft() {
  console.log('Me quiero mover hacia izquierda');

  if ((playerPosition.x - elementsSize) < elementsSize) {
    console.log('OUT');
  } else {
    playerPosition.x -= elementsSize;
    startGame();//la función startGame se ejecuta por cada movimiento
  }
}

function moveRight() {
  console.log('Me quiero mover hacia derecha');
  
  if ((playerPosition.x + elementsSize) > canvasSize) {
    console.log('OUT');
  } else {
    playerPosition.x += elementsSize;
    startGame();//la función startGame se ejecuta por cada movimiento
  }
}

function moveDown() {
  console.log('Me quiero mover hacia abajo');
  
  if ((playerPosition.y + elementsSize) > canvasSize) {
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

    

