var bootState = {
    // Cargar imagen de fondo
    preload: function () {
        game.load.image('sky', 'assets/images/platformer_backdrop.png');
    },

    create: function () {

        // Agregar fondo
        game.add.sprite(0, 0, 'sky');

        var name = game.add.text(80, 80, 'Escapa de los gatos. \nSigue las flechas para \nencontrar la salida.', {
            font: '50px Verdana'
            , fill: '#fff'
        });

        var name = game.add.text(80, game.world.height - 140, 'Presiona la tecla W para jugar', {
            font: '40px Verdana'
            , fill: '#fff'
        });

        var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);

        wKey.onDown.addOnce(this.start, this);
    },

    start: function () {
        // Si se presiono la tecla W, se inicia el juego
        game.state.start('play');
    }
}