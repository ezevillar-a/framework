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
            console.log(response);
            $("#feedback").removeClass('invisible');

            if(response == true) {
                var usuario = $("#inputEmail").val();
                $("#feedback").html(usuario + ' se ha logueado');
                $("#feedback").addClass('text-success');
                $("#feedback").removeClass('text-danger');
                $("#inputEmail").val("");
                $("#inputPassword").val("");
            } else {
                $("#feedback").html('Usuario o Password erróneo');
                $("#feedback").addClass('text-danger');
                $("#feedback").removeClass('text-success');
            };

        }, 
        error: function() {
            console.log("An error has occured");
        }
    });
});

