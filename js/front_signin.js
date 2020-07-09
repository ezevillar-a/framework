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

            if (response == "Usuario logueado satisfactoriamente"){
                $("#feedback").removeClass('badge badge-danger');
                $("#feedback").addClass('badge badge-success');
            } else {
                $("#feedback").removeClass('badge badge-success');
                $("#feedback").addClass('badge badge-danger');
            }
            
            console.log(response);
        }, 
        error: function() {
            console.log("An error has occured");
        }
    });
});

