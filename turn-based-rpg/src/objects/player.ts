export default class Player extends Phaser.GameObjects.Sprite {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  private isMoving: boolean;
  private moveInterval: number;
  private lastMoveTime: number;
  private moveDistance: number;

  constructor(scene: Phaser.Scene, x: number, y: number, moveDistance: number) {
    super(scene, x, y, "player");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.cursors =
      scene.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys;

    this.isMoving = false;
    this.lastMoveTime = 0;
    this.moveInterval = 200; //Time in miliseconds
    this.moveDistance = moveDistance;
  }

  update(time: number): void {
    this.handleMovement(time);
  }

  private handleMovement(time: number): void {
    // If the player isn't moving, move them
    if (!this.isMoving) {
      this.move(time);
    }
    // The player can also move if a set interval of time has passed
    else if (time - this.lastMoveTime > this.moveInterval) {
      this.move(time);
    }

    // Finally, check if the player has stopped moving (by releasing all input buttons)
    if (
      this.cursors.left.isUp &&
      this.cursors.right.isUp &&
      this.cursors.down.isUp &&
      this.cursors.up.isUp
    ) {
      this.isMoving = false;
    }
  }

  private move(time: number): void {
    let moved = false;
    if (this.cursors.left.isDown) {
      this.x -= this.moveDistance;
      moved = true;
    } else if (this.cursors.right.isDown) {
      this.x += this.moveDistance;
      moved = true;
    }

    if (this.cursors.up.isDown) {
      this.y -= this.moveDistance;
      moved = true;
    } else if (this.cursors.down.isDown) {
      this.y += this.moveDistance;
      moved = true;
    }

    if (moved) {
      this.isMoving = true;
      this.lastMoveTime = time;
    }
  }
}
