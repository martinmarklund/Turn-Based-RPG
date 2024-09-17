import Phaser from "phaser";

import Grid from "./tile";

export default class GameScene extends Phaser.Scene {
  protected grid: Grid;

  constructor(key: string, grid: Grid) {
    super({ key: key });
    this.grid = grid;
  }

  preload() {}

  create() {}

  update(time: number) {}
}
