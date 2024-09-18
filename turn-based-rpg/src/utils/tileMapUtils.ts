import Grid from "../objects/tile";

export function loadTileMap(scene: Phaser.Scene) {
  scene.load.spritesheet("tiles", "assets/tilemap.png", {
    frameWidth: 16,
    frameHeight: 16,
  });
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
  Water,
  ShorelineLeft,
  ShorelineTop,
  ShorelineRight,
}

const tileTypeToIndexMap: { [key in TileType]: number } = {
  [TileType.LeftTopCorner]: 0,
  [TileType.LeftEdge]: 16,
  [TileType.LeftBotCorner]: 64,
  [TileType.TopEdge]: 1,
  [TileType.RightTopCorner]: 2,
  [TileType.RightEdge]: 18,
  [TileType.RightBotCorner]: 69,
  [TileType.BotEdge]: 52,
  [TileType.Water]: 81,
  [TileType.Normal]: 17,
  [TileType.ShorelineLeft]: 82,
  [TileType.ShorelineTop]: 99,
  [TileType.ShorelineRight]: 80,
};

/**
 * Creates a tilemap for a scene and fills it with tiles.
 * @param scene - Scene object for which the tilemap is created.
 * @param grid - Grid that the tilemap is based on.
 * @param padding - Decides the padding of the map. Tiles within the padding will be water.
 */
export function createTiles(
  scene: Phaser.Scene,
  grid: Grid,
  padding: number
): void {
  const map = scene.make.tilemap({
    width: grid.cols,
    height: grid.rows,
    tileWidth: grid.size,
    tileHeight: grid.size,
  });

  const tileset = map.addTilesetImage("tiles");
  if (!tileset) {
    console.error("Tileset not found!");
    return;
  }

  const layer = map.createBlankLayer("map", tileset);
  if (!layer) {
    console.error("Error creating layer!");
    return;
  }

  for (let y = 0; y < grid.rows; y++) {
    for (let x = 0; x < grid.cols; x++) {
      const tileType = getTileType(x, y, grid.cols, grid.rows, padding);
      const tileIndex = tileTypeToIndexMap[tileType];
      switch (tileType) {
        case TileType.Normal:
          grid.setWalkable(x, y, true);
          break;
        default:
          grid.setWalkable(x, y, false);
          break;
      }
      layer.putTileAt(tileIndex, x, y);
    }
  }
}

function getTileType(
  x: number,
  y: number,
  cols: number,
  rows: number,
  padding: number
) {
  if (
    x < padding ||
    x >= cols - padding ||
    y < padding ||
    y >= rows - padding
  ) {
    if (x === padding - 1 && y >= padding && y < rows - padding) {
      return TileType.ShorelineLeft;
    } else if (x === cols - padding && y >= padding && y < rows - padding - 1) {
      return TileType.ShorelineRight;
    } else if (y === padding - 1 && x >= padding && x < cols - padding) {
      return TileType.ShorelineTop;
    } else {
      return TileType.Water;
    }
  }

  const isLeftEdge = x === padding;
  const isRightEdge = x === cols - padding - 1;
  const isTopEdge = y === padding;
  const isBottomEdge = y === rows - padding - 1;

  if (isLeftEdge && isTopEdge) {
    return TileType.LeftTopCorner;
  } else if (isLeftEdge && isBottomEdge) {
    return TileType.LeftBotCorner;
  } else if (isRightEdge && isTopEdge) {
    return TileType.RightTopCorner;
  } else if (isRightEdge && isBottomEdge) {
    return TileType.RightBotCorner;
  } else if (isLeftEdge) {
    return TileType.LeftEdge;
  } else if (isRightEdge) {
    return TileType.RightEdge;
  } else if (isTopEdge) {
    return TileType.TopEdge;
  } else if (isBottomEdge) {
    return TileType.BotEdge;
  } else {
    return TileType.Normal;
  }
}
