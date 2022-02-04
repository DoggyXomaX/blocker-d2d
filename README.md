# blocker-d2d
## Usage:
```javascript
SetBlock( x, y, z, index );
```

- 0 - Air
- 1 - Stone
- 2 - Grass
- 3 - Dirt
- 4 - Cobblestone
- 5 - Planks
- 6 - Brick

## Block class:

```javascript
var block = new Block();
block.SetBlock( index );
block.SetPosition( x, y, z ); // in map grid
```

## Preview Sphere 64x64x64

```javascript
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
```
![Sphere 64x64x64](./.assets/preview.png "Sphere 64x64x64")
