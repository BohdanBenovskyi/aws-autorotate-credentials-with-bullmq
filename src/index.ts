import { app, BrowserWindow, ipcMain } from 'electron';
import { PrismaClient } from './database/generated/client';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = async (): Promise<void> => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  await mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.webContents.openDevTools();

  const prisma = new PrismaClient();

  ipcMain.handle('get-configurations', async () => {
    return await prisma.configuration.findMany();
  });

  ipcMain.handle('test-connection', async (_event, data: { connectionString: string }) => {
    const prismaClient = new PrismaClient({
      datasources: {
        db: {
          url: data.connectionString
        }
      }
    });

    const configurations = await prismaClient.configuration.findMany();

    console.log(`Results ====> ${JSON.stringify(configurations)}`);

    return configurations;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.on('activate', async () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    await createWindow();
  }
});
