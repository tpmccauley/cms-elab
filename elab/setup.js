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

MyApp.ParameterTableView = Backbone.View.extend({
    template: _.template($('#parameters-table-template').html()),

    render: function() {
        $("#parameter-information").append(this.template({parameters: this.collection.toJSON()}));
    }
});

$(function() {
	MyApp.jpsi_dataset = new MyApp.Dataset({id:"Jpsimumu"});
	MyApp.jpsi_dataset.set({
		type: "dilepton",
		name: "Jpsimumu",
		image: "../img/Jpsimumu.png",
		description: "2000 di-muon events around the J/&#0968",
		url: "http://localhost:8000/data/dimuon_2-5GeV.json",
		content: "The J/&#0968 is made up of two charm quarks. It is unstable, and decays to two muons around 6% of the time.",
		selected: false
	});

	MyApp.zmumu_dataset = new MyApp.Dataset({id:"Zmumu"});
	MyApp.zmumu_dataset.set({
		type: "dilepton",
		name: "Zmumu", 
		image: "../img/Zmumu.png",
		description: "500 di-muon events around the Z boson",
		url: "http://localhost:8000/data/Zmumu.json",
		content: "The Z is a neutral gauge boson and is one of the carriers of the weak force. It is unstable, and decays to either two muons or two electrons around 3% of the time.",
		selected: false
	});

	MyApp.zee_dataset = new MyApp.Dataset({id:"Zee"});
	MyApp.zee_dataset.set({
		type: "dilepton",
		name: "Zee", 
		image: "../img/Zee.png",
		description: "500 di-electron events around the Z boson",
		url: "http://localhost:8000/data/Zee.json",
		content: "The Z is a neutral gauge boson and is one of the carriers of the weak force. It is unstable, and decays to either two muons or two electrons around 3% of the time.",
		selected: false
	});

	MyApp.wenu_dataset = new MyApp.Dataset({id:"Wenu"});
	MyApp.wenu_dataset.set({
		type: "W",
		name: "Wenu", 
		image: "../img/Wenu.png",
		description: "500 events of W to e&#0957",
		url: "http://localhost:8000/data/Wenu.json",
		content: "The W is a charged gauge boson and is one of the carriers of the weak force. It is unstable, and decays into either a muon and a muon neutrino or an electron and an electron neutrino around 11% of the time.",
		selected: false
	});

	MyApp.wmunu_dataset = new MyApp.Dataset({id:"Wmunu"});
	MyApp.wmunu_dataset.set({
		type: "W",
		name: "Wmunu", 
		image: "../img/Wmunu.png",
		description: "500 events of W to &#0956&#0957",
		url: "http://localhost:8000/data/Wmunu.json",
		content: "The W is a charged gauge boson and is one of the carriers of the weak force. It is unstable, and decays into either a muon and a muon neutrino or an electron and an electron neutrino around 11% of the time.",
		selected: false
	});

	MyApp.dimuon_dataset = new MyApp.Dataset({id:"dimuon"});
	MyApp.dimuon_dataset.set({
		type: "dilepton",
		name: "dimuon", 
		image: "../img/dimuon2.png",
		description: "100,000 di-muon events in the invariant mass range 2-110 GeV",
		url: "http://localhost:8000/data/dimuon100k.json",
		content: "Two protons colliding will produce all sorts of particles. Some of these particles can decay into two muons.",
		selected: false
	});

	MyApp.datasets = new MyApp.Datasets();

	MyApp.datasets.on("add", function(ds) {
		console.log("Added dataset: " + ds.get("id"));
	});

	MyApp.datasets.on("remove", function(ds) {
		console.log("Removed dataset: " + ds.get("id"));
	});

	MyApp.W_parameters = new MyApp.Parameters([
		{name:"E", unit:"GeV", description:"The total energy of the lepton", id:"E", selected:false, image:"../img/E.gif"},
		{name:"MET", unit:"GeV", description:"The missing transverse energy due to the neutrino", id:"MET", selected:false, image:"../img/MET.gif"},
		{name:"phiMET", unit:"radians", description:"The phi angle of the missing transverse energy", id:"phiMET", selected:false, image:"../img/phiMET.gif"},
		{name:"eta", unit:"", description:"The pseudorapidity of the lepton", id:"eta", selected:false, image:"../img/eta.gif"},
		{name:"phi", unit:"radians", description:"The phi angle of the lepton direction", id:"phi", selected:false, image:"../img/phi.gif"},
		{name:"pt", unit:"GeV", description:"The transverse momentum of the lepton", id:"pt", selected:false, image:"../img/pt.gif"}
	]);

	MyApp.dilepton_parameters = new MyApp.Parameters([
		{name:"E1", unit:"GeV", description:"The total energy of the first lepton", id:"E1", selected:false, image:"../img/E1.gif"},
		{name:"pt1", unit:"GeV", description:"The transverse momentum of the first lepton", id:"pt1", selected:false, image:"../img/pt1.gif"},
		{name:"eta1", unit:"", description:"The pseudorapidity of the first lepton", id:"eta1", selected:false, image:"../img/eta1.gif"},
		{name:"phi1", unit:"radians", description:"The phi angle of the first lepton direction", id:"phi1", selected:false, image:"../img/phi1.gif"},
		{name:"Q1", unit:"", description:"The charge of the first lepton", id:"Q1", selected:false, image:"../img/Q1.gif"},
		{name:"E2", unit:"GeV", description:"The total energy of the second lepton", id:"E2", selected:false, image:"../img/E2.gif"},
		{name:"pt2", unit:"GeV", description:"The transverse momentum of the second lepton", id:"pt2", selected:false, image:"../img/pt2.gif"},
		{name:"eta2", unit:"", description:"The pseudorapidity of the second lepton", id:"eta2", selected:false, image:"../img/eta2.gif"},
		{name:"phi2", unit:"radians", description:"The phi angle of the second lepton direction", id:"phi2", selected:false, image:"../img/phi2.gif"},
		{name:"Q2", unit:"", description:"The charge of the second lepton", id:"Q2", selected:false, image:"../img/Q2.gif"},
		{name:"M", unit:"GeV", description:"The invariant mass of the two leptons", id:"M", selected:false, image:"../img/M.gif"}
	]);

	MyApp.jpsi_dataset.set('parameters', MyApp.dilepton_parameters);
	MyApp.zee_dataset.set('parameters', MyApp.dilepton_parameters);
	MyApp.zmumu_dataset.set('parameters', MyApp.dilepton_parameters);
	MyApp.wenu_dataset.set('parameters', MyApp.W_parameters);
	MyApp.wmunu_dataset.set('parameters', MyApp.W_parameters);
	MyApp.dimuon_dataset.set('parameters', MyApp.dilepton_parameters);

	MyApp.datasets.add(MyApp.jpsi_dataset);
	MyApp.datasets.add(MyApp.zee_dataset);
	MyApp.datasets.add(MyApp.zmumu_dataset);
	MyApp.datasets.add(MyApp.wenu_dataset);
	MyApp.datasets.add(MyApp.wmunu_dataset);
	MyApp.datasets.add(MyApp.dimuon_dataset);

	MyApp.parameter_table_view = new MyApp.ParameterTableView();

	MyApp.Router = Backbone.Router.extend({
		routes: {
		":name": "datasetSelected"
		},

		datasetSelected: function(name) {
			var datasetNameView = new MyApp.DatasetNameView();
			datasetNameView.text = MyApp.datasets.get(name).get('description');
			datasetNameView.render();

			MyApp.selectedDataset = name;

			MyApp.datasets.get(name).set('selected', true);

			var dataset_url = MyApp.datasets.get(name).get('url');
			console.log(dataset_url);

			var dataset_type = MyApp.datasets.get(name).get('type');
			console.log(dataset_type);

			$("#parameter-information").empty();
			$("svg").remove();

			MyApp.parameter_table_view.collection = MyApp.datasets.get(name).get('parameters');
			MyApp.parameter_table_view.render();

			if ( dataset_type == 'dilepton' ) {
				dilepton_plots(dataset_url);
			} else if ( dataset_type == 'W') {
				W_plots(dataset_url);
			}
		}
	});

	//MyApp.datasetDropdownView = new MyApp.DatasetDropdownView();
	//MyApp.datasetDropdownView.collection = MyApp.datasets;
	//MyApp.datasetDropdownView.render();

	MyApp.router = new MyApp.Router();
	Backbone.history.start();
});