var MyApp = MyApp || {};

MyApp.Dataset = Backbone.Model.extend({
	defaults: {
		type: "Here is the type of the dataset",
		name: "Here is the name of the dataset",
		description: "0 events of no particles",
		image: "",
		url: "",
		content: "Here is a bit of text describing the contents of the dataset",
		selected: false
	},

	events: {
		"change:selected": "changeSelected"
	},

	changeSelected: function() {
		console.log(this.name, this.selected);
	},

	idAttribute: "id"
});

MyApp.Datasets = Backbone.Collection.extend({
	model: MyApp.Dataset,

	getSelected: function() {
		selected = this.filter(function(d){
			return d.get('selected') == true;
		});
		return new MyApp.Datasets(selected);
	},

	deselectAll: function() {
		this.each(function(d) {
			d.set('selected', false);
		});
	}
});

MyApp.Parameter = Backbone.Model.extend({
	defaults: {
		name: "Here is the default parameter name",
		unit: "Hectacres",
		description: "I am a parameter",
		selected: false
	},

	idAttribute: "id"
});

MyApp.Parameters = Backbone.Collection.extend({
	model: MyApp.Parameter,

	getSelected: function() {
		selected = this.filter(function(p){
			return p.get('selected') == true;
		});
		return new MyApp.Parameters(selected);
	},

	deselectAll: function() {
		this.each(function(p) {
			p.set('selected', false);
		})
;	}
});

MyApp.DatasetItemView = Backbone.View.extend({
	el: "li",

	initialize: function() {
		this.model = this.options.model;

	},

	template: _.template($('#dataset-li-template').html())
});

MyApp.DatasetDropdownView = Backbone.View.extend({
	el: "#dropdown",

	initialize: function() {
		this.collection = this.options.collection;
	},

	template: _.template($('#dataset-dropdown-template').html()),

	render: function() {
		$(this.el).html(this.template());

		this.collection.each(function(p) {
			pv = new MyApp.DatasetItemView();
			pv.model = p;

			$("ul#dataset-ul").append(pv.template({dataset:p.toJSON()}));
		});
	}
});

MyApp.DatasetNameView = Backbone.View.extend({
	el: "#name",
	text: "",

	initialize: function() {
		this.text = this.options.text;
	},

	render: function() {
		$(this.el).html(this.text);
	}
});

MyApp.ParameterButtonView = Backbone.View.extend({
	tagName: 'td',

	initialize: function() {
		this.render();
	},

	events: {
		'click':'clickedButton'
	},

	clickedButton: function() {
		var selected = ! $(this.el).find('button').hasClass('active');
		console.log('clicked ', this.model.get('name'));
		console.log(selected);

		MyApp.selected        
	},

	template: _.template($('#parameter-button-template').html()),

	render: function() {
		$(this.el).html(this.template({parameter:this.model.toJSON()}));
	}
});

MyApp.ParameterButtonsView = Backbone.View.extend({
	el: '#button-table',

	render: function() {
		this.$el.empty();

		this.collection.each(function(p) {
			pv = new MyApp.ParameterButtonView({model:p});
			this.$el.append(pv.el);
		}, this);
	}
});

MyApp.ParametersView = Backbone.View.extend({
	el: '#buttons',

	initialize: function() {
		this.collection = this.options.collection;
	},

	template: _.template($('#parameter-buttons-template').html()),

	render: function() {
		$(this.el).html(this.template({parameters: this.collection.toJSON()}));
	}
});




