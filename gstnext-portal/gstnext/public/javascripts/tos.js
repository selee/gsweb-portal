//var couch = 'http://ec2-67-202-6-195.compute-1.amazonaws.com/couch/';
//var couch = '/couch';
var couch = '/node';

$(document).ready(function(){
	$('#accept-tos').click(function(){
		//alert(getCookie('id'));
		$.ajax({
			type: 'POST',
			url: couch + '/acceptTOS/' + getCookie('id'),
			success: function(data){
				alert('success!');
			}
		});
	});
});
