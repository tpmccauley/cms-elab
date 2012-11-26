var DatasetListView = Backbone.View.extend({
	el: "#datasets",

	initialize: function() {
		this.collection = this.options.collection;
	},

	template: _.template($('#dataset-list').html()),

	render: function() {
		$(this.el).append(this.template({datasets: this.collection.toJSON()}));
	}
});

var DatasetImageView = Backbone.View.extend({
	el: "#datasets",

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


var ParameterView = Backbone.View.extend({
	el: "tr",

	initialize: function() {
		this.model = this.options.model;
	},

	template: _.template($('#parameter-row-template').html()),

	selectParameter: function() {
		console.log("Selected parameter");
	}
});

var ParameterTableView = Backbone.View.extend({
	el: "#table",

	initialize: function() {
		this.collection = this.options.collection;
	},

	template: _.template($('#parameters-table-template').html()),

	render: function() {
		$(this.el).html(this.template());

		var options = {
				trigger: "hover",
				title: "Parameter selection",
				content: "Each parameter selected will be plotted separately",
				placement: "top"		
			};

		//$("table#parameter-table").popover(options);

		this.collection.each(function(p) {
			pv.model = p;
		
			$("tbody#parameter-body").append(pv.template({parameter:p.toJSON()}));
		});
	}
});

var PlotView = Backbone.View.extend({
	el: "#plots",

	intialize: function() {},

	template : _.template($("#plot-message").html()),

	render: function() {
		var that = this;
		$(this.el).html(that.template());
	}
});


