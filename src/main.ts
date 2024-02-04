import { app, BrowserWindow } from 'electron';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const getFilePath = () => fileURLToPath(import.meta.url);
const getDirPathFromFilePath = () => dirname(getFilePath());

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    title: 'AWS Autorotate Credentials',
    width: 800,
    height: 600,
  });

  mainWindow.loadFile(join(getDirPathFromFilePath(), '/renderer/index.html'));

  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
