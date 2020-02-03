import { BrowserWindow } from "electron";

export default class Main {
  static mainWindow: Electron.BrowserWindow;
  static application: Electron.App;
  static BrowserWindow;
  private static onWindowAllClosed() {
    if (process.platform !== "darwin") {
      Main.application.quit();
    }
  }

  private static onClose() {}

  private static onReady() {
    Main.mainWindow = new Main.BrowserWindow({
      width: 800,
      height: 600,
      resizable: false,
      frame: true,
      webPreferences: { nodeIntegration: true }
    });
    Main.mainWindow.webContents.loadFile(__dirname + "/../public/index.html");
    Main.mainWindow.on("closed", Main.onClose);
  }

  static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
    // we pass the Electron.App object and the
    // Electron.BrowserWindow into this function
    // so this class has no dependencies. This
    // makes the code easier to write tests for
    Main.BrowserWindow = browserWindow;
    Main.application = app;
    Main.application.on("window-all-closed", Main.onWindowAllClosed);
    Main.application.on("ready", Main.onReady);
  }
}
