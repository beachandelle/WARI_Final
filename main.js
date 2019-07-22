
$(function (){

	$.ajax({
  		url: "https://openweathermap.org/api",
  		data: {
   			zipcode: 4327
 		 },
  		success: function( result ) {
    		$( "#weather-temp" ).html( "<strong>" + result + "</strong> degrees" );
  		}
	});
});