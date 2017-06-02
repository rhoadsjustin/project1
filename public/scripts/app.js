console.log("this is working");

$( document ).ready(function() {
    $('#newItem').on('submit', function(e){
      e.preventDefault();
      var restId = $('input[type=hidden][name=restaurant-Id]').val();
      var newItem = $('input[type=text][name=newItem]').val();
      console.log(restId + newItem);
      $.ajax({
        method: "POST",
        url: `/restaurant/${restId}/item`,
        data: {name: newItem},
        success: onSuccess,

      })
      function onSuccess(json){
        console.log("YOU'VE added it successfully!");
      }

    });

    $('#deleteItem').on('submit', function(e){
      e.preventDefault();
      var restId = $('input[type=hidden][name=restaurant-Id]').val();
      var deleteItem = $('input[type=hidden][name=item-Id]').val();
      console.log(restId + deleteItem);
      $.ajax({
        method: "DELETE",
        url: `/restaurant/${restId}/item/${deleteItem}`,
        data: {_id: deleteItem},
        success: deleteSuccess,

      })
      function deleteSuccess(json){
        console.log("YOU'VE deleted it successfully!");
      }

    });


});
