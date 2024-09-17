import GameScene from "../objects/gameScene";
import Player from "../objects/player";

import Grid from "../objects/tile";

import { createTiles, loadTileMap } from "../utils/tileMapUtils";

export default class MainScene extends GameScene {
  private player!: Player;

  constructor() {
    const grid = new Grid(50, 38);
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
    const gridSize = 16;
    createTiles(this, this.grid.width, this.grid.height, gridSize);
    this.player = new Player(this, 100, 100, gridSize);
  }

  update(time: number): void {
    this.player.update(time);
  }
}
