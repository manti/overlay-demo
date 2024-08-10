import { app, BrowserWindow, ipcMain, globalShortcut } from 'electron';
import * as path from "path";

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 1200,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  win.loadFile(path.join(__dirname, "../../index.html"))
    .catch(err => console.log(err));

  // Enable dragging on the whole window
  win.setMovable(true);

  ipcMain.on('start-drag', () => {
    if (win) {
      win.webContents.send('start-drag-reply');
    }
  });

    win.webContents.toggleDevTools();

}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});