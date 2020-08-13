"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
class Main {
    static onWindowAllClosed() {
        if (process.platform !== "darwin") {
            Main.application.quit();
        }
    }
    static onClose() { }
    static onReady() {
        Main.mainWindow = new Main.BrowserWindow({
            width: 800,
            height: 600,
            resizable: false,
            frame: true,
            webPreferences: { nodeIntegration: true },
            icon: path_1.default.join(__dirname, "build", "icons", "icon.png"),
        });
        Main.mainWindow.setMenu(null);
        Main.mainWindow.webContents.loadFile(__dirname + "/index.html");
        Main.mainWindow.on("closed", Main.onClose);
    }
    static main(app, browserWindow) {
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
exports.default = Main;
