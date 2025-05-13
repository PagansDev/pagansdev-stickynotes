import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    },
    titleBarStyle: "hidden"
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
  ipcMain.on("window-minimize", (event) => {
    const win2 = BrowserWindow.getFocusedWindow();
    if (win2) win2.minimize();
  });
  ipcMain.on("window-maximize", (event) => {
    const win2 = BrowserWindow.getFocusedWindow();
    if (win2) {
      if (win2.isMaximized()) {
        win2.unmaximize();
      } else {
        win2.maximize();
      }
    }
  });
  ipcMain.on("window-close", (event) => {
    const win2 = BrowserWindow.getFocusedWindow();
    if (win2) win2.close();
  });
}
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
