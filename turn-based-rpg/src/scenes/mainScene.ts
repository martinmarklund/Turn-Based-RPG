import GameScene from "../objects/gameScene";
import Player from "../objects/player";

import Grid from "../objects/tile";

import { createTiles, loadTileMap } from "../utils/tileMapUtils";

export default class MainScene extends GameScene {
  private player!: Player;

  constructor() {
    const grid = new Grid(50, 38, 16);
    super("MainScene", grid);
  }

  preload(): void {
    loadTileMap(this);
    this.load.spritesheet("player", "../assets/sprites/Char_002_Idle.png", {
      frameWidth: 24,
      frameHeight: 24,
    });
  }

  create(): void {
    createTiles(this, this.grid, 3);
    this.player = new Player(
      this,
      this.grid,
      this.grid.cols / 2,
      this.grid.rows / 2
    );
  }

  update(time: number): void {
    this.player.update(time);
  }
}
