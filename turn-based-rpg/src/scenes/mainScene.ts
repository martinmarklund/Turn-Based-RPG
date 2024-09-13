import GameScene from "../objects/gameScene";
import Grid from "../objects/tile";

import { createTiles, loadTileMap } from "../utils/tileMapUtils";

export default class MainScene extends GameScene {
  constructor() {
    const grid = new Grid(50, 38);
    super("MainScene", grid);
  }

  preload(): void {
    loadTileMap(this);
  }

  create(): void {
    createTiles(this, this.grid.width, this.grid.height, 16);
  }
}
