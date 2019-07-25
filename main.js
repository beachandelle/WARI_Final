function update_UI(data){


  t= document.getElementById("weeks");

  head = t.children[0].children[0];
  temp = t.children[1].children[0];
  humidity = t.children[1].children[1];
  rain = t.children[1].children[2];
  for (i= 0; i < data.length; i++){
    head.children[i + 1].innerHTML = data[i].day_of_week;
    temp.children[i + 1].innerHTML = data[i].avg_temp;
    humidity.children[i + 1].innerHTML = data[i].avg_humidity;
    rain.children[i + 1].innerHTML = data[i].avg_rain;
  }

};

function get_api_data(){
	
	var data_url = "https://api.openweathermap.org/data/2.5/forecast?";    //something.com

	$.ajax({
  		url: data_url,
  		data: {
   			lat: lat,
   			lon: lon,
   			appid: "8e6e2c567bfd03271f75ef8bf39db463",
 		 },
  		success: function( result ) {



        // result.list.forEach(function (item) {
        //     _date = new Date(item.dt * 1000);
        //     current_day = _date.getDate();

        //     console.log(_date);
        //     console.log(item.main.temp);

        // });
      
        var current_date = new Date().toISOString().slice(0,10);
        var sum_of_temp = 0, item_per_day = 0, sum_of_humidity = 0; sum_of_rain = 0;
        var formatted_data = [];
        var a= new Date();
        var weekdays = new Array(7);
        weekdays[0] = "Saturday";
        weekdays[1] = "Sunday";
        weekdays[2] = "Monday";
        weekdays[3] = "Tuesday";
        weekdays[4] = "Wednesday";
        weekdays[5] = "Thursday";
        weekdays[6] = "Friday";

        for (var i = 0; i < result.list.length; i++) {
            _date = new Date(result.list[i].dt * 1000);
            _date_string = _date.toISOString().slice(0,10);

            if (current_date != _date_string) {


                current_date = _date_string
                // console.log(sum_of_temp/item_per_day)

                formatted_data.push({
                  day_of_week: weekdays[_date.getDay()],
                  avg_temp: Math.round(((sum_of_temp  / item_per_day)-273.15))*100/100,
                  avg_humidity: Math.round(sum_of_humidity / item_per_day)*100/100,
                  avg_rain: Math.round(sum_of_rain / item_per_day)*100/100,
                  weather_string: 1
                })

                sum_of_temp= 0;
                item_per_day = 0;
                sum_of_humidity = 0;
                sum_of_rain = 0;
            }

            item_per_day = item_per_day + 1;
            sum_of_temp = sum_of_temp + result.list[i].main.temp;
            sum_of_humidity= sum_of_humidity + result.list[i].main.humidity;

            console.log(result.list[i].rain);
              if (result.list[i].rain != null) {
              sum_of_rain= sum_of_rain + result.list[i].rain["3h"];

            }



        }

        update_UI(formatted_data);

        training = {
          data: [
              [26, 27, 28, 29, 30, 1 ,1, 0],
              [23, 24, 25, 26, 27, 2, 1, 0],
              [21, 24, 26, 28, 30, 3, 1, 0],
              [24, 25, 26, 27, 28, 1, 1, 1],
              [23, 24, 25, 26, 27, 1, 1, 1],
              [24, 25, 26, 27, 28, 5, 1, 1],
              [29, 30, 31, 32, 33, 3, 1, 1],
              [28, 29, 30, 31, 32, 2, 1, 1],
              [18, 19, 20, 21, 22, 4, 1, 1],
              [14, 15, 16, 17, 18, 3, 0, 1], 
              [30, 31, 32, 33, 34, 1, 1, 1],
              [20, 21, 22, 23, 24, 4, 0, 1],
              [18, 19, 20, 21, 22, 4, 0, 1],
              [19, 20, 21, 22, 23, 4, 0, 1],
              [23, 24, 25, 26, 27, 1, 1, 0],
              [22, 23, 24, 25, 26, 2, 1, 0],
              [25, 26, 27, 28, 29, 2, 1, 0],
              [17, 18, 19, 20, 21, 1, 0, 1],
              [16, 17, 18, 19, 20, 1, 0, 1],
              [25, 26, 27, 28, 29, 1, 0, 1],
              ],
          label: [
            "okra",
            "patola",
            "talong",
            "upo",
            "luya",
            "ampalaya",
            "kamatis",
            "sitaw",
            "pechay",
            "labanos",
            "repolyo",
            "mustasa",
            "spinach",
            "kalabasa",
            "mais",
            "pinya",
            "kamote",
            "sibuyas",
            "bawang",
            "patatas",
            ]
        };
        var b= new Date();
        var month = new Array(12);
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        var n = month[b.getMonth()];
        var predict = [], number_of_plants = 3;
        
          for(var i = 0; i < formatted_data.length; i++) {
            predict.push(formatted_data[i].avg_temp);
          }

          // Check rain here
            predict.push(3);

            // change true
              if (month == 2 || month == 3 || month == 4 || month == 5 ) {
                predict.push(1);
                predict.push(0);
              } 
              else {
                predict.push(0);
                predict.push(1);
              }

        var veg = window.predict(training, predict, number_of_plants);
        var plts = document.getElementById("plants");


        for(var i = 0; i < plts.children.length; i++) {
          if (veg.includes(plts.children[i].id)) {
            plts.children[i].style.display = "float";
          } else {
            plts.children[i].style.display = "none";
          }
        }

        $(".se-pre-con").fadeOut("slow");
  		},
  		error: function(error) {
  		}

	});
};