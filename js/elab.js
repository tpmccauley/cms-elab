

var jpsi_dataset = new Dataset({id:"Jpsimumu"});
jpsi_dataset.set({
	type: "Jpsi",
	name: "Jpsimumu",
	image: "../img/Jpsimumu.png",
	description: "2000 di-muon events around the J/&#0968",
	url: "http://cmsdoc.cern.ch/~mccauley/cms-elab/data/dimuon_2-5GeV.json",
	content: "The J/&#0968 is made up of two charm quarks. It is unstable, and decays to two muons around 6% of the time."
});

var zmumu_dataset = new Dataset({id:"Zmumu"});
zmumu_dataset.set({
	type: "Z",
	name: "Zmumu", 
	image: "../img/Zmumu.png",
	description: "500 di-muon events around the Z boson",
	url: "http://cmsdoc.cern.ch/~mccauley/cms-elab/data/Zmumu.json",
	content: "The Z is a neutral gauge boson and is one of the carriers of the weak force. It is unstable, and decays to either two muons or two electrons around 3% of the time."
});

var zee_dataset = new Dataset({id:"Zee"});
zee_dataset.set({
	type: "Z",
	name: "Zee", 
	image: "../img/Zee.png",
	description: "500 di-electron events around the Z boson",
	url: "http://cmsdoc.cern.ch/~mccauley/cms-elab/data/Zee.json",
	content: "The Z is a neutral gauge boson and is one of the carriers of the weak force. It is unstable, and decays to either two muons or two electrons around 3% of the time."
});

var wenu_dataset = new Dataset({id:"Wenu"});
wenu_dataset.set({
	type: "W",
	name: "Wenu", 
	image: "../img/Wenu.png",
	description: "500 events of W to e&#0957",
	url: "http://cmsdoc.cern.ch/~mccauley/cms-elab/data/Wenu.json",
	content: "The W is a charged gauge boson and is one of the carriers of the weak force. It is unstable, and decays into either a muon and a muon neutrino or an electron and an electron neutrino around 11% of the time."
});

var wmunu_dataset = new Dataset({id:"Wmunu"});
wmunu_dataset.set({
	type: "W",
	name: "Wmunu", 
	image: "../img/Wmunu.png",
	description: "500 events of W to &#0956&#0957",
	url: "http://cmsdoc.cern.ch/~mccauley/cms-elab/data/Wmunu.json",
	content: "The W is a charged gauge boson and is one of the carriers of the weak force. It is unstable, and decays into either a muon and a muon neutrino or an electron and an electron neutrino around 11% of the time."
});

var dimuon_dataset = new Dataset({id:"dimuon"});
dimuon_dataset.set({
	type: "dimuons",
	name: "dimuon", 
	image: "../img/dimuon2.png",
	description: "100,000 di-muon events in the invariant mass range 2-110 GeV",
	url: "http://cmsdoc.cern.ch/~mccauley/cms-elab/data/dimuon100k.json",
	content: "Two protons colliding will produce all sorts of particles. Some of these particles can decay into two muons."
});

// Add the datasets to the Dataset Collection
var datasets = new Datasets();

datasets.on("add", function(ds) {
	console.log("Added dataset: " + ds.get("name"));
});

datasets.on("remove", function(ds) {
	console.log("Removed dataset: " + ds.get("name"));
});

// We could parse the data files to fetch the parameters but there
// is no information on the units nor is there a description of what 
// the parameters describe. We don't have to be too generic about this
// since we know what data will be read in. There are also some parameters
// that we don't want to (or can't) plot. Therefore, we specify
// the schema here.

var W_parameters = new Parameters([
	{"name":"E", "unit":"GeV", "description":"The total energy of the lepton", "selected":false},
	{"name":"MET", "unit":"GeV", "description":"The missing transverse energy due to the neutrino", selected:false},
	{"name":"phiMET", "unit":"radians", "description":"The phi angle of the missing transverse energy", selected:false},
	{"name":"eta", "unit":"", "description":"The pseudorapidity of the lepton", selected:false},
	{"name":"phi", "unit":"radians", "description":"The phi angle of the lepton direction", selected:false},
	{"name":"pt", "unit":"GeV", "description":"The transverse momentum of the lepton", selected:false}
]);

var Z_parameters = new Parameters([
	{"name":"E1", "unit":"GeV", "description":"The total energy of the first lepton", selected:false},
	{"name":"pt1", "unit":"GeV", "description":"The transverse momentum of the first lepton", selected:false},
	{"name":"eta1", "unit":"", "description":"The pseudorapidity of the first lepton", selected:false},
	{"name":"phi1", "unit":"radians", "description":"The phi angle of the first lepton direction", selected:false},
	{"name":"Q1", "unit":"", "description":"The charge of the first lepton", selected:false},
	{"name":"E2", "unit":"GeV", "description":"The total energy of the second lepton", selected:false},
	{"name":"pt2", "unit":"GeV", "description":"The transverse momentum of the second lepton", selected:false},
	{"name":"eta2", "unit":"", "description":"The pseudorapidity of the second lepton", selected:false},
	{"name":"phi2", "unit":"radians", "description":"The phi angle of the second lepton direction", selected:false},
	{"name":"Q2", "unit":"", "description":"The charge of the second lepton", selected:false},
	{"name":"M", "unit":"GeV", "description":"The invariant mass of the two leptons", selected:false}
]);

var Jpsi_parameters = new Parameters([
	{"name":"E1", "unit":"GeV", "description":"The total energy of the first lepton", selected:false},
	{"name":"pt1", "unit":"GeV", "description":"The transverse momentum of the first lepton", selected:false},
	{"name":"eta1", "unit":"", "description":"The pseudorapidity of the first lepton", selected:false},
	{"name":"phi1", "unit":"radians", "description":"The phi angle of the first lepton direction", selected:false},
	{"name":"Q1", "unit":"", "description":"The charge of the first lepton", selected:false},
	{"name":"E2", "unit":"GeV", "description":"The total energy of the second lepton", selected:false},
	{"name":"pt2", "unit":"GeV", "description":"The transverse momentum of the second lepton", selected:false},
	{"name":"eta2", "unit":"", "description":"The pseudorapidity of the second lepton", selected:false},
	{"name":"phi2", "unit":"radians", "description":"The phi angle of the second lepton direction", selected:false},
	{"name":"Q2", "unit":"", "description":"The charge of the second lepton", selected:false},
	{"name":"M", "unit":"GeV", "description":"The invariant mass of the two leptons", selected:false}
]);

var dimuon_parameters = new Parameters([
	{"name":"E1", "unit":"GeV", "description":"The total energy of the first lepton", selected:false},
	{"name":"pt1", "unit":"GeV", "description":"The transverse momentum of the first lepton", selected:false},
	{"name":"eta1", "unit":"", "description":"The pseudorapidity of the first lepton", selected:false},
	{"name":"phi1", "unit":"radians", "description":"The phi angle of the first lepton direction", selected:false},
	{"name":"Q1", "unit":"", "description":"The charge of the first lepton", selected:false},
	{"name":"E2", "unit":"GeV", "description":"The total energy of the second lepton", selected:false},
	{"name":"pt2", "unit":"GeV", "description":"The transverse momentum of the second lepton", selected:false},
	{"name":"eta2", "unit":"", "description":"The pseudorapidity of the second lepton", selected:false},
	{"name":"phi2", "unit":"radians", "description":"The phi angle of the second lepton direction", selected:false},
	{"name":"Q2", "unit":"", "description":"The charge of the second lepton", selected:false},
	{"name":"M", "unit":"GeV", "description":"The invariant mass of the two leptons", selected:false}
]);

jpsi_dataset.set('parameters', Jpsi_parameters);
zee_dataset.set('parameters', Z_parameters);
zmumu_dataset.set('parameters', Z_parameters);
wenu_dataset.set('parameters', W_parameters);
wmunu_dataset.set('parameters', W_parameters);
dimuon_dataset.set('parameters', dimuon_parameters);

datasets.add(jpsi_dataset);
datasets.add(zee_dataset);
datasets.add(zmumu_dataset);
datasets.add(wenu_dataset);
datasets.add(wmunu_dataset);
datasets.add(dimuon_dataset);

var datasetListView = new DatasetListView({collection:datasets});
var datasetImageView = new DatasetImageView({collection:datasets});

datasetListView.render();
datasetImageView.render();

var parameterTableView = new ParameterTableView();
var parameterDropdownView = new ParameterDropdownView();
var plotView = new PlotView();

var elabRouter = new ElabRouter();
Backbone.history.start();
















