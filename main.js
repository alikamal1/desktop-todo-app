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
    todosData = store.get('todos') || []
    mainWindow.webContents.send('item:show', todosData)
  })

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  // mainWindow.openDevTools();
}

ipcMain.on('item:add', (event, item) => {
  todosData = store.get('todos') || []
  todosData.push(item)
  store.set('todos', todosData)
  mainWindow.webContents.send('item:add', item)
})

ipcMain.on('item:remove', (event, item) => {
  todosData = store.get('todos')
  todosData.splice(todosData.indexOf(item), 1)
  store.set('todos', todosData)
  mainWindow.webContents.send('item:show', todosData)
})

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})