
function get_api_data(){

	var app_id = "APIKEY";
	var data_url = "api.openweathermap.org/data/2.5/forecast?lat={}&lon={}";    //something.com

	$.ajax({
  		url: data_url,
  		data: {
   			lat: 14.0364,
   			lon: 121.6533,
   			appid: "8e6e2c567bfd03271f75ef8bf39db463",
 		 },
  		success: function( result ) {
  			console.log('Okay na.. kausapin nyo na ulit ako.');
    		console.log(result);
  		},
  		error: function(error) {
  			console.log('May error LOLOLO');
  			console.log(error);
  		}
	});
}