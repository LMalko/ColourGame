// Add event listeners to elements that exist when page loads, here it's <ul>.
$("ul").on("click", "li", function(){
	$(this).toggleClass("completed");
});

$("ul").on("click", "span", function(event){
	$(this).parent().css("color", "crimson");
	$(this).parent().fadeOut(1200, function(){
		$(this).remove();
	});
	
	event.stopPropagation();


});

$("input[type='text']").on("keypress", function(event){
 	if(event.which === 13){
 		var toDoText = $(this).val();

 		// Clear input.
 		$(this).val("")

 		$("ul").append("<li><span><i class='fas fa-trash-alt'></i></span> " + toDoText.substring(0,1).toUpperCase() + toDoText.substring(1) + "</li>");


 	}
});

$(".fa-child").on("click", function(){
	$("input[type=text]").fadeToggle();
});
 