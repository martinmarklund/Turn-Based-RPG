import Phaser from "phaser";

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super({ key: "Credits" });
  }

  create(): void {
    this.add
      .text(400, 300, "Credits", { fontSize: "32px", color: "#fff" })
      .setOrigin(0.5);

    const backButton = this.add
      .text(400, 400, "Back", { fontSize: "32px", color: "#fff" })
      .setOrigin(0.5)
      .setInteractive();

    backButton.on("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}
