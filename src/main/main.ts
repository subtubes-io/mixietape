import path from 'path';
import * as tar from 'tar';
import fs from 'fs';
import { app, BrowserWindow, shell, ipcMain, dialog } from 'electron';
import express from 'express'; // Import express
import cors from 'cors';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

let mainWindow: BrowserWindow | null = null;
let server: any; // To hold the reference to the Express server

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

// Function to start the Express server
const startServer = () => {
  const app = express();
  const PORT = 3001;

  app.use(cors());

  // Serve static files from the "extracted" directory
  app.use(
    '/files',
    express.static(
      '/Users/edgarmartinez/Code/electron-react-boilerplate/extracted',
    ),
  );

  server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

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
      webSecurity: false,
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

  new AppUpdater();
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Start the Express server and the Electron app
app
  .whenReady()
  .then(() => {
    console.log(
      '====================================================',
      path.join(__dirname, 'extracted'),
    );
    startServer(); // Start the Express server when the app is ready
    createWindow();
  })
  .catch((err) => {
    console.log(`Error: ${err.message}`);
  });

app.on('quit', () => {
  if (server) {
    server.close(); // Close the Express server when the app quits
  }
});
