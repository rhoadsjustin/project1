$( document ).ready(function() {
  $('form').on('submit', function(e){
    var searchRequest = $('form').serialize();
    e.preventDefault();
    $.ajax({
      method: "GET",
      url: "http://localhost:3000/yelpapi/"+searchRequest
      success: onSuccess,
      error: onError
    });


  })

  function onSuccess(json){
    var results = json.jsonBody.businesses
    for (var i = 0; i < 15; i++) {
      var template = `<div class="col-md-6 thumbnail">
        <div class="card mb-3">
          <img class="card-img-top" src=<%= results[i].image_url %> alt="Card image cap">
          <div class="card-block">
            <h4 class="card-title"> <%= results[i].name %> </h4>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text"><small class="text-muted"><a href= <%= results[i].url %></small></p>
          </div>
        </div>
    </div>`;
  }
}

  function onError(){
    console.log("error");
  }
