
const $ =  require('jquery') ; 

const openConfirmationModal = ()=>{
    $('.modal').addClass('show');
    $('.modal').css('display', 'block');
}

const closeConfirmationModal = ()=>{
    $('.modal').removeClass('show');
    $('.modal').css('display', 'none');
    // clearAllSetValue();
}


module.exports = {openConfirmationModal, closeConfirmationModal};












