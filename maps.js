/*
*Reglas: 
*El final de cada nivel debe ser el comienzo del siguiente
*/

const emojis = {
  '-': ' ',
  'O': '🚪',
  'X': '💣',
  'I': '🎁',
  'PLAYER': '😈',
  'BOMB_COLLISION': '🔥',
  'GAME_OVER': '👎',
  'WIN': '🏆',
  'HEART':'💗',
};

const maps = [];
maps.push(`
  IXXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  OXXXXXXXXX
`);
maps.push(`
  O--XXXXXXX
  X--XXXXXXX
  XX----XXXX
  X--XX-XXXX
  X-XXX--XXX
  X-XXXX-XXX
  XX--XX--XX
  XX--XXX-XX
  XXXX---IXX
  XXXXXXXXXX
  `);
maps.push(`
  I-----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX-----XXX
  XXXXXX-XXX
  XX-----XXX
  XX-XXXXXXX
  XX-----OXX
  XXXXXXXXXX
`);
maps.push(`
  O-----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX-----XXX
  XXXXXX-XXX
  XX---X-XXX
  XX-X---XXX
  XX-----XXX
  XI--XXXXXX      
`);
maps.push(`
  XXXXXXX---
  XX----X-X-
  XX-XXX--X-
  XX-----XX-
  XX---X-XI-
  XX-X---XXX
  XX--X--XXX
  XXX-------
  X---XX-XXX 
  XO-----XXX 
`);
maps.push(`
  XX---X-I-X
  XX-X---X-X
  XX--X-X--X
  XX-XXX--XX
  XX----XXO-
  ---X-X-X--
  -X--X----X
  ---X---X-X
  X-XXX-XXXX
  X-----XXXX  
`);
maps.push(`
  XX---X-OXX
  XX-X---X-X
  XX--X-X--I
  ---XXX--X-
  -XX---XXX-
  ---X-X-X--
  -X--X-XX-X
  X--X---X-X
  X-XX-X-X-X
  X----X---X  
`);
/**maps.push(`
  XX---X-O-XXXXXX
  XX-X---X-XXXXXX
  XX--X-X--XXXXXX
  XX-XXX--XXXXXXX
  XX----X-XXXXXXX
  ---X-X-X-------
  -X--X----XXXX--
  ---X---X-X----X
  X-XXX-XXXXXXXXX
  X-----XXXX-----
  XXXXXXXXXXXXXXX
  XXXXXXXXXXXXXXX
  XXXXXXXXXXXXXXX
  XXXXXXXXXXXXXXX
  XXXXXXXXXXXXXXX  
`);*/
