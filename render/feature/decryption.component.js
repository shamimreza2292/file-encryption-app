const jQuery =  require('jquery') ; //jQuery from 'jquery';

const fs = require('fs');
const ipc = require('electron').ipcRenderer;
const path = require('path');
const  {openConfirmationModal, closeConfirmationModal} = require(path.resolve('render/shared/confirmation.modal.js'));



export class DecryptionComponent {
    
DecryptionFilePath = '';

fileName = '';
encPassword = '';
encText = '';

constructor(){
    console.log('log DecryptionComponent');
}




// decrypt file
decrypt(filePath, password) {
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
         jQuery('#show-text').val(decryptedText.toString());
         this.clearAllSetValue();
         closeConfirmationModal();
       }
       catch(e){
         this.setConfirmationModalErrorMessage('Password is Invalid, please try again')
       }
     });
      
    } catch (error) {
      console.log(error)
    }
  }



  onButtonClick(){
    //  buttonCreated = document.getElementById('decrypt-btn'); 
    //   buttonCreated.addEventListener('click', function (event) {
    //       ipc.send('open-file-dialog-for-decrypt');
    //   }); 
    //   ipc.on('selected-file-for-decrypt', function (event, path) {
    //    if(path == undefined) return;
    //      clearTextContainer();
    //      DecryptionFilePath = path
    //      openDecryptPasswordModal();
    
    //   });

      ipc.send('open-file-dialog-for-decrypt');
      ipc.once('selected-file-for-decrypt', (event, path) => {
       if(path == undefined) return;
        this.clearTextContainer();
         this.DecryptionFilePath = path
         this.openDecryptPasswordModal();
         this.setEventListenerForDecryptFileBtn();
      });

  }
 
openDecryptPasswordModal(){
   openConfirmationModal();
   jQuery('#modal-header').html('Decode your file');
   jQuery('.modal-body').html(`
       <div class="mb-3">
         <label for="exampleFormControlInput1" class="form-label fw-bold">Password</label>
         <input class="form-control rounded-0" id="password"  type="password" placeholder="File Password...">
         <p class="error-on-confirmation-modal"></p>
       </div>
       
   `);
 
  //  jQuery('.modal-footer').append(`
  //        <button type="button" id="decryptFileBtn" class="btn ena-button rounded-0 encSaveButton" 
  //        onclick="javascript:this.decryptFile();return false;" >Decode file</button>
  //  `)
   jQuery('.modal-footer').append(`
         <button type="button" id="decryptFileBtn" class="btn ena-button rounded-0 encSaveButton" 
         >Decode file</button>
   `)
  };
 
  decryptFile (){
   if(this.DecryptionFilePath == undefined || this.DecryptionFilePath == '') return;
   let pass = document.getElementById('password').value;
     this.clearConfirmationModalErrorTexts();
     if(pass && pass.trim() != ''){
         this.decrypt(this.DecryptionFilePath, pass);
       }else{
         this.setConfirmationModalErrorMessage('Please enter your password')
       }
  }




// Encript FIle
  randomPassword(){
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789@#$';
    for (let i = 1; i <= 4; i++) {
        var char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char)
    }
    return pass;
  }




  encrypt = (filePath, password) => {
    try {    
      fs.readFile(filePath, 'utf8', (err, data) => {
        if(filePath!=''){
          let pathSplite = filePath.split(`\\`);
          this.fileName = pathSplite[pathSplite.length - 1];
        }
        if (err) {
          console.error(err);
          return;
        }
  
        let  plainText = data;
        this.encPassword = password
  
        const iv = crypto.randomBytes(16);
        const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);  
        let encrypted = cipher.update(plainText);
        encrypted = Buffer.concat([encrypted, cipher.final()]);  
        this.encText = iv.toString('hex') + ':' + encrypted.toString('hex');
        this.openModalOfFileName();
        this.setEventListenerForEncryptFileBtneBtn();
      });
    } catch (error) {
      console.log(error);
    }
  }


  onEncryptionButtonClick(){
    ipc.send('open-file-dialog-for-encrypt');
    ipc.once('selected-file-for-encrypt', (event, path) => {
      this.clearErrorTexts()
       let pass = this.randomPassword();
       if(pass){
         this.encrypt(path, pass);
         
       }else{
         // open a dialog
       }
    });
  }


  saveEncryptedFile(){
    closeConfirmationModal();
    this.clearAllSetValue();
    let customFileName = $('#file_Name').val().trim() != '' ? $('#file_Name').val().trim() : (this.fileName + 1)   ;
      fs.writeFile(customFileName + '.txt', this.encText, (err)=>{
          if (err === undefined || err === null) {
            openConfirmationModal();
            $('.modal-body').html(`
                <p style="font-weight: 600; margin-bottom:0;">The file has Encrypted and save successfully.</p>
                <p style="font-weight: 600; margin-bottom:0;">Please, collect your password.</p>
                <p style="font-weight: 600; margin-bottom:0;">Password: ${this.encPassword}</p>
            `);
          } else {
            openConfirmationModal();
            $('.modal-header h2').val('Error! somthing is wrong.')
            $('.modal-body').html(`
                <p style="font-weight: 600; margin-bottom:0;">${err}</p>
            `);
          }
        });
  }


  openModalOfFileName(isFileSaveWithOutEncryption = false){
    openConfirmationModal();
    $('#modal-header').append('save current changes');
    $('.modal-body').html(`
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label fw-bold">File Name</label>
          <input type="text" class="form-control rounded-0" id="file_Name" placeholder="Please enter file name...">
        </div>
    `);
    if(isFileSaveWithOutEncryption){
      $('.modal-footer').append(`
          <button type="button" class="btn ena-button rounded-0 encSaveButton" 
          onclick="onNormalSaveBtnClick()" >Save</button>
      `)
    }else{
      $('.modal-footer').append(`
          <button type="button" id="encryptFileBtn" class="btn ena-button rounded-0 encSaveButton" 
          >Save</button>
      `)
    }
  }








// Extra functionality
  clearTextContainer(){
    jQuery('#show-text').val('');
    jQuery("#normal-save-btn").attr('disabled','')
  }

  clearConfirmationModalErrorTexts(){
    jQuery(".error-on-confirmation-modal").empty();
  }
  setConfirmationModalErrorMessage(msg){
    jQuery(".error-on-confirmation-modal").append(msg);
  }

  clearAllSetValue (){
    // normal save values
    jQuery('.encSaveButton').remove();
    jQuery('#modal-header').empty();
  
    // decrypt 
    jQuery('#password').val('');
    jQuery(".error-container").text('');


    jQuery(".error-on-confirmation-modal").text('');
    this.DecryptionFilePath = '';
  
    this.clearConfirmationModalErrorTexts();
  
   }

  clearErrorTexts(){
    jQuery(".error-container").val('')
   }






  setEventListenerForDecryptFileBtn(){
    let decryptFileBtn = document.getElementById("decryptFileBtn");
    // "addEventListener" and (to support IE8 and earlier) "attachEvent".
    if (decryptFileBtn && decryptFileBtn.addEventListener) {
      decryptFileBtn.addEventListener('click', function() {
          decryptionComponent.decryptFile();
      }, false);
    }
    else if (decryptFileBtn && decryptFileBtn.attachEvent) {
      decryptFileBtn.attachEvent('onclick', function() {
          decryptionComponent.decryptFile();
      });
    }
  }
  
  setEventListenerForEncryptFileBtneBtn(){
    let encryptFileBtn = document.getElementById("encryptFileBtn");
    // "addEventListener" and (to support IE8 and earlier) "attachEvent".
    if (encryptFileBtn && encryptFileBtn.addEventListener) {
      encryptFileBtn.addEventListener('click', function() {
          decryptionComponent.saveEncryptedFile();
      }, false);
    }
    else if (encryptFileBtn && encryptFileBtn.attachEvent) {
      encryptFileBtn.attachEvent('onclick', function() {
          decryptionComponent.saveEncryptedFile();
      });
    }
  }

 
 




  
}





// ======================= call events ==================

let decryptionComponent = new DecryptionComponent();

// oepn decrypt file selection modal
let decryptBtn = document.getElementById("decrypt-btn");
// "addEventListener" and (to support IE8 and earlier) "attachEvent".
if (decryptBtn.addEventListener) {
  decryptBtn.addEventListener('click', function() {
      decryptionComponent.onButtonClick();
  }, false);
}
else if (decryptBtn.attachEvent) {
  decryptBtn.attachEvent('onclick', function() {
      decryptionComponent.onButtonClick();
  });
}

// oepn decrypt file selection modal
const encryptBtn = document.getElementById('encrypt-btn'); 
if (encryptBtn.addEventListener) {
  encryptBtn.addEventListener('click', function() {
      decryptionComponent.onEncryptionButtonClick();
  }, false);
}
else if (encryptBtn.attachEvent) {
  encryptBtn.attachEvent('onclick', function() {
      decryptionComponent.onEncryptionButtonClick();
  });
}



// closeConfirmationModal or common close button for modal 
let closeModalBtn = document.getElementById("closeModalBtn");
// "addEventListener" and (to support IE8 and earlier) "attachEvent".
if (closeModalBtn && closeModalBtn.addEventListener) {
  closeModalBtn.addEventListener('click', ()=>{
    decryptionComponent.clearAllSetValue();    
    closeConfirmationModal();

  }, false);
}
else if (closeModalBtn && closeModalBtn.attachEvent) {
  closeModalBtn.attachEvent('onclick', function() {
    decryptionComponent.clearAllSetValue();
    closeConfirmationModal();
  });
}


