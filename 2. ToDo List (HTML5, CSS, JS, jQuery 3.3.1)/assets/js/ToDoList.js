$("li").on("click", function(){
	$(this).toggleClass("completed");
});

$("span").on("click", function(event){
	$(this).parent().css("color", "crimson");
	$(this).parent().fadeOut(1200, function(){
		$(this).remove();
	});
	
	event.stopPropagation();


});
 