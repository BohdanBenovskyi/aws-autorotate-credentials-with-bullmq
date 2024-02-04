import { app, BrowserWindow } from 'electron';
import * as path from 'path';

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    title: 'AWS Autorotate Credentials',
    width: 800,
    height: 600,
  });

  mainWindow.loadFile(path.join(__dirname, '/renderer/index.html'));

  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createMainWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});