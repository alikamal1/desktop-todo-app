const {
  app,
  BrowserWindow
} = require('electron')
const path = require('path')


let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
    }
  })

  mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'))

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  mainWindow.openDevTools();

}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})