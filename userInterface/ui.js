const {
    app,
    BrowserWindow
} = require('electron');
const path = require('path');
const url = require('url');

function createWindow() {
    win = new BrowserWindow({
        width: 1800,
        height: 1000
    });
    win.loadURL(url.format({
        pathname: path.join('.', './index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open the dev tools
    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);
