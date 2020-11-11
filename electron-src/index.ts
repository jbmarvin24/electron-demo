// Native
import { join } from 'path';
import { format } from 'url';

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent, dialog } from 'electron';
import isDev from 'electron-is-dev';
import prepareNext from 'electron-next';

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer');

  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      worldSafeExecuteJavaScript: true,
      nodeIntegration: false,
      preload: join(__dirname, 'preload.js'),
    },
  });

  const url = isDev
    ? 'http://localhost:8000/'
    : format({
        pathname: join(__dirname, '../renderer/out/index.html'),
        protocol: 'file:',
        slashes: true,
      });

  mainWindow.loadURL(url);
});

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit);

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event: IpcMainEvent, message: any) => {
  event.sender.send('message', message);
});

// Synchronus
ipcMain.on('synchronous-message', (event: IpcMainEvent, arg: any) => {
  console.log(arg); // prints "ping"
  event.returnValue = 'pong';
});

// Asynchronus

ipcMain.handle('some-name', async (event, someArgument) => {
  await setTimeout(() => {}, 3000);
  return someArgument;
});

ipcMain.on('message-box', (event: IpcMainEvent, args: any) => {
  const result = dialog.showMessageBoxSync({
    type: 'question',
    title: 'Sample Message Box',
    message: 'Sample Message',
    buttons: ['Yes', 'No', 'I said No'],
  });

  console.log(result);
  event.returnValue = null;
});
