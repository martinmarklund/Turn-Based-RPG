export function loadTileMap(scene: Phaser.Scene) {
  scene.load.spritesheet("tiles", "assets/tilemap.png", {
    frameWidth: 16,
    frameHeight: 16,
  });
}

export function createTiles(scene: Phaser.Scene) {
  const height = Math.floor(scene.scale.height / 16);
  const width = Math.floor(scene.scale.width / 16);

  const map = scene.make.tilemap({
    width: width,
    height: height,
    tileWidth: 16,
    tileHeight: 16,
  });

  const tileset = map.addTilesetImage("tiles");
  if (!tileset) {
    console.error("Tileset not found!");
    return;
  }

  const layer = map.createBlankLayer("layer1", tileset);
  if (!layer) {
    console.error("Error creating layer!");
    return;
  }
  console.log("Height and width:", height, " ", width);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const tileType = getTileType(x, y, width, height);
      let tileIndex = 7;
      switch (tileType) {
        case TileType.LeftTopCorner:
          tileIndex = 0;
          break;
        case TileType.LeftEdge:
          tileIndex = 16;
          break;
        case TileType.LeftBotCorner:
          tileIndex = 64;
          break;
        case TileType.TopEdge:
          tileIndex = 1;
          break;
        case TileType.RightTopCorner:
          tileIndex = 2;
          break;
        case TileType.RightEdge:
          tileIndex = 18;
          break;
        case TileType.RightBotCorner:
          tileIndex = 69;
          break;
        case TileType.BotEdge:
          tileIndex = 52;
          break;
        default: // Normal
          tileIndex = 17;
          break;
      }
      layer.putTileAt(tileIndex, x, y);
    }
  }
}

function getTileType(x: number, y: number, width: number, height: number) {
  if (x === 0 && y === 0) {
    return TileType.LeftTopCorner;
  } else if (x === 0 && y === height - 1) {
    return TileType.LeftBotCorner;
  } else if (x === 0 && (y !== 0 || y !== height - 1)) {
    return TileType.LeftEdge;
  } else if (x !== 0 && x !== width - 1 && y === 0) {
    return TileType.TopEdge;
  } else if (x === width - 1 && y === 0) {
    return TileType.RightTopCorner;
  } else if (x === width - 1 && y === height - 1) {
    return TileType.RightBotCorner;
  } else if (x === width - 1 && (y !== 0 || y !== height - 1)) {
    return TileType.RightEdge;
  } else if (x !== 0 && x !== width - 1 && y === height - 1) {
    return TileType.BotEdge;
  } else {
    return TileType.Normal;
  }
}

enum TileType {
  LeftEdge,
  LeftTopCorner,
  TopEdge,
  RightTopCorner,
  RightEdge,
  RightBotCorner,
  BotEdge,
  LeftBotCorner,
  Normal,
}
