export default class SceneConfig {
  public scene: Phaser.Scene;
  public key: string;

  constructor(scene: Phaser.Scene, key: string) {
    this.scene = scene;
    this.key = key;
  }
}
