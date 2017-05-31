console.log("this is working");

$( document ).ready(function() {
    $('.thumbnail').on('shown.bs.modal', function() {
    $(this).focus();
})

  $('.restaurant').on('submit', function(e){
    var search = $('#searchbar').val();
    console.log(search);
      $.ajax({
        method: "GET",
        url: `http://localhost:3000/${search}`,
        success: onSuccess,
        error: onError
      })
    function onSuccess(json){
      console.log("yay!");
    }
    function onError(json){
      console.log("Boo!");
    }
  })
});
