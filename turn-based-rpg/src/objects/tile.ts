class Tile {
  constructor(public x: number, public y: number, public isWalkable: boolean) {}
}

export default class Grid {
  private tiles: Tile[][];

  constructor(public width: number, public height: number) {
    this.tiles = [];
    for (let y = 0; y < height; y++) {
      const row: Tile[] = [];
      for (let x = 0; x < width; x++) {
        row.push(new Tile(x, y, true));
      }
      this.tiles.push(row);
    }
  }

  getTile(x: number, y: number): Tile | null {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      return this.tiles[y][x];
    }
    return null;
  }
}
