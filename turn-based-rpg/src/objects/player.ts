import Grid from "./tile";

export default class Player extends Phaser.GameObjects.Sprite {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  private grid: Grid;

  private isMoving: boolean;
  private moveInterval: number;
  private lastMoveTime: number;
  private moveDistance: number;

  /**
   * Creates a player object at a given position.
   * @param scene - Scene to add player to
   * @param grid - Grid
   * @param x - Grid index X
   * @param y - Grid index Y
   */
  constructor(scene: Phaser.Scene, grid: Grid, x: number, y: number) {
    super(scene, x * grid.size, y * grid.size, "player");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.grid = grid;

    this.cursors =
      scene.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys;

    this.isMoving = false;
    this.lastMoveTime = 0;
    this.moveInterval = 200; //Time in miliseconds
    this.moveDistance = this.grid.size;
  }

  update(time: number): void {
    this.handleMovement(time);
  }

  /**
   * Handles the logic that decides whether or not the player is allowed to move.
   * * Are relevant keys pressed down?
   * * Has enough time passed since last movement?
   * @param time - Current timestamp.
   */
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

  /**
   * Updates the position of the player. Should only be called by method handleMovement.
   * @param time - Current timestamp.
   */
  private move(time: number): void {
    let moved = false;
    if (this.cursors.left.isDown) {
      if (this.canMove([this.x - this.moveDistance, this.y])) {
        this.x -= this.moveDistance;
        moved = true;
      }
    } else if (this.cursors.right.isDown) {
      if (this.canMove([this.x + this.moveDistance, this.y])) {
        this.x += this.moveDistance;
        moved = true;
      }
    }

    if (this.cursors.up.isDown) {
      if (this.canMove([this.x, this.y - this.moveDistance])) {
        this.y -= this.moveDistance;
        moved = true;
      }
    } else if (this.cursors.down.isDown) {
      if (this.canMove([this.x, this.y + this.moveDistance])) {
        this.y += this.moveDistance;
        moved = true;
      }
    }

    if (moved) {
      this.isMoving = true;
      this.lastMoveTime = time;
    }
  }

  /**
   * Checks if the would be new position is valid for movement.
   * @param newPosition - The position the player would move to.
   * @returns Whether or not the new position is possible to move to.
   */
  private canMove(newPosition: [number, number]): boolean {
    let canMove = true;

    // Check window boundaries
    if (
      newPosition[0] >= this.grid.cols * this.moveDistance ||
      newPosition[0] < 0 ||
      newPosition[1] >= this.grid.rows * this.moveDistance ||
      newPosition[1] < 0
    ) {
      canMove = false;
    } else if (
      !this.grid.isWalkable(
        newPosition[0] / this.grid.size,
        newPosition[1] / this.grid.size
      )
    ) {
      canMove = false;
    }
    return canMove;
  }
}
