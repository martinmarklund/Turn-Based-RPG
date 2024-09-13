import SceneConfig from "./sceneConfig";

export default class GameManager {
  public game: Phaser.Game;

  constructor(height: number, width: number, sceneConfigs: SceneConfig[]) {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      height: height,
      width: width,
      scene: [],
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
        },
      },
    };

    this.game = new Phaser.Game(config);
    sceneConfigs.forEach((sceneConfig) => {
      this.game.scene.add(sceneConfig.key, sceneConfig.scene);
    });
  }

  startScene(sceneKey: string) {
    this.game.events.once("ready", () => {
      if (this.game.scene.getScene(sceneKey)) {
        this.game.scene.start(sceneKey);
      } else {
        console.error(`Scene with key "${sceneKey}" does not exist.`);
      }
    });
  }

  getSceneKeys() {
    return this.game.scene.keys;
  }
}
