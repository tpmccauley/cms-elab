var Dataset = Backbone.Model.extend({
	defaults: {
		type: "Here is the type of the dataset",
		name: "Here is the name of the dataset",
		description: "0 events of no particles",
		image: "",
		url: "",
		content: "Here is a bit of text describing the contents of the dataset"
	}
});

var Datasets = Backbone.Collection.extend({
	model: Dataset
});

var Parameter = Backbone.Model.extend({
	defaults: {
		name: "Here is the default parameter name",
		unit: "Hectacres",
		description: "I am a parameter",
		selected: false
	}
});

var Parameters = Backbone.Collection.extend({
	model: Parameter
});

var Plot = Backbone.Model.extend({
	defaults: {
		xlabel: "X",
		ylabel: "Y",
		xmin: 0.0,
		xmax: 0.0,
		nbins: 0,
		title: "Title",
		binwidth: 0.0
	}
});



