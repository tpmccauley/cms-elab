var Dataset = Backbone.Model.extend({
	defaults: {
		type: "Here is the type of the dataset",
		name: "Here is the name of the dataset",
		description: "0 events of no particles",
		image: "",
		url: "",
		content: "Here is a bit of text describing the contents of the dataset",
		selected: false
	},

	/*
	initialize: function() {
        this.bind('change:selected', this.datasetSelected);
    },

	datasetSelected: function() {
		console.log(this.get('name'), this.get('selected'));
	},
	*/

	idAttribute: "id"
});

var Datasets = Backbone.Collection.extend({
	model: Dataset,

	getSelected: function() {
		selected = this.filter(function(d){
			return d.get('selected') == true;
		});
		return new Datasets(selected);
	}
});

var Parameter = Backbone.Model.extend({
	defaults: {
		name: "Here is the default parameter name",
		unit: "Hectacres",
		description: "I am a parameter",
		selected: false
	},

	/*
	initialize: function() {
		this.bind('change:selected', this.parameterSelected);
	},

	parameterSelected: function() {
		console.log(this.get('name'), this.get('selected'));
	},
	*/

	idAttribute: "id"
});

var Parameters = Backbone.Collection.extend({
	model: Parameter,

	getSelected: function() {
		selected = this.filter(function(p){
			return p.get('selected') == true;
		});
		return new Parameters(selected);
	},

	deselectAll: function() {
		this.each(function(p) {
			p.set('selected', false);
		});
	}
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
    		},

			crosshair: {
				mode: "x" 
			},

			selection: {
				mode: "x",
				color: "yellow"
			}
		},

		xlabel: "default x label",
		ylabel: "default y label",
		title:  "default title"
	},

	idAttribute: "id"
});

var Plots = Backbone.Collection.extend({
	model: Plot
});