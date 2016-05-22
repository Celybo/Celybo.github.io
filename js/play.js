// Se crea el lienzo donde se carga el juego
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

// Se crean los estados del juego
game.state.add('boot', bootState);
game.state.add('play', playState);
game.state.add('win', winState);
game.state.add('loose', looseState);

// Se llama al primer estado
game.state.start('boot');