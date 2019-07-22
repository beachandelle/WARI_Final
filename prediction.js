const KNN = require('ml-knn');

window.predict = fuction(training, prediction, number) {
	var knn;
	for(var i = 1; i <= number; i++) {
		knn = new KNN(training.data, training.label, {k: i});
		a = knn.predict(prediction);
		console.log(a);
	}

}

training = {
	data: [
		[40, 1],
		[30, 0],
		[28, 0],
		[27, 0],
		[32, 0],
		[38, 1],
		[23, 2],
		[35, 1],
		[29, 0],
		[24, 2], 
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
		]
};

predict(training, [27, ], 4);