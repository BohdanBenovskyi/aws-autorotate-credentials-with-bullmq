const { app, BrowserWindow } = require('electron');
const path = require('path');

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    title: 'AWS Autorotate Credentials',
    width: 800,
    height: 600,
  });

  mainWindow.loadFile(path.join(__dirname, './renderer/inde.html'));
}

app.whenReady().then(() => {
    createMainWindow();
});
