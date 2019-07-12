
function get_api_data(){
	
	var data_url = "https://api.openweathermap.org/data/2.5/forecast?";    //something.com

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

        // result.list.forEach(function (item) {
        //     _date = new Date(item.dt * 1000);
        //     current_day = _date.getDate();

        //     console.log(_date);
        //     console.log(item.main.temp);

        // });
      
        var current_date = new Date().toISOString().slice(0,10);
        var sum_of_temp = 0, item_per_day = 0, sum_of_humidity = 0;
        var formatted_data = [];
        var a= new Date();
        var weekdays = new Array(7);
        weekdays[0] = "Sunday";
        weekdays[1] = "Monday";
        weekdays[2] = "Tuesday";
        weekdays[3] = "Wednesday";
        weekdays[4] = "Thursday";
        weekdays[5] = "Friday";
        weekdays[6] = "Saturday";

        for (var i = 0; i < result.list.length; i++) {
            _date = new Date(result.list[i].dt * 1000);
            _date_string = _date.toISOString().slice(0,10);

            if (current_date != _date_string) {


                current_date = _date_string
                // console.log(sum_of_temp/item_per_day)

                formatted_data.push({
                  day_of_week: weekdays[_date.getDay()],
                  avg_temp: sum_of_temp/item_per_day,
                  avg_humidity:sum_of_humidity/item_per_day,
                  weather_string: 1
                })

                sum_of_temp= 0;
                item_per_day = 0

            }

            item_per_day = item_per_day + 1;
            sum_of_temp = sum_of_temp + result.list[i].main.temp;
        }

        console.log(formatted_data);

    		// Create a for loop on result
    		// Build this string 

    		// temps = [];
    		// for row in result
    		// 	temps.append("<td>" + row.weather.temperature + "</td>");

    		


  		},
  		error: function(error) {
  			console.log('May error LOLOLO');
  			console.log(error);
  		}
	});
}