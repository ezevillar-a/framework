$("form").submit(function(e){
    e.preventDefault();

    $.ajax({
        type: "POST",
        dataType: 'json',
        //useDefaultXhrHeader: false, //Cors important, otherwise its not working
        url: "http://localhost:3005/signin",
        contentType : 'application/json',
        data: JSON.stringify(
                            { 
                                "user": $("#inputEmail").val(), 
                                "password" : $("#inputPassword").val()
                            }
                            ),
        success: function(response) {
            $("#feedback").removeClass('invisible');
            $("#feedback").html(response + "logueado");  
          
            console.log(response);
        }, 
        error: function() {
            console.log("An error has occured");
        }
    });
});

