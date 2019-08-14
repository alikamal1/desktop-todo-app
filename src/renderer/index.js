const {
  BrowserWindow
} = require('electron').remote
const path = require('path')
const {
  ipcRenderer
} = require('electron')
const Store = require('electron-store');
const store = new Store();

let addTodoWindow =
  document.getElementById('open-add-todo-window').addEventListener('click', (event) => {
    addTodoWindow = new BrowserWindow({
      width: 600,
      height: 260,
      webPreferences: {
        nodeIntegration: true
      }
    })

    addTodoWindow.on('close', () => {
      addTodoWindow = null
    })
    addTodoWindow.loadFile(path.join(__dirname, 'add.html'))
    addTodoWindow.show()
  })
const ul = document.querySelector('ul')

ipcRenderer.on('item:show', (event, todosData) => {
  if (todosData === []) return
  ul.innerHTML = `<p class="panel-heading">Todo List</p>`
  for (i = 0; i < todosData.length; i++) {
    const block = document.createElement('a')
    block.className = "panel-block"
    block.href = `javascript:removeTodo('${todosData[i]}')`
    block.innerHTML = `<span class="panel-icon"><i class="fas fa-check" aria-hidden="true"></i></span><li>${todosData[i]}</li> `
    ul.appendChild(block)
  }
})

ipcRenderer.on('item:add', (event, todo) => {
  const block = document.createElement('a')
  block.className = "panel-block"
  block.href = `javascript:removeTodo('${todo}')`
  block.innerHTML = `<span class="panel-icon"><i class="fas fa-check" aria-hidden="true"></i></span><li>${todo}</li> `
  ul.appendChild(block)
  addTodoWindow.close()
})


function removeTodo(todo) {
  ipcRenderer.send('item:remove', todo)
}