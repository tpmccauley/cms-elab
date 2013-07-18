Elab.Dataset = Backbone.Model.extend({
	defaults: {
		type: "Here is the type of the dataset",
		name: "Here is the name of the dataset",
		description: "0 events of no particles",
		image: "",
        svg: "",
		url: "",
		content: "Here is a bit of text describing the contents of the dataset",
		selected: false
	},

	idAttribute: "id"
});

/*
Elab.Chart = Backbone.Model.extend({
    defaults: {
        name: "",
        dimension: {},
        group: {},
        margin: {top: 10, right: 10, bottom: 20, left: 10},
        y: d3.scale.linear().range([200, 0]),
        chid: 0,
        axis: d3.svg.axis().orient("bottom"),
        brush: d3.svg.brush()
    },

    idAttribute: "id"
});

Elab.Charts = Backbone.Collection.extend({
    model: Elab.Chart
});
*/

Elab.Datasets = Backbone.Collection.extend({
	model: Elab.Dataset,

	getSelected: function() {
		selected = this.filter(function(d){
			return d.get('selected') == true;
		});
		return new Elab.Datasets(selected);
	}
});

Elab.ParentParticle = Backbone.Model.extend({
    defaults: {
        name: "Here is the name of the parent particle",
        image: "",
        description: "",
        urls: [],
        selected: false
    },

    idAttribute: "id"
});

Elab.ParentParticles = Backbone.Model.extend({
    model: Elab.ParentParticle,

    getSelected: function() {
        selected = this.filter(function(d){
            return d.get('selected') == true;
        });
        return new Elab.ParentParticles(selected);
    }
});

Elab.DecayProduct = Backbone.Model.extend({
    defaults: {
        name: "Here is the name of the decay product",
        image: "",
        description: "",
        urls: [],
        selected: false
    },

    idAttribute: "id"
});

Elab.DecayProducts = Backbone.Model.extend({
    model: Elab.DecayProduct,

    getSelected: function() {
        selected = this.filter(function(d){
            return d.get('selected') == true;
        });
        return new Elab.DecayProducts(selected);
    }
});

Elab.Parameter = Backbone.Model.extend({
	defaults: {
		name: "Here is the default parameter name",
		unit: "Hectacres",
		description: "I am a parameter",
		selected: false
	},

	idAttribute: "id"
});

Elab.Parameters = Backbone.Collection.extend({
	model: Elab.Parameter,

	getSelected: function() {
		selected = this.filter(function(p){
			return p.get('selected') == true;
		});
		return new Elab.Parameters(selected);
	},

	deselectAll: function() {
		this.each(function(p) {
			p.set('selected', false);
		});
	}
});

Elab.Plot = Backbone.Model.extend({
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
        title:  "default title",
        name: "default name"
    },

    idAttribute: "id",
});

Elab.Plots = Backbone.Collection.extend({
    model: Elab.Plot
});