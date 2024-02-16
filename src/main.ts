import { app, BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV !== 'production';

const getFilePath = () => fileURLToPath(import.meta.url);
const getDirPathFromFilePath = () => dirname(getFilePath());

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    title: 'AWS Autorotate Credentials',
    width: isDev ? 800 : 500,
    height: 600,
  });

  mainWindow.loadFile(join(getDirPathFromFilePath(), '/renderer/index.html'));

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
};

app.whenReady().then(() => {
  createMainWindow();

  const menu: MenuItemConstructorOptions[] = [
    ...(isMac ? [{ label: app.name, submenu: [{ label: 'About' }] }] : []),
    ...(!isMac ? [{ label: 'Help', submenu: [{ label: 'About' }] }] : []),
    { role: 'fileMenu' },
  ];

  const mainMenu = Menu.buildFromTemplate(menu);

  Menu.setApplicationMenu(mainMenu);

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
