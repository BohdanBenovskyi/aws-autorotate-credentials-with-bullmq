import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { PrismaClient } from './database/generated/client';

import { ConnectionStatus } from './constants/index.constants';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
if (require('electron-squirrel-startup')) {
  app.quit();
}

let prismaClient: PrismaClient | undefined;
let currentConnectionString: string | undefined;

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

  ipcMain.handle('test-connection', async (_event, data: { connectionString: string }): Promise<ConnectionStatus> => {
    try {
      if (prismaClient === undefined || currentConnectionString !== data.connectionString) {
        currentConnectionString = data.connectionString;

        prismaClient = new PrismaClient({
          datasources: {
            db: {
              url: data.connectionString
            }
          }
        });
      }

      const configuration = await prismaClient.configuration.findFirst();

      console.debug('Configuration', configuration);

      return ConnectionStatus.SUCCESS;
    } catch (error) {
      console.log('An error occurred during testing connection', error);

      return ConnectionStatus.ERROR;
    }
  });

  ipcMain.handle('select-dirs', async (): Promise<string[]> => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
    });

    return result.filePaths;
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
