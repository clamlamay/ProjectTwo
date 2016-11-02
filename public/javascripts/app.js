console.log('Window is Loaded')


function getFormValues(){
	var formObject = {
		username: $("input[name=username]").val(),
		password: $("input[name=password_hash]").val(),
		email: $("input[name=email]").val(),
	}
	return formObject;
};

$('button').on('click', function(event){
	event.preventDefault();
	$.ajax({
	url: '/register',
	type: 'Post',
	data: getFormValues(),
	dataType: 'json',
	success: function(data){
		console.log(data);
	},
	error: function(err){
		console.log(err)
	}
})
