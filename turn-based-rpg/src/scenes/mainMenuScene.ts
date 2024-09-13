import Phaser from "phaser";

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenu" });
  }

  preload(): void {}

  create(): void {
    const startButton = this.add
      .text(400, 300, "Start Game", {
        fontSize: "32px",
        color: "#fff",
      })
      .setOrigin(0.5)
      .setInteractive();

    startButton.on("pointerdown", () => {
      this.scene.start("MainScene");
    });

    const creditsButton = this.add
      .text(400, 400, "Credits", {
        fontSize: "32px",
        color: "#fff",
      })
      .setOrigin(0.5)
      .setInteractive();

    creditsButton.on("pointerdown", () => {
      this.scene.start("Credits");
    });
  }
}
