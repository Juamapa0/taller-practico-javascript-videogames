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
/**maps.push(`
  X-----XXXX
  XIXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX-----XXX
  XXXXXX-XXX
  XX---X-XXX
  XX-X---XXX
  XX-----XXX
  O---XXXXXX
  XIXXX-XXXX    
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
  O---XX-XXX 
  XX-----XXX 
`);
/**maps.push(`
  XXXXXXI--X
  XXXXX-XX-X
  XX----X--X
  XX-XXX--XX
  XXX---X-XX
  ---X-X-X-X
  -X--X----X
  ---X-----X
  XXXXX-XXXX
  O-----XXXX  
`);*/
