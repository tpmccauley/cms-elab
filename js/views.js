var DatasetPageView = Backbone.View.extend({
	el: "#datasets",

	template: _.template($('#dataset-page').html()),

	render: function() {
		$(this.el).append(this.template());
	}
});

var DatasetListView = Backbone.View.extend({
	el: "#dataset-views",

	initialize: function() {
		this.collection = this.options.collection;
	},

	template: _.template($('#dataset-list').html()),

	render: function() {
		$(this.el).append(this.template({datasets: this.collection.toJSON()}));
	}
});

var DatasetImageView = Backbone.View.extend({
	el: "#dataset-views",

	initialize: function() {
		this.collection = this.options.collection;
	},	

	template: _.template($("#dataset-images").html()),

	render: function() {
		$(this.el).append(this.template({datasets: this.collection.toJSON()}));
		this.renderPopover();
	},

	renderPopover: function() {
		this.collection.forEach(function(ds) {

			var options = {
				trigger: "hover",
				title:	function() {return ds.get("type");},
				content: function() {return ds.get("content");},
				placement: "right"		
			};

			$("img."+ds.get("type")).popover(options);
		});
	}
});

var ParameterPageView = Backbone.View.extend({
	el: "#parameters",

	template: _.template($('#parameter-page').html()),

	render: function() {
		$(this.el).html(this.template());
	}
});

var ParameterSelectView = Backbone.View.extend({
	el: '#parameter-buttons',

	initialize: function() {
		this.collection = this.options.collection;
	},

	template: _.template($('#parameter-buttons-template').html()),

	render: function() {
		// why doesn't this work?
		//$(this.el).append(this.template({parameters: this.collection.toJSON()}));
		$('#parameter-buttons').append(this.template({parameters: this.collection.toJSON()}));
	}
});

var ParameterRowView = Backbone.View.extend({
	el: "tr",

	initialize: function() {
		this.model = this.options.model;
	},

	template: _.template($('#parameter-row-template').html())
});


var ParameterTableView = Backbone.View.extend({
	el: "#parameter-information",

	initialize: function() {
		this.collection = this.options.collection;
	},

	template: _.template($('#parameters-table-template').html()),

	render: function() {
		//$(this.el).append(this.template({parameters: this.collection.toJSON()}));

		// something weird about the DOM and rendering
		//$(this.el).html(this.template());
		$('#parameter-information').html(this.template());
		
		this.collection.each(function(p) {
			pv = new ParameterRowView();
			pv.model = p;
			$("tbody#parameter-body").append(pv.template({parameter:p.toJSON()}));
		});
	}
});

var PlotPageView = Backbone.View.extend({
	el: "#plots-views",

	initialize: function() {
		this.collection = this.options.collection;
	},

	template: _.template($("#plot-page-template").html()),

	render: function() {
		$(this.el).html(this.template());

		this.collection.each(function(p) {
			pv = new PlotView();
			pv.model = p;
			pv.render();		
		});
	}
});

var PlotView = Backbone.View.extend({
	el: "#plots",

	intialize: function() {
		this.model = this.options.model;
	},

	template : _.template($("#plot-template").html()),

	render: function() {

		console.log(this.model.toJSON());

		$(this.el).append(this.template({plot: this.model.toJSON()}));
		$.plot($("#"+this.model.get('title')+" .placeholder"), this.model.get('data'), this.model.get('options'));
		$('#'+this.model.get('title')+' .title').html(this.model.get('title'));
	}
});









