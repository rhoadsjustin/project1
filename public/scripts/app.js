console.log("this is working");

$( document ).ready(function() {
    $('.thumbnail').on('shown.bs.modal', function() {
    $(this).focus();
})


});
