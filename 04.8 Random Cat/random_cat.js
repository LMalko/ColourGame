$('#btn').click(function(){
    $.ajax({
        method: "GET",
        url: "http:\\/\\/aws.random.cat\\/meow",
        dataType: "json"
    })
        .done(changePicture)
        .fail(function(){
            // do sth
            console.log("REQUEST WAS NOT PAWSIBBLE hehe")
        });
});



function changePicture(data){
    $("#photo").attr("src", data.file)
}