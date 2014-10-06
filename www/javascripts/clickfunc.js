$(document).on('click', '.bs-callout', function(){
	if ($(this).hasClass('bs-callout-success')) {
		$(this).removeClass('bs-callout-success');
	}
	else {
		$(this).addClass('bs-callout-success');
	}
})