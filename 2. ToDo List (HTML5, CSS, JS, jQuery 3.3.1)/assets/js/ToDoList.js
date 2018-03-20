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

 		$("ul").append("<li><span>X</span> " + toDoText + "</li>");


 	}
});
 