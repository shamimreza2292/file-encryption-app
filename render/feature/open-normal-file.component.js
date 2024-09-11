const jQuery =  require('jquery') ; 


export class OpenNormalFileComponent{
    constructor(){



    }


    onOpenNormalFileBtnClick(){
        ipc.send('open-dialog-for-normally-file');
        ipc.on('selected-file-normally-open', (event, path)=>{
            if(path == undefined) return;
            this.clearTextContainer();
            this.openFileNormaly(path);
        });

    }


    
openFileNormaly (filePath) {
    try {
     fs.readFile(filePath, 'utf8', (err, data) => {
       if (err) {
         console.error(err);
         return;
       }
       $('#show-text').val(data);
       this.clearPasswordInputFiled();
       this.clearErrorTexts();
     });
      
    } catch (error) {
      console.log(error)
    }
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
        <button type="button" class="btn ena-button rounded-0 encSaveButton" id="normalSaveBtnOnPopup"
        >Save</button>
    `)
  }else{
    $('.modal-footer').append(`
        <button type="button" class="btn ena-button rounded-0 encSaveButton" 
        onclick="saveEncryptedFile()" >Save</button>
    `)
  }
}



onNormalSaveBtnClick = ()=>{
  let customFileName = $('#file_Name').val().trim() != '' ? $('#file_Name').val().trim() : 'file';
  let text = $('#show-text').val();
  closeConfirmationModal();
  fs.writeFile(customFileName + '.txt', text, (err)=>{
    if (err === undefined || err === null) {
      this.clearAllSetValue();
      openConfirmationModal();
      $('.modal-body').html(`
          <p style="font-weight: 600; margin-bottom:0;">The file save successfully.</p>
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




// clear 

clearPasswordInputFiled(){
    $('#password').val('')
}

clearTextContainer(){
    $('#show-text').val('');
    $("#normal-save-btn").attr('disabled','')
}

clearErrorTexts(){
  $(".error-container").val('')
}

saveNormalTextFile(){
  this.openModalOfFileName(true);
  this.bindClickEventForNormalSaveBtn();
}

onTypeOnShowTextField(){
  // $("#show-text").keyup(()=>{
    clearErrorTexts();
    console.log('keyup');
      if($('#show-text').val().trim() == ''){
        $("#normal-save-btn").attr('disabled','')
      }else{
        $("#normal-save-btn").removeAttr('disabled')
      }

  // })

}

clearAllSetValue (){
  // normal save values
  jQuery('.encSaveButton').remove();
  jQuery('#modal-header').empty();

  // decrypt 
  jQuery('#password').val('');
  jQuery(".error-container").text('');

  jQuery(".error-on-confirmation-modal").text('');
  
  this.clearConfirmationModalErrorTexts();
}

 clearConfirmationModalErrorTexts(){
  jQuery(".error-on-confirmation-modal").empty();
}





// bind event

bindClickEventForNormalSaveBtn(){
  const normalSaveBtnOnPopup = document.getElementById('normalSaveBtnOnPopup'); 
  // "addEventListener" and (to support IE8 and earlier) "attachEvent".
  if (normalSaveBtnOnPopup && normalSaveBtnOnPopup.addEventListener) {
      normalSaveBtnOnPopup.addEventListener('click', ()=>{
          this.onNormalSaveBtnClick();    
    }, false);
  }
  else if (normalSaveBtnOnPopup && normalSaveBtnOnPopup.attachEvent) {
          normalSaveBtnOnPopup.attachEvent('onclick', function() {
          this.onNormalSaveBtnClick();    
    });
  }

}





}

let normalFileInstance = new OpenNormalFileComponent();

// 
const openFileNormalyBtn = document.getElementById('open-file-btn'); 
// "addEventListener" and (to support IE8 and earlier) "attachEvent".
if (openFileNormalyBtn && openFileNormalyBtn.addEventListener) {
    openFileNormalyBtn.addEventListener('click', ()=>{
        normalFileInstance.onOpenNormalFileBtnClick();    
  }, false);
}
else if (openFileNormalyBtn && openFileNormalyBtn.attachEvent) {
    openFileNormalyBtn.attachEvent('onclick', function() {
        normalFileInstance.onOpenNormalFileBtnClick();    
  });
}


const clearTextContainerBtn = document.getElementById('clearTextContainerBtn'); 
// "addEventListener" and (to support IE8 and earlier) "attachEvent".
if (clearTextContainerBtn && clearTextContainerBtn.addEventListener) {
      clearTextContainerBtn.addEventListener('click', ()=>{
        normalFileInstance.clearTextContainer();    
  }, false);
}
else if (clearTextContainerBtn && clearTextContainerBtn.attachEvent) {
        clearTextContainerBtn.attachEvent('onclick', function() {
        normalFileInstance.clearTextContainer();    
  });
}

const normalsavebtn = document.getElementById('normal-save-btn'); 
// "addEventListener" and (to support IE8 and earlier) "attachEvent".
if (normalsavebtn && normalsavebtn.addEventListener) {
    normalsavebtn.addEventListener('click', ()=>{
        normalFileInstance.saveNormalTextFile();    
  }, false);
}
else if (normalsavebtn && normalsavebtn.attachEvent) {
        normalsavebtn.attachEvent('onclick', function() {
        normalFileInstance.saveNormalTextFile();    
  });
}

const showtextKeyUpContainer = document.getElementById('show-text'); 
// "addEventListener" and (to support IE8 and earlier) "attachEvent".
if (showtextKeyUpContainer && showtextKeyUpContainer.addEventListener) {
  showtextKeyUpContainer.addEventListener('keyup', ()=>{
        normalFileInstance.onTypeOnShowTextField();    
  }, false);
}
else if (showtextKeyUpContainer && showtextKeyUpContainer.attachEvent) {
        showtextKeyUpContainer.attachEvent('onkeyup', function() {
        normalFileInstance.onTypeOnShowTextField();    
  });
}





