import Grid from "./tile";

export default class Player {
  private sprite: Phaser.GameObjects.Sprite;
  private grid: Grid;

  constructor(scene: Phaser.Scene, grid: Grid, x: number, y: number) {
    this.grid = grid;
    this.sprite = scene.add.sprite(x * 16, y * 16, "player");
  }

  moveTo(x: number, y: number) {
    const tile = this.grid.getTile(x, y);
    if (tile && tile.isWalkable) {
      this.sprite.setPosition(x * 16, y * 16);
      console.log(this.sprite.copyPosition);
    }
  }
}
