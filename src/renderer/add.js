const {
    ipcRenderer
} = require('electron')

document.getElementById('submitButton').addEventListener('click', (event) => {
    const newTodoItem = document.getElementById('newTodoItem').value
    ipcRenderer.send('item:add', newTodoItem)
})