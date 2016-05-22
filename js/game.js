// Variables usadas en el juego
var map;
var layer;
var cursors;
var player;
var catDown;
var catCenter;
var catUp;

var playState = {

    // Carga las imagenes del juego
    preload: function() {

        game.load.tilemap('map', 'assets/maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/images/tiles.png', 70, 70);
        game.load.image('sky', 'assets/images/background.png');
        game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
        game.load.spritesheet('cat', 'assets/images/baddie.png', 32, 32);

    },

    // Ubica los objetos y crea el juego
    create: function() {

        // Usar fisica en el juego
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Fondo del juego
        game.add.sprite(0, 0, 'sky');

        // Mapa del juego
        map = game.add.tilemap('map');

        // Agregar las baldosas al juego
        map.addTilesetImage('world-tiles', 'tiles');

        // Crear capa de baldosas
        layer = map.createLayer('World1');

        // Ajustar el mapa al tamano del lienzo
        layer.resizeWorld();

        // Asignar las baldosas que colapsaran con el personaje    
        map.setCollisionBetween(0, 52);
        map.setCollisionBetween(57, 110);
        map.setCollisionBetween(115, 149);

        // Crear el personaje
        player = game.add.sprite(70, 1000, 'dude');

        // Permite que el personaje salte
        game.physics.enable(player);

        // La separacion entre el personaje y las baldosas
        player.body.tilePadding.set(32);

        //  Animaciones para caminar a la izquierda y la derecha
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);    

        // Ubica los gatos en el mapa
        this.createCats();

        // Hacer que la camara siga al personaje
        game.camera.follow(player);

        // Asignar gravedad al personaje
        game.physics.arcade.gravity.y = 200;

        // Habilitar las flechas en el teclado
        cursors = game.input.keyboard.createCursorKeys();

    },

    createCats: function(){

        // Plataforma baja
        catDown = game.add.sprite(490, 890, 'cat');
        // Habilitar fisica en el gato
        game.physics.enable(catDown);
        catDown.body.gravity.y = 300;

        //  Animaciones para caminar a la izquierda y la derecha
        catDown.animations.add('left', [0, 1], 4, true);
        catDown.animations.add('right', [2, 3], 4, true);    


        // Plataforma centro
        catCenter = game.add.sprite(750, 620, 'cat');
        // Habilitar fisica en el gato
        game.physics.enable(catCenter);
        catCenter.body.gravity.y = 300;

        //  Animaciones para caminar a la izquierda y la derecha
        catCenter.animations.add('left', [0, 1], 4, true);
        catCenter.animations.add('right', [2, 3], 4, true);    


        // Plataforma alta
        catUp = game.add.sprite(70, 420, 'cat');
        // Habilitar fisica en el gato
        game.physics.enable(catUp);
        catUp.body.gravity.y = 300;

        //  Animaciones para caminar a la izquierda y la derecha
        catUp.animations.add('left', [0, 1], 4, true);
        catUp.animations.add('right', [2, 3], 4, true);
    },

    // Se ejecuta en cada movimiento del juego
    update: function() {

        // Hacer que el personaje colisione con el mapa
        game.physics.arcade.collide(player, layer);

        // Hacer que los gatos colisionen con el mapa
        game.physics.arcade.collide(catDown, layer);
        game.physics.arcade.collide(catCenter, layer);
        game.physics.arcade.collide(catUp, layer);

        // Ver si el personaje se sobrepone con un gato
        game.physics.arcade.overlap(player, catDown, this.loose, null, this);  
        game.physics.arcade.overlap(player, catCenter, this.loose, null, this);  
        game.physics.arcade.overlap(player, catUp, this.loose, null, this);

        // Realizar los movimientos del personaje
        this.playerMovements();

        // Realizar los movimientos de los gatos
        this.catsMovements();

    },

    // Movimientos del jugador
    playerMovements: function(){

        // Velocidad inicial del personaje
        player.body.velocity.x = 0;

        // Si se presiona la flecha izquierda
        if (cursors.left.isDown){
            // Se mueve a la izquierda
            player.body.velocity.x = -150;
            player.animations.play('left');
        }
        else if (cursors.right.isDown){ //Si se presiona la flecha derecha
            // Se mueve a la derecha
            player.body.velocity.x = 150;
            player.animations.play('right');
        }
        else{
            // Se queda quieto
            player.animations.stop();
            player.frame = 4;
        }

        // Si esta tocando el suelo, se puede saltar
        if (cursors.up.isDown && player.body.onFloor()){
            player.body.velocity.y = -350;
        }

        // Si esta ubicado en la salida, gana
        if( player.body.x >= 1050 && player.body.y == 162 ){
            game.state.start('win');
        }
    },

    // Movimientos de los gatos
    catsMovements: function(){    

        // Movimiento del gato, plataforma baja
        if( catDown.body.x >= 790 ){
            catDown.body.velocity.x = -150;
            catDown.animations.play('left');
        }

        if( catDown.body.x <= 500 ){
            catDown.body.velocity.x = 150;
            catDown.animations.play('right');
        }

        // Movimiento del gato, plataforma central
        if( catCenter.body.x >= 720 ){
            catCenter.body.velocity.x = -150;
            catCenter.animations.play('left');
        }

        if( catCenter.body.x <= 430 ){
            catCenter.body.velocity.x = 150;
            catCenter.animations.play('right');
        }

        // Movimiento del gato, plataforma alta
        if( catUp.body.x >= 390 ){
            catUp.body.velocity.x = -150;
            catUp.animations.play('left');
        }

        if( catUp.body.x <= 80 ){
            catUp.body.velocity.x = 150;
            catUp.animations.play('right');
        }
    },

    // Cuando el jugador pierde
    loose: function(){
        game.state.start('loose');
    }

}