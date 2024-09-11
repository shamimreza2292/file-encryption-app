// const path = require('path');
// let os = require('os');
// const { rejects } = require('assert');
// const { dialog } = require('electron')
// const { ipcRenderer } = require('electron')
// let $ = jQuery = require('jquery');
  
// let fs = require('fs');
// const electron = require('electron')



// const crypto = require("crypto");
// const { log } = require('console');
// const ipc = require('electron').ipcRenderer;

// import {openConfirmationModal} from '../shared/confirmation.modal';
// const  {openConfirmationModal} = require('E:/New folder/electron-project/render/shared/confirmation.modal.js');
console.log(path.resolve('render/shared/confirmation.modal.js'));
// const  {openConfirmationModal} = require(path.resolve('render/shared/confirmation.modal.js'));


let DecryptionFilePath = '';





// decrypt file
const decrypt = (filePath, password) => {
    try {
     let decryptedText;
     fs.readFile(filePath, 'utf8', (err, data) => {
       if (err) {
         console.error(err);
         return;
       }
       let encryptedText = data ;
       const textParts = encryptedText.split(':');
       const iv = Buffer.from(textParts.shift(), 'hex');
       const encryptedData = Buffer.from(textParts.join(':'), 'hex');
       const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
       const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
       const decrypted = decipher.update(encryptedData);
 
       try{
         decryptedText = Buffer.concat([decrypted, decipher.final()]);
         $('#show-text').val(decryptedText.toString());
         closeConfirmationModal();
         // clearPasswordInputFiled();
         // clearErrorTexts();
       }
       catch(e){
         setConfirmationModalErrorMessage('Password is Invalid, please try again')
       }
     });
      
    } catch (error) {
      console.log(error)
    }
  }
 
 const buttonCreated = document.getElementById('decrypt-btn'); 
  buttonCreated.addEventListener('click', function (event) {
      ipc.send('open-file-dialog-for-decrypt');
  }); 
  ipc.on('selected-file-for-decrypt', function (event, path) {
   if(path == undefined) return;
     // let pass = document.getElementById('password').value;
     clearTextContainer();
     DecryptionFilePath = path
     openDecryptPasswordModal();
 
     // if(pass && pass.trim() != ''){
     //   decrypt(path, pass);
     // }else{
     //   setErrorMessage('Please enter your password')
     // }
  });
 
 
  const openDecryptPasswordModal = ()=>{
   openConfirmationModal();
   $('#modal-header').append('Decode your file');
   $('.modal-body').html(`
       <div class="mb-3">
         <label for="exampleFormControlInput1" class="form-label fw-bold">Password</label>
         <input class="form-control rounded-0" id="password"  type="password" placeholder="File Password...">
         <p class="error-on-confirmation-modal"></p>
       </div>
       
   `);
 
   $('.modal-footer').append(`
         <button type="button" class="btn ena-button rounded-0 encSaveButton" 
         onclick="javascript:decryptFile();return false;" >Decode file</button>
   `)
 
 
  };
 
  function decryptFile (){
   if(DecryptionFilePath == undefined || DecryptionFilePath == '') return;
   let pass = document.getElementById('password').value;
     clearConfirmationModalErrorTexts();
     if(pass && pass.trim() != ''){
         decrypt(DecryptionFilePath, pass);
       }else{
         setConfirmationModalErrorMessage('Please enter your password')
       }
  }
 
 
 



//  const setConfirmationModalErrorMessage = (msg)=>{
//     $(".error-on-confirmation-modal").append(msg);
//   }
//   const clearConfirmationModalErrorTexts = ()=>{
//     $(".error-on-confirmation-modal").empty();
//    }














 









