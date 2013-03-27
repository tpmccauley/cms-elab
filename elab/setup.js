$(function() {
	MyApp.jpsi_dataset = new MyApp.Dataset({id:"Jpsimumu"});
	MyApp.jpsi_dataset.set({
		type: "Jpsi",
		name: "Jpsimumu",
		image: "../img/Jpsimumu.png",
		description: "2000 di-muon events around the J/&#0968",
		url: "http://localhost:8000/data/dimuon_2-5GeV.json",
		content: "The J/&#0968 is made up of two charm quarks. It is unstable, and decays to two muons around 6% of the time.",
		selected: false
	});

	MyApp.zmumu_dataset = new MyApp.Dataset({id:"Zmumu"});
	MyApp.zmumu_dataset.set({
		type: "Z",
		name: "Zmumu", 
		image: "../img/Zmumu.png",
		description: "500 di-muon events around the Z boson",
		url: "http://localhost:8000/data/Zmumu.json",
		content: "The Z is a neutral gauge boson and is one of the carriers of the weak force. It is unstable, and decays to either two muons or two electrons around 3% of the time.",
		selected: false
	});

	MyApp.zee_dataset = new MyApp.Dataset({id:"Zee"});
	MyApp.zee_dataset.set({
		type: "Z",
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
		type: "dimuons",
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

	MpApp.selecctedDataset = "";
	MyApp.selectedParameters = [];

	MyApp.Router = Backbone.Router.extend({
		routes: {
		":name": "datasetSelected"
		},

		datasetSelected: function(name) {
			var datasetNameView = new MyApp.DatasetNameView();
			datasetNameView.text = name;
			datasetNameView.render();

			MyApp.selectedDataset = name;
			MyApp.selectedParameters = [];

			MyApp.datasets.get(name).set('selected', true);

			var dataset_url = MyApp.datasets.get(name).get('url');
			console.log(dataset_url);

			var parametersView = new MyApp.ParameterButtonsView({collection:MyApp.datasets.get(name).get('parameters')});
			parametersView.render();
		}
	});

	MyApp.datasetDropdownView = new MyApp.DatasetDropdownView();
	MyApp.datasetDropdownView.collection = MyApp.datasets;
	MyApp.datasetDropdownView.render();

	MyApp.router = new MyApp.Router();
	Backbone.history.start();
});