const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron')
const path = require('path')
const Store = require('electron-store');

const store = new Store()
let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile(path.join(__dirname, 'src', 'index.html')).then(() => {
 todosData = store.get('todos1') || []
    mainWindow.webContents.send('item:show', todosData)
  })
 
  mainWindow.on('closed', function () {
    mainWindow = null
  })

  mainWindow.openDevTools();
}

ipcMain.on('item:add', (event, item) => {
  mainWindow.webContents.send('item:add', item)
})

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})