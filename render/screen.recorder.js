// const { app, BrowserWindow } = require('electron')
const { ipcRenderer } = require('electron')
let $ = jQuery = require('jquery');
  
  
let fs = require('fs');
const electron = require('electron')
// const BrowserWindow = electron.remote.BrowserWindow;
 

const { dialog } = require('electron')
console.log(dialog)

// fs.appendFile('contacts', 'shamim reza' + ',' + 'shamim@metatude.com' + '\n');
let os = require('os');
const { rejects } = require('assert');
// document.write('Device Info' + '<br>')
// document.write(JSON.stringify(os.userInfo()) + '<br>' + 
//    'Platform: ' + os.platform() + '<br>' + 
//    'User home directory: ' +  os.homedir() + '<br>' + 
//    'OS Architecture: ' + os.arch() + '<br>')




// open camera 


//  document.addEventListener('DOMContentLoaded', ()=>{
//    let mediaDevice = navigator.mediaDevices;

//    // let videoContainer = document.getElementById('videoContainer');
//    // let openVideoBtn = document.getElementById('videoSelectBtn');
//    let mideaPlayer = document.getElementById('mideaPlayer');
//    const canvas = document.getElementById('canvas');
//    const context = canvas.getContext('2d');
//    let imageBtn = document.getElementById('imageBtn');
//    let startVideoBtn = document.getElementById('startVideoBtn');

//    let downloadElement = document.createElement('a');

//    let videoStream = [];
//    let recorder = null;
   
   
//    let scale = 2;
//    canvas.width = 1280 * scale;
//    canvas.height = 739 * scale;
//    // let mediaStream = null;
//    // let imageTrack = null; 

//    let constrain = {
//       video: true,
//       audio: true
//    }
   
//    window.addEventListener('load', ()=>{
//       mediaDevice.getUserMedia(constrain).then((stream)=>{
//          mideaPlayer.srcObject = stream;
//       })

//     })

//     imageBtn.addEventListener('click', ()=>{
//          context.drawImage(mideaPlayer, 0, 0, canvas.width, canvas.height);
//          mideaPlayer.srcObject.getVideoTracks().forEach(track => track.stop());
//          canvas.toBlob(function(blob) {
//             let url = URL.createObjectURL(blob);
//             downloadElement.setAttribute('download', 'capture.jpg');
//             downloadElement.setAttribute('href', url);
//             downloadElement.click();
//             saveAs(blob, "pretty image.png");
//       });

//          mediaDevice.getUserMedia(constrain).then((stream)=>{
//             mideaPlayer.srcObject = stream;
//          })
//     })


//     startVideoBtn.addEventListener('click', ()=>{
//          // videoStream.push
//          mediaDevice.getUserMedia(constrain).then((stream)=>{
//          // mideaPlayer.srcObject = stream;
//             recorder = new MediaRecorder(stream);
//             recorder.ondataavailable = (event) => {
//                console.log(event);
//                videoStream.push(event.data)
//             };
//             recorder.start(5000);
//             // new Promise((resolve, rejects)=>{
//             //             recorder.onstop = resolve;
//             //             recorder.onerror = event => reject(event.name);
//             //          })

//          }).then((recorderChunk)=>{
//             setTimeout(() => {
//                console.log(videoStream);
//                let recordedBlob = new Blob(videoStream, { type: "video/webm" });
//                let recording = URL.createObjectURL(recordedBlob);
//                downloadElement.download = "RecordedVideo.webm";
//                downloadElement.href = recording;
//                downloadElement.click();
//             }, 6000);
            
//          })
         
         
//          // recordData.then(()=>{
            
//          // })

        
//       })
     


//  })


//====================================== common variable ===================

// let DecryptionFilePath = '';
// import {DecryptionComponent} from './feature/decryption.component.js';
// var decryptionThing = new DecryptionComponent();

 
class example {
  onclickbtn(){
    
  }
}

// let exampleBtn = new example();


 
// ========================== file encription =========================== 
const crypto = require("crypto");
const { log } = require('console');
const ipc = require('electron').ipcRenderer;

const path = require('path');
console.log(path.resolve('render/shared/confirmation.modal.js'));
const  {openConfirmationModal, closeConfirmationModal} = require(path.resolve('render/shared/confirmation.modal.js'));






// let fileName = '';
// let encPassword = '';
// let encText = '';

// const randomPassword = ()=>{
//   var pass = '';
//   var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789@#$';
//   for (let i = 1; i <= 4; i++) {
//       var char = Math.floor(Math.random() * str.length + 1);
//       pass += str.charAt(char)
//   }
//   return pass;
// }

// const encrypt = (filePath, password) => {
//   try {    
//     fs.readFile(filePath, 'utf8', (err, data) => {
//       if(filePath!=''){
//         let pathSplite = filePath.split(`\\`);
//         fileName = pathSplite[pathSplite.length - 1];
//       }
//       if (err) {
//         console.error(err);
//         return;
//       }

//       let  plainText = data;
//       encPassword = password

//       const iv = crypto.randomBytes(16);
//       const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
//       const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);  
//       let encrypted = cipher.update(plainText);
//       encrypted = Buffer.concat([encrypted, cipher.final()]);  
//       encText = iv.toString('hex') + ':' + encrypted.toString('hex');
//       openModalOfFileName();
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

 
//  const encryptBtn = document.getElementById('encrypt-btn'); 
//  encryptBtn.addEventListener('click', function (event) {
//      ipc.send('open-file-dialog-for-encrypt');
//  }); 

//  ipc.on('selected-file-for-encrypt', function (event, path) {
//   clearErrorTexts()
//     let pass = randomPassword();
//     if(pass){
//       encrypt(path, pass);
//     }else{
//       // open a dialog
//     }
//  });





// const saveEncryptedFile = ()=>{
//   closeConfirmationModal();
//   let customFileName = $('#file_Name').val().trim() != '' ? $('#file_Name').val().trim() : (fileName + 1)   ;
//     fs.writeFile(customFileName + '.txt', encText, function (err) {
//         if (err === undefined || err === null) {
//           openConfirmationModal();
//           $('.modal-body').html(`
//               <p style="font-weight: 600; margin-bottom:0;">The file has Encrypted and save successfully.</p>
//               <p style="font-weight: 600; margin-bottom:0;">Please, collect your password.</p>
//               <p style="font-weight: 600; margin-bottom:0;">Password: ${encPassword}</p>
//           `);
//         } else {
//           openConfirmationModal();
//           $('.modal-header h2').val('Error! somthing is wrong.')
//           $('.modal-body').html(`
//               <p style="font-weight: 600; margin-bottom:0;">${err}</p>
//           `);
//         }
//       });
// }












// // decrypt file
// const decrypt = (filePath, password) => {
//    try {
//     let decryptedText;
//     fs.readFile(filePath, 'utf8', (err, data) => {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       let encryptedText = data ;
//       const textParts = encryptedText.split(':');
//       const iv = Buffer.from(textParts.shift(), 'hex');
//       const encryptedData = Buffer.from(textParts.join(':'), 'hex');
//       const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
//       const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
//       const decrypted = decipher.update(encryptedData);

//       try{
//         decryptedText = Buffer.concat([decrypted, decipher.final()]);
//         $('#show-text').val(decryptedText.toString());
//         closeConfirmationModal();
//         // clearPasswordInputFiled();
//         // clearErrorTexts();
//       }
//       catch(e){
//         setConfirmationModalErrorMessage('Password is Invalid, please try again')
//       }
//     });
     
//    } catch (error) {
//      console.log(error)
//    }
//  }

// const buttonCreated = document.getElementById('decrypt-btn'); 
//  buttonCreated.addEventListener('click', function (event) {
//      ipc.send('open-file-dialog-for-decrypt');
//  }); 
//  ipc.on('selected-file-for-decrypt', function (event, path) {
//   if(path == undefined) return;
//     // let pass = document.getElementById('password').value;
//     clearTextContainer();
//     DecryptionFilePath = path
//     openDecryptPasswordModal();

//     // if(pass && pass.trim() != ''){
//     //   decrypt(path, pass);
//     // }else{
//     //   setErrorMessage('Please enter your password')
//     // }
//  });


//  const openDecryptPasswordModal = ()=>{
//   openConfirmationModal();
//   $('#modal-header').append('Decode your file');
//   $('.modal-body').html(`
//       <div class="mb-3">
//         <label for="exampleFormControlInput1" class="form-label fw-bold">Password</label>
//         <input class="form-control rounded-0" id="password"  type="password" placeholder="File Password...">
//         <p class="error-on-confirmation-modal"></p>
//       </div>
      
//   `);

//   $('.modal-footer').append(`
//         <button type="button" class="btn ena-button rounded-0 encSaveButton" 
//         onclick="javascript:decryptFile();return false;" >Decode file</button>
//   `)


//  };

//  function decryptFile (){
//   if(DecryptionFilePath == undefined || DecryptionFilePath == '') return;
//   let pass = document.getElementById('password').value;
//     clearConfirmationModalErrorTexts();
//     if(pass && pass.trim() != ''){
//         decrypt(DecryptionFilePath, pass);
//       }else{
//         setConfirmationModalErrorMessage('Please enter your password')
//       }
//  }






 // save normal/without text file 
//  const saveNormalTextFile = ()=>{
//   openModalOfFileName(true);
//  }

//  const onNormalSaveBtnClick = ()=>{
//   let customFileName = $('#file_Name').val().trim() != '' ? $('#file_Name').val().trim() : 'file';
//   let text = $('#show-text').val();
//   closeConfirmationModal();
//   fs.writeFile(customFileName + '.txt', text, function (err) {
//     if (err === undefined || err === null) {
//       openConfirmationModal();
//       $('.modal-body').html(`
//           <p style="font-weight: 600; margin-bottom:0;">The file save successfully.</p>
//       `);
//     } else {
//       openConfirmationModal();
//       $('.modal-header h2').val('Error! somthing is wrong.')
//       $('.modal-body').html(`
//           <p style="font-weight: 600; margin-bottom:0;">${err}</p>
//       `);
//     }
//   });
//  }

 // modal open 
//  const openConfirmationModal = ()=>{
//   $('.modal').addClass('show');
//   $('.modal').css('display', 'block');
//  }

//  const closeConfirmationModal = ()=>{
//   $('.modal').removeClass('show');
//   $('.modal').css('display', 'none');
//   clearAllSetValue();
//  }

//  const setConfirmationModalErrorMessage = (msg)=>{
//   $(".error-on-confirmation-modal").append(msg);
// }
// const clearConfirmationModalErrorTexts = ()=>{
//   $(".error-on-confirmation-modal").empty();
//  }


 // clear all default value
//  const clearAllSetValue = ()=>{
//   // normal save values
//   $('.encSaveButton').remove();
//   $('#modal-header').empty();


//   // decrypt 
//   $('#password').val('');
//   $(".error-container").val('')
//   DecryptionFilePath = '';

//   clearConfirmationModalErrorTexts();

//  }

// Name modal create 
// const openModalOfFileName = (isFileSaveWithOutEncryption = false)=>{
//   openConfirmationModal();
//   $('#modal-header').append('save current changes');
//   $('.modal-body').html(`
//       <div class="mb-3">
//         <label for="exampleFormControlInput1" class="form-label fw-bold">File Name</label>
//         <input type="text" class="form-control rounded-0" id="file_Name" placeholder="Please enter file name...">
//       </div>
//   `);
//   if(isFileSaveWithOutEncryption){
//     $('.modal-footer').append(`
//         <button type="button" class="btn ena-button rounded-0 encSaveButton" 
//         onclick="onNormalSaveBtnClick()" >Save</button>
//     `)
//   }else{
//     $('.modal-footer').append(`
//         <button type="button" class="btn ena-button rounded-0 encSaveButton" 
//         onclick="saveEncryptedFile()" >Save</button>
//     `)
//   }
// }





 // clear password input filed
// const clearPasswordInputFiled = ()=>{
//   $('#password').val('')
//  }

 // clear textarea filed
//  const clearTextContainer = ()=>{
//     $('#show-text').val('');
//     $("#normal-save-btn").attr('disabled','')
//  }

 //show / clear error text
// const setErrorMessage = (msg)=>{
//   $(".error-container").val(msg);
// }
// const clearErrorTexts = ()=>{
//   $(".error-container").val('')
//  }


 // enable/disable normal save button
//  $("#show-text").keyup(()=>{
//   clearErrorTexts();
//   console.log('keyup');
//     if($('#show-text').val().trim() == ''){
//       $("#normal-save-btn").attr('disabled','')
//     }else{
//       $("#normal-save-btn").removeAttr('disabled')
//     }

//  })

 // open file normaly
 
// const openFileNormaly = (filePath) => {
//   try {
//    fs.readFile(filePath, 'utf8', (err, data) => {
//      if (err) {
//        console.error(err);
//        return;
//      }
//      $('#show-text').val(data);
//      clearPasswordInputFiled();
//      clearErrorTexts();
//    });
    
//   } catch (error) {
//     console.log(error)
//   }
// }

// const openFileNormalyBtn = document.getElementById('open-file-btn'); 
// openFileNormalyBtn.addEventListener('click', function (event) {
//     ipc.send('open-dialog-for-normally-file');
// }); 

// ipc.on('selected-file-normally-open', function (event, path) {
//  if(path == undefined) return;
//  clearTextContainer();
//  openFileNormaly(path);
// });
 
