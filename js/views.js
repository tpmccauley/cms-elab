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

var ParameterRowView = Backbone.View.extend({
	el: "tr",

	initialize: function() {
		this.model = this.options.model;
	},

	template: _.template($('#parameter-row-template').html())

	/*
	events: {
		"switch-change .parameter-row": "parameterSelected"
	},

	parameterSelected: function() {
		console.log(this.model.get('name'), this.model.get('selected'));
	}
	*/
});

var ParameterTableView = Backbone.View.extend({
	el: "#table",

	initialize: function() {
		this.collection = this.options.collection;
	},

	template: _.template($('#parameters-table-template').html()),

	render: function() {
		//$(this.el).append(this.template({parameters: this.collection.toJSON()}));

		$(this.el).html(this.template());
		
		this.collection.each(function(p) {
			pv = new ParameterRowView();
			pv.model = p;
			$("tbody#parameter-body").append(pv.template({parameter:p.toJSON()}));
		});
	}
});

var ParameterItemView = Backbone.View.extend({
	el: "li",

	initialize: function() {
		this.model = this.options.model;
	},

	template: _.template($('#parameter-li-template').html())
});

var ParameterDropdownView = Backbone.View.extend({
	el: "#dropdown",

	initialize: function() {
		this.collection = this.options.collection;
	},

	template: _.template($('#parameters-dropdown-template').html()),

	render: function() {
		$(this.el).html(this.template());

		console.log(this.template());

		this.collection.each(function(p) {
			pv = new ParameterItemView();
			pv.model = p;
			$("ul#parameter-ul").append(pv.template({parameter:p.toJSON()}));
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
		$(this.el).append(this.template());
		//$.plot($(".placeholder"), this.model.get('data'), this.model.get('options'));
		//$('.title').html(this.model.get('title'));
	}
});

var PlotPageView = Backbone.View.extend({
	el: "#plots",

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








