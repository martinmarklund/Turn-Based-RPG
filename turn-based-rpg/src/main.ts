import GameManager from "./objects/gameManager";
import SceneConfig from "./objects/sceneConfig";

import CreditsScene from "./scenes/creditsScene";
import MainMenuScene from "./scenes/mainMenuScene";
import MainScene from "./scenes/mainScene";

// Game config goes here
const height = 608;
const width = 800;

// Create scenes and scene array
const creditsSceneConfig = new SceneConfig(new CreditsScene(), "Credits");
const mainMenuSceneConfig = new SceneConfig(new MainMenuScene(), "MainMenu");
const mainSceneConfig = new SceneConfig(new MainScene(), "MainScene");
const sceneConfigs = [creditsSceneConfig, mainMenuSceneConfig, mainSceneConfig];

// Start game
const gameManager = new GameManager(height, width, sceneConfigs);

gameManager.startScene("MainMenu");
