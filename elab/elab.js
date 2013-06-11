var Elab = Elab || {};

Elab.Dataset = Backbone.Model.extend({
	defaults: {
		type: "Here is the type of the dataset",
		name: "Here is the name of the dataset",
		description: "0 events of no particles",
		image: "",
		url: "",
		content: "Here is a bit of text describing the contents of the dataset",
		selected: false
	},

	idAttribute: "id"
});

Elab.Datasets = Backbone.Collection.extend({
	model: Elab.Dataset,

	getSelected: function() {
		selected = this.filter(function(d){
			return d.get('selected') == true;
		});
		return new Elab.Datasets(selected);
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
        title:  "default title"
    },

    idAttribute: "id"
});

Elab.Plots = Backbone.Collection.extend({
    model: Elab.Plot
});

Elab.jpsi_dataset = new Elab.Dataset({id:"Jpsimumu"});
Elab.jpsi_dataset.set({
    name: "Jpsimumu",
    image: "../img/Jpsimumu.png",
    description: "2000 di-muon events around the J/&#0968",
    url: "http://cmsdoc.cern.ch/~mccauley/cms-elab/data/dimuon_2-5GeV.json",
    content: "The J/&#0968 is made up of two charm quarks. It is unstable, and decays to two muons around 6% of the time."
});

Elab.zmumu_dataset = new Elab.Dataset({id:"Zmumu"});
Elab.zmumu_dataset.set({
    name: "Zmumu", 
    image: "../img/Zmumu.png",
    description: "500 di-muon events around the Z boson",
    url: "http://cmsdoc.cern.ch/~mccauley/cms-elab/data/Zmumu.json",
    content: "The Z is a neutral gauge boson and is one of the carriers of the weak force. It is unstable, and decays to either two muons or two electrons around 3% of the time."
});

Elab.zee_dataset = new Elab.Dataset({id:"Zee"});
Elab.zee_dataset.set({        
    name: "Zee", 
    image: "../img/Zee.png",
    description: "500 di-electron events around the Z boson",
    url: "http://cmsdoc.cern.ch/~mccauley/cms-elab/data/Zee.json",
    content: "The Z is a neutral gauge boson and is one of the carriers of the weak force. It is unstable, and decays to either two muons or two electrons around 3% of the time."
});

Elab.wenu_dataset = new Elab.Dataset({id:"Wenu"});
Elab.wenu_dataset.set({        
    name: "Wenu", 
    image: "../img/Wenu.png",
    description: "500 events of W to e&#0957",
    url: "http://cmsdoc.cern.ch/~mccauley/cms-elab/data/Wenu.json",
    content: "The W is a charged gauge boson and is one of the carriers of the weak force. It is unstable, and decays into either a muon and a muon neutrino or an electron and an electron neutrino around 11% of the time.",
});

Elab.wmunu_dataset = new Elab.Dataset({id:"Wmunu"});
Elab.wmunu_dataset.set({
    name: "Wmunu", 
    image: "../img/Wmunu.png",
    description: "500 events of W to &#0956&#0957",
    url: "http://cmsdoc.cern.ch/~mccauley/cms-elab/data/Wmunu.json",
    content: "The W is a charged gauge boson and is one of the carriers of the weak force. It is unstable, and decays into either a muon and a muon neutrino or an electron and an electron neutrino around 11% of the time.",
});

Elab.dimuon_dataset = new Elab.Dataset({id:"dimuon"});
Elab.dimuon_dataset.set({
    name: "dimuon", 
    image: "../img/dimuon2.png",
    description: "100,000 di-muon events in the invariant mass range 2-110 GeV",
    url: "http://cmsdoc.cern.ch/~mccauley/cms-elab/data/dimuon100k.json",
    content: "Two protons colliding will produce all sorts of particles. Some of these particles can decay into two muons."
});

Elab.datasets = new Elab.Datasets();

Elab.datasets.on("add", function(ds) {
    console.log("Added dataset: " + ds.get("id"));
});

// We could parse the data files to fetch the parameters but there
// is no information on the units nor is there a description of what 
// the parameters describe. We don't have to be too generic about this
// since we know what data will be read in. There are also some parameters
// that we don't want to (or can't) plot. Therefore, we specify
// the schema here.

Elab.Wenu_parameters = new Elab.Parameters([
    {name:"E", unit:"GeV", description:"The total energy of the electron", id:"E", selected:false, image:"../img/E.gif"},
    {name:"MET", unit:"GeV", description:"The missing transverse energy due to the neutrino", id:"MET", selected:false, image:"../img/MET.gif"},
    {name:"phiMET", unit:"radians", description:"The phi angle of the missing transverse energy", id:"phiMET", selected:false, image:"../img/phiMET.gif"},
    {name:"eta", unit:"", description:"The pseudorapidity of the electron", id:"eta", selected:false, image:"../img/eta.gif"},
    {name:"phi", unit:"radians", description:"The phi angle of the electron direction", id:"phi", selected:false, image:"../img/phi.gif"},
    {name:"pt", unit:"GeV", description:"The transverse momentum of the electron", id:"pt", selected:false, image:"../img/pt.gif"}
]);

Elab.Wmunu_parameters = new Elab.Parameters([
    {name:"E", unit:"GeV", description:"The total energy of the muon", id:"E", selected:false, image:"../img/E.gif"},
    {name:"MET", unit:"GeV", description:"The missing transverse energy due to the neutrino", id:"MET", selected:false, image:"../img/MET.gif"},
    {name:"phiMET", unit:"radians", description:"The phi angle of the missing transverse energy", id:"phiMET", selected:false, image:"../img/phiMET.gif"},
    {name:"eta", unit:"", description:"The pseudorapidity of the muon", id:"eta", selected:false, image:"../img/eta.gif"},
    {name:"phi", unit:"radians", description:"The phi angle of the muon direction", id:"phi", selected:false, image:"../img/phi.gif"},
    {name:"pt", unit:"GeV", description:"The transverse momentum of the muon", id:"pt", selected:false, image:"../img/pt.gif"}
]);

Elab.dimuon_parameters = new Elab.Parameters([
    {name:"E1", unit:"GeV", description:"The total energy of the first muon", id:"E1", selected:false, image:"../img/E1.gif"},
    {name:"pt1", unit:"GeV", description:"The transverse momentum of the first muon", id:"pt1", selected:false, image:"../img/pt1.gif"},
    {name:"eta1", unit:"", description:"The pseudorapidity of the first muon", id:"eta1", selected:false, image:"../img/eta1.gif"},
    {name:"phi1", unit:"radians", description:"The phi angle of the first muon direction", id:"phi1", selected:false, image:"../img/phi1.gif"},
    {name:"Q1", unit:"", description:"The charge of the first muon", id:"Q1", selected:false, image:"../img/Q1.gif"},
    {name:"E2", unit:"GeV", description:"The total energy of the second muon", id:"E2", selected:false, image:"../img/E2.gif"},
    {name:"pt2", unit:"GeV", description:"The transverse momentum of the second muon", id:"pt2", selected:false, image:"../img/pt2.gif"},
    {name:"eta2", unit:"", description:"The pseudorapidity of the second muon", id:"eta2", selected:false, image:"../img/eta2.gif"},
    {name:"phi2", unit:"radians", description:"The phi angle of the second muon direction", id:"phi2", selected:false, image:"../img/phi2.gif"},
    {name:"Q2", unit:"", description:"The charge of the second muon", id:"Q2", selected:false, image:"../img/Q2.gif"},
    {name:"M", unit:"GeV", description:"The invariant mass of the two muons", id:"M", selected:false, image:"../img/M.gif"}
]);

Elab.Jpsi_parameters = new Elab.Parameters([
    {name:"E1", unit:"GeV", description:"The total energy of the first muon", id:"E1", selected:false, image:"../img/E1.gif"},
    {name:"pt1", unit:"GeV", description:"The transverse momentum of the first muon", id:"pt1", selected:false, image:"../img/pt1.gif"},
    {name:"eta1", unit:"", description:"The pseudorapidity of the first muon", id:"eta1", selected:false, image:"../img/eta1.gif"},
    {name:"phi1", unit:"radians", description:"The phi angle of the first muon direction", id:"phi1", selected:false, image:"../img/phi1.gif"},
    {name:"Q1", unit:"", description:"The charge of the first muon", id:"Q1", selected:false, image:"../img/Q1.gif"},
    {name:"E2", unit:"GeV", description:"The total energy of the second muon", id:"E2", selected:false, image:"../img/E2.gif"},
    {name:"pt2", unit:"GeV", description:"The transverse momentum of the second muon", id:"pt2", selected:false, image:"../img/pt2.gif"},
    {name:"eta2", unit:"", description:"The pseudorapidity of the second muon", id:"eta2", selected:false, image:"../img/eta2.gif"},
    {name:"phi2", unit:"radians", description:"The phi angle of the second muon direction", id:"phi2", selected:false, image:"../img/phi2.gif"},
    {name:"Q2", unit:"", description:"The charge of the second muon", id:"Q2", selected:false, image:"../img/Q2.gif"},
    {name:"M", unit:"GeV", description:"The invariant mass of the two muons", id:"M", selected:false, image:"../img/M.gif"}
]);

Elab.Zmumu_parameters = new Elab.Parameters([
    {name:"E1", unit:"GeV", description:"The total energy of the first muon", id:"E1", selected:false, image:"../img/E1.gif"},
    {name:"pt1", unit:"GeV", description:"The transverse momentum of the first muon", id:"pt1", selected:false, image:"../img/pt1.gif"},
    {name:"eta1", unit:"", description:"The pseudorapidity of the first muon", id:"eta1", selected:false, image:"../img/eta1.gif"},
    {name:"phi1", unit:"radians", description:"The phi angle of the first muon direction", id:"phi1", selected:false, image:"../img/phi1.gif"},
    {name:"Q1", unit:"", description:"The charge of the first muon", id:"Q1", selected:false, image:"../img/Q1.gif"},
    {name:"E2", unit:"GeV", description:"The total energy of the second muon", id:"E2", selected:false, image:"../img/E2.gif"},
    {name:"pt2", unit:"GeV", description:"The transverse momentum of the second muon", id:"pt2", selected:false, image:"../img/pt2.gif"},
    {name:"eta2", unit:"", description:"The pseudorapidity of the second muon", id:"eta2", selected:false, image:"../img/eta2.gif"},
    {name:"phi2", unit:"radians", description:"The phi angle of the second muon direction", id:"phi2", selected:false, image:"../img/phi2.gif"},
    {name:"Q2", unit:"", description:"The charge of the second muon", id:"Q2", selected:false, image:"../img/Q2.gif"},
    {name:"M", unit:"GeV", description:"The invariant mass of the two muons", id:"M", selected:false, image:"../img/M.gif"}
]);

Elab.Zee_parameters = new Elab.Parameters([
    {name:"E1", unit:"GeV", description:"The total energy of the first electron", id:"E1", selected:false, image:"../img/E1.gif"},
    {name:"pt1", unit:"GeV", description:"The transverse momentum of the first electron", id:"pt1", selected:false, image:"../img/pt1.gif"},
    {name:"eta1", unit:"", description:"The pseudorapidity of the first electron", id:"eta1", selected:false, image:"../img/eta1.gif"},
    {name:"phi1", unit:"radians", description:"The phi angle of the first electron direction", id:"phi1", selected:false, image:"../img/phi1.gif"},
    {name:"Q1", unit:"", description:"The charge of the first electron", id:"Q1", selected:false, image:"../img/Q1.gif"},
    {name:"E2", unit:"GeV", description:"The total energy of the second electron", id:"E2", selected:false, image:"../img/E2.gif"},
   	{name:"pt2", unit:"GeV", description:"The transverse momentum of the second electron", id:"pt2", selected:false, image:"../img/pt2.gif"},
    {name:"eta2", unit:"", description:"The pseudorapidity of the second electron", id:"eta2", selected:false, image:"../img/eta2.gif"},
    {name:"phi2", unit:"radians", description:"The phi angle of the second electron direction", id:"phi2", selected:false, image:"../img/phi2.gif"},
    {name:"Q2", unit:"", description:"The charge of the second electron", id:"Q2", selected:false, image:"../img/Q2.gif"},
    {name:"M", unit:"GeV", description:"The invariant mass of the two electrons", id:"M", selected:false, image:"../img/M.gif"}
]);

Elab.jpsi_dataset.set('parameters', Elab.Jpsi_parameters);
Elab.zee_dataset.set('parameters', Elab.Zee_parameters);
Elab.zmumu_dataset.set('parameters', Elab.Zmumu_parameters);
Elab.wenu_dataset.set('parameters', Elab.Wenu_parameters);
Elab.wmunu_dataset.set('parameters', Elab.Wmunu_parameters);
Elab.dimuon_dataset.set('parameters', Elab.dimuon_parameters);

Elab.datasets.add(Elab.jpsi_dataset);
Elab.datasets.add(Elab.zee_dataset);
Elab.datasets.add(Elab.zmumu_dataset);
Elab.datasets.add(Elab.wenu_dataset);
Elab.datasets.add(Elab.wmunu_dataset);
Elab.datasets.add(Elab.dimuon_dataset);

Elab.plots = new Elab.Plots();

Elab.DatasetPageView = Backbone.View.extend({
	el: "#datasets",

	template: _.template($('#dataset-page-template').html()),

	render: function() {
		$(this.el).html(this.template());
	}
});

Elab.ParameterPageView = Backbone.View.extend({
	el: "#parameters",

	template: _.template($('#parameter-page-template').html()),

	render: function() {
		$(this.el).html(this.template());
	}
});

Elab.PlotPageView = Backbone.View.extend({
	el: "#plots",

	template: _.template($("#plot-page-template").html()),

	render: function() {
		$(this.el).html(this.template());
	}
});

Elab.emptyAll = function() {
    $('#datasets').empty();
    $('#parameters').empty();
    $('#plots').empty();
};

Elab.DatasetListView = Backbone.View.extend({
    template: _.template($('#dataset-list-template').html()),

    render: function() {
        $("#dataset-list-view").append(this.template({datasets: this.collection.toJSON()}));
    }
});

Elab.DatasetImageView = Backbone.View.extend({
    template: _.template($("#dataset-image-template").html()),

    render: function() {
        $("#dataset-image-view").append(this.template({datasets: this.collection.toJSON()}));
        this.renderPopover();
    },

    renderPopover: function() {
        this.collection.each(function(ds) {

            var options = {
                trigger: "hover",
                title:  function() {return ds.get("type");},
                content: function() {return ds.get("content");},
                placement: "right"      
            };

            $("img."+ds.get("type")).popover(options);
        });
    }
});

Elab.ParameterButtonView = Backbone.View.extend({
    tagName: 'td',

    initialize: function() {
        this.render();
    },

    events: {
        'click': 'clickedButton'
    },

    clickedButton: function() {
        var selected = ! $(this.el).find('button').hasClass('active');
        
        Elab.datasets
            .get(Elab.selected_dataset)
            .get('parameters')
            .get(this.model.get('name'))
            .set('selected', selected);
    },

    template: _.template($('#parameter-button-template').html()),

    render: function() {
        $(this.el).html(this.template({parameter:this.model.toJSON()}));
    }
});

Elab.ParameterButtonsView = Backbone.View.extend({
    render: function() {
        this.collection.each(function(p) {
            pv = new Elab.ParameterButtonView({model:p});
            $("#parameter-button-row").append(pv.el);
        }, this);
    }
});

Elab.ParameterTableView = Backbone.View.extend({
    template: _.template($('#parameters-table-template').html()),

    render: function() {
        $("#parameter-information").append(this.template({parameters: this.collection.toJSON()}));
    }
});

Elab.FlotView = Backbone.View.extend({
    template: _.template($('#flot-template').html()),

    render: function() {
        $("#flot-view").append(this.template({plot: this.model.toJSON()}));
        $.plot(("#"+this.model.get('title')+" .placeholder"), this.model.get('data'), this.model.get('options'));
        $('#'+this.model.get('title')+' .title').html(this.model.get('title'));
    }
});

Elab.FlotPlotsView = Backbone.View.extend({
    render: function() {
        this.collection.each(function(p) {
            pv = new Elab.FlotView({model:p});
            pv.render();
        }, this);  
    }
});

Elab.Router = Backbone.Router.extend({
	routes: {
		"datasets-page": "showDatasets",
		"parameters-page/:name": "showParameters",
		"plots-page": "showPlots"
	},

	showDatasets: function() {
		console.log("showDatasets");
  
        Elab.emptyAll();   
        Elab.dataset_page_view.render();
        Elab.dataset_list_view.render();
        Elab.dataset_image_view.render();
	},

	showParameters: function(name) {
		console.log("showParameters");
        console.log(name, ' selected');

        Elab.selected_dataset = name;

        Elab.emptyAll();
        Elab.parameter_page_view.render();

        Elab.datasets.get(name).get('parameters').deselectAll();
        console.log(Elab.datasets.get(name).get('parameters').getSelected().length, ' parameters selected');

        Elab.parameter_buttons_view.collection = Elab.datasets.get(name).get('parameters');
        Elab.parameter_buttons_view.render();

        Elab.parameter_table_view.collection = Elab.datasets.get(name).get('parameters');
        Elab.parameter_table_view.render();
	},
	
    showPlots: function() {
		console.log("showPlots");

        this.getData(Elab.datasets.get(Elab.selected_dataset).get('url'));

        Elab.plots.reset();

        Elab.datasets
            .get(Elab.selected_dataset)
            .get('parameters')
            .getSelected().each(function(p) {
                console.log(p.toJSON());

                var name = p.get('name');
                var histogram = this.buildHistogram(Elab.raw_data.map(function(d) {return d[name];}));
                var plot = new Elab.Plot({data: [histogram], title: name});

                Elab.plots.add(plot);
            }, this);

        Elab.emptyAll();
        Elab.plot_page_view.render();

        Elab.flot_plots_view.collection = Elab.plots;
        Elab.flot_plots_view.render();
	},

    getData: function(data_url) {
        var request = $.ajax({
            async: false,
            type: "GET", 
            url: data_url, 
            dataType: "json"
        });

        request.error(function(xhr, textStatus, errorThrown) {
            console.log(textStatus+" "+errorThrown);
        }); 

        request.success(function() {
            var data = eval(request.responseText);
            Elab.raw_data = data;
        });
    },

    buildHistogram: function(data) {
        var binWidth = 0.1;
        var h = [];
        var histmin = 999999;
        var histmax = 0;
        var histogram = [];

        for ( var i = 0; i < data.length; i++ ) {
            var va = data[i];
            var v = Math.floor(va / binWidth);
            
            while (h.length <= v) {
                h.push(0);
            }
        
            var count = h[v];
            
            if (count == null) {
                count = 0;
            }
        
            h[v] = ++count;
            
            if (histmin > v) {
                histmin = v;
            }
        
            if (histmax < v) {
                histmax = v;
            }
        }

        var last = 0;

        for ( var j = histmin; j <= histmax; j++ ) {
            var x = j * binWidth;
            var y = h[j];
        
            if (isNaN(y)) {
                y = 0;
            }
            
            histogram.push([x - 0.0001, last]);
            histogram.push([x, y]);
            histogram.push([x + binWidth - 0.0001, y]);
            last = y;
        }

        return histogram;
    },
});

$(function() {
    Elab.dataset_page_view = new Elab.DatasetPageView();
    Elab.parameter_page_view = new Elab.ParameterPageView();
    Elab.plot_page_view = new Elab.PlotPageView();

    Elab.dataset_list_view = new Elab.DatasetListView();
    Elab.dataset_image_view = new Elab.DatasetImageView();

    Elab.dataset_list_view.collection = Elab.datasets;
    Elab.dataset_image_view.collection = Elab.datasets;

    Elab.parameter_buttons_view = new Elab.ParameterButtonsView();
    Elab.parameter_table_view = new Elab.ParameterTableView();

    Elab.flot_plots_view = new Elab.FlotPlotsView();

    Elab.router = new Elab.Router();
    Backbone.history.start();
});


