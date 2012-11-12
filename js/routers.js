var ElabRouter = Backbone.Router.extend({
	
	routes: {
		"": "gotoDatasets",
		"parameters/:name": "selectDataset",
		"plots/*": "gotoPlots"
	},

	gotoDatasets: function() {
		$("#datasets").show();
		$("#parameters").hide();
		$("#plots").hide();
	},

	gotoPlots: function() {
		$("#datasets").hide();
		$("#parameters").hide();
		$("#plots").show();

		plotView.render();
	},

	selectDataset: function(name) {
		$("#datasets").hide();
		$("#parameters").show();
		$("#plots").hide();

		if ( name == "Wenu" || name == "Wmunu" ) {
			parameterTableView.collection = W_parameters;
			parameterTableView.render();
			return;
		} 
		if ( name == "Zee" || name == "Zmumu" ) {
			parameterTableView.collection = Z_parameters;
			parameterTableView.render();
			return;
		} 
		if ( name == "Jpsimumu" || name == "dimuon") {
			parameterTableView.collection = Jpsi_parameters;
			parameterTableView.render();
			return;
		}
	}
});