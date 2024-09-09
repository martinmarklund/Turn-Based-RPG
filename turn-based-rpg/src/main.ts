import Phaser from "phaser";
import { loadTileMap, createTiles } from "./utils/tileMapUtils";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO, // Phaser.AUTO allows Phaser to choose between WebGL and Canvas based on the browser's capabilities.
  width: 800,
  height: 608,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

function preload(this: Phaser.Scene) {
  // Load assets here
  loadTileMap(this);
}

function create(this: Phaser.Scene) {
  // Initialize game objects here
  createTiles(this);
}

function update() {
  // Game logic goes here
}
