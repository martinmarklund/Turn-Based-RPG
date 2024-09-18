class Tile {
  constructor(public x: number, public y: number, public isWalkable: boolean) {}
}

export default class Grid {
  private tiles: Tile[][];
  size: number;
  constructor(public cols: number, public rows: number, size: number) {
    this.tiles = [];
    for (let y = 0; y < rows; y++) {
      const row: Tile[] = [];
      for (let x = 0; x < cols; x++) {
        row.push(new Tile(x, y, true));
      }
      this.tiles.push(row);
    }
    this.size = size;
  }

  private getTile(x: number, y: number): Tile | null {
    if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
      return this.tiles[y][x];
    }
    return null;
  }

  isWalkable(x: number, y: number): boolean {
    let tile = this.getTile(x, y);
    if (tile) {
      return tile.isWalkable;
    } else {
      console.error(`No tile at index ["${x}", "${y}"].`);
      return false;
    }
  }

  setWalkable(x: number, y: number, walkable: boolean): void {
    this.tiles[y][x].isWalkable = walkable;
  }
}
