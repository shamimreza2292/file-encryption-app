const { app, BrowserWindow } = require('electron')
const { desktopCapturer, Menu } = require('electron');
// const { Menu } = remote;
const electron = require('electron');

var os = require('os');
var {dialog} = require('electron');
const ipc = require('electron').ipcMain;


// const videoSelectBtn = document.getElementById('videoSelectBtn');
// videoSelectBtn.onclick = getVideoSources;

 
// const {menu} = remote;
// console.log(remote);

function getVideoSources() {
  desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
    for (const source of sources) {
      if (source.name === 'Electron') {
        mainWindow.webContents.send('SET_SOURCE', source.id)
        return
      }
    }
  })


  
}

 

const createWindow = () => {
    const win = new BrowserWindow({
      width: 1200,
      height: 1200,
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        contextIsolation: false,
        enableRemoteModule: true,
      }
    })
       
    // win.webContents.openDevTools()
  
    win.loadFile('index.html');

    // file upload 


    // encrypt file
    ipc.on('open-file-dialog-for-encrypt', function (event) {
      if(os.platform() === 'linux' || os.platform() === 'win32'){
         dialog.showOpenDialog({
             properties: ['openFile'],
             filters: [
              { name: 'text file', extensions: ["txt",] },
            ]
         }
         ).then((files)=>{
            if (files) event.sender.send('selected-file-for-encrypt', files.filePaths[0]);
         }).catch((err)=>{
            console.log(err);
         });
     } else {
         dialog.showOpenDialog({
             properties: ['openFile', 'openDirectory'],
             filters: [
              { name: 'text file', extensions: ["txt",] },
            ]
         }).then((files)=>{
          if (files) event.sender.send('selected-file-for-encrypt', files.filePaths[0]);
       }).catch((err)=>{
          console.log(err);
       });
     }});


    // decrypt
    ipc.on('open-file-dialog-for-decrypt', function (event) {
      if(os.platform() === 'linux' || os.platform() === 'win32'){
         dialog.showOpenDialog({
             properties: ['openFile'],
             filters: [
              { name: 'text file', extensions: ["txt",] },
            ]
         }
         ).then((files)=>{
            if (files) event.sender.send('selected-file-for-decrypt', files.filePaths[0]);
         }).catch((err)=>{
            console.log(err);
         });
     } else {
         dialog.showOpenDialog({
             properties: ['openFile', 'openDirectory'],
             filters: [
              { name: 'text file', extensions: ["txt",] },
            ]
         }).then((files)=>{
          if (files) event.sender.send('selected-file-for-decrypt', files.filePaths[0]);
       }).catch((err)=>{
          console.log(err);
       });
     }});

     // open file normaly
   
     ipc.on('open-dialog-for-normally-file', function (event) {
      console.log('file');
      if(os.platform() === 'linux' || os.platform() === 'win32'){
         dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [
             { name: 'text file', extensions: ["txt",] },
           ],
         }
         ).then((files)=>{
            if (files) event.sender.send('selected-file-normally-open', files.filePaths[0]);
         }).catch((err)=>{
            console.log(err);
         });
     } else {
         dialog.showOpenDialog({
             properties: ['openFile', 'openDirectory'],
             filters: [
              { name: 'text file', extensions: ["txt",] },
            ],
         }).then((files)=>{
          if (files) event.sender.send('selected-file-normally-open', files.filePaths[0]);
       }).catch((err)=>{
          console.log(err);
       });
     }});


  }

  app.whenReady().then(() => {
    // console.log(ipcRenderer);
    
    getVideoSources();
    createWindow()
  })
 