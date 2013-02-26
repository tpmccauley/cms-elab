var Dataset = Backbone.Model.extend({
	defaults: {
		type: "Here is the type of the dataset",
		name: "Here is the name of the dataset",
		description: "0 events of no particles",
		image: "",
		url: "",
		content: "Here is a bit of text describing the contents of the dataset"
	},
	idAttribute: "id"
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
		data: [],

		options: {
			lines: { 
				show: true, 
				fill: false, 
				lineWidth: 1.2 
			},

    		grid: { 
    			hoverable: true, 
    			autoHighlight: false 
    		},
    
    		points: { 
    			show: false 
    		},

    		legend: { 
    			noColumns: 1 
    		},

    		xaxis: { 
    			tickDecimals: 0 
    		},

    		yaxis: { 
    			autoscaleMargin: 0.1 
    		}
		},

		xlabel: "default x label",
		ylabel: "default y label",
		title:  "default title"
	}
});







