import { app, BrowserWindow } from 'electron';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV !== 'production';

const getFilePath = () => fileURLToPath(import.meta.url);
const getDirPathFromFilePath = () => dirname(getFilePath());

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    title: 'AWS Autorotate Credentials',
    width: 800,
    height: 600,
  });

  mainWindow.loadFile(join(getDirPathFromFilePath(), '/renderer/index.html'));

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
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
  if (!isMac) {
    app.quit();
  }
});
