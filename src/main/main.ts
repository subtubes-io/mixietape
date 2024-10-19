import path from 'path';
import * as tar from 'tar';
import fs from 'fs';
import { app, BrowserWindow, shell, ipcMain, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

let mainWindow: BrowserWindow | null = null;

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

// Handle file selection and extraction in the main process
ipcMain.handle('select-file', async () => {
  const { filePaths } = await dialog.showOpenDialog(mainWindow!, {
    properties: ['openFile'],
    filters: [{ name: 'Tar Files', extensions: ['tar', 'gz', 'tar.gz'] }],
  });

  if (filePaths && filePaths.length > 0) {
    return filePaths[0];
  }
  return null;
});

const getBaseNameWithoutAllExtensions = (filePath: string) => {
  return path.basename(filePath).replace(/(\.[^/.]+)+$/, '');
};

// In your ipcMain handler
ipcMain.handle(
  'upload-and-extract',
  async (event, filePath: string, destination: string) => {
    const baseName = getBaseNameWithoutAllExtensions(filePath);
    const targetPath = path.join(destination, baseName);

    try {
      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
      }

      // Extract the tar file to the destination
      await tar.x({
        file: filePath,
        cwd: targetPath,
      });

      return { targetPath };
    } catch (err: unknown) {
      throw new Error(`Extraction failed: ${(err as Error).message}`);
    }
  },
);

const createWindow = async () => {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: path.join(__dirname, '../../.erb/dll/preload.js'),
      contextIsolation: true,
      nodeIntegration: false, // Ensure nodeIntegration is disabled for security
      webSecurity: true,
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (mainWindow) {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // eslint-disable-next-line no-new
  new AppUpdater();
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    return null;
  })
  .catch((err) => {
    console.log(`Error: ${err.message}`);
  });
