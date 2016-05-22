var winState = {
    // Cargar imagen de fondo
    preload: function () {
        game.load.image('sky', 'assets/images/platformer_backdrop.png');
    },

    create: function () {

        // Agregar fondo
        game.add.sprite(0, 0, 'sky');

        var name = game.add.text(60, 80, 'Has llegado a la puerta magica. \n\nSi quieres escapar de nuevo, \npresiona la tecla W para jugar.', {
            font: '40px Verdana'
            , fill: '#fff'
        });

        var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);

        wKey.onDown.addOnce(this.start, this);
    },

    start: function () {
        game.state.start('play');
    }
}