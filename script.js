var BLOCK_WIDTH = 56;
var BLOCK_HEIGHT = 64;
var BLOCK_BACKGROUND = "TEMPLATE.GIF";
var BLOCK_TYPE_COUNT = 7;

var SCREEN_WIDTH = 1280 * 3;
var SCREEN_HEIGHT = 720 * 4;
var WORLD_CENTER_X = SCREEN_WIDTH * 0.5;
var WORLD_CENTER_Y = SCREEN_HEIGHT * 0.5;

var BLOCKS = [];
var BLOCKS_X = 64;
var BLOCKS_Y = 64;
var BLOCKS_Z = 64;

var Block = function() {
    var div = document.createElement( "DIV" );

    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.width = BLOCK_WIDTH;
    this.height = BLOCK_HEIGHT;

    div.style.position = "absolute";
    div.style.display = "block";
    div.style.width = this.width + "px";
    div.style.height = this.height + "px";
    div.style.backgroundImage = "url(" + BLOCK_BACKGROUND + ")";
    document.body.appendChild( div );

    this.div = div;

    this.SetBlock = function( index ) {
        if ( index < 0 ) {
            index = 0;
        } else if ( index >= BLOCK_TYPE_COUNT ) {
            index = BLOCK_TYPE_COUNT - 1;
        }
        this.div.style.backgroundPosition = ( -index * this.width ) + "px 0px";
    };

    this.SetPosition = function( x, y, z ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.div.style.left = ( WORLD_CENTER_X + ( x - y ) * this.width * 0.5 ) + "px";
        this.div.style.top = ( WORLD_CENTER_Y + ( x + y - 2 * z ) * this.height * 0.25 ) + "px";
        this.div.style.zIndex = x + y + z;
    };
};

var Start = function() {
    BLOCKS = new Array( BLOCKS_X * BLOCKS_Y * BLOCKS_Z );
    for ( var z = 0, i = 0; z < BLOCKS_Z; z++ ) {
        for ( var y = 0; y < BLOCKS_Y; y++ ) {
            for ( var x = 0; x < BLOCKS_X; x++ ) {
                var newBlock = new Block();
                newBlock.SetBlock( 0 );
                newBlock.SetPosition( x, y, z );
                BLOCKS[ i ] = newBlock;
                i++;
            }
        }
    }

    for ( var z = 0; z < BLOCKS_Z; z++ ) {
        for ( var y = 0; y < BLOCKS_Y; y++ ) {
            for ( var x = 0; x < BLOCKS_X; x++ ) {
                var dx = x - BLOCKS_X * 0.5;
                var dy = y - BLOCKS_Y * 0.5;
                var dz = z - BLOCKS_Z * 0.5;
                var sr = ( BLOCKS_X + BLOCKS_Y + BLOCKS_Z ) / 3 * 0.5;
                var distance = Math.sqrt( dx * dx + dy * dy + dz * dz );
                SetBlock( x, y, z, ( distance < sr ? 1 + Math.random() * 6 >> 0 : 0 ) );
            }
        }
    }
};

var SetBlock = function( x, y, z, i ) {
    if ( x < 0 || y < 0 || z < 0 || x >= BLOCKS_X || y >= BLOCKS_Y || z >= BLOCKS_Z || i < 0 || i >= BLOCK_TYPE_COUNT ) {
        console.log( "error index!" );
        return;
    }
    BLOCKS[ z * BLOCKS_Y * BLOCKS_X + y * BLOCKS_X + x ].SetBlock( i );
};

window.onload = Start;