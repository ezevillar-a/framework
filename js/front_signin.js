$("form").submit(function(e){
    e.preventDefault();

    $.ajax({
        type: "POST",
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
            $("#feedback").html(response);  
            
            console.log(response);
        }, 
        error: function() {
            console.log("An error has occured");
        }
    });
});

