var Elab = Elab || {};

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

Elab.jpsi_dataset = new Elab.Dataset({id:"Jpsimumu"});
Elab.jpsi_dataset.set({
    name: "Jpsimumu",
    image: "../img/Jpsimumu.png",
    svg: "../svg/Jpsimumu.svg",
    description: "2000 di-muon events around the J/&#0968",
    url: "http://localhost:8000/data/dimuon_2-5GeV.json",
    content: "The J/&#0968 is made up of two charm quarks. It is unstable, and decays to two muons around 6% of the time."
});

Elab.zmumu_dataset = new Elab.Dataset({id:"Zmumu"});
Elab.zmumu_dataset.set({
    name: "Zmumu", 
    image: "../img/Zmumu.png",
    svg: "../svg/Zmumu.svg",
    description: "500 di-muon events around the Z boson",
    url: "http://localhost:8000/data/Zmumu.json",
    content: "The Z is a neutral gauge boson and is one of the carriers of the weak force. It is unstable, and decays to either two muons or two electrons around 3% of the time."
});

Elab.zee_dataset = new Elab.Dataset({id:"Zee"});
Elab.zee_dataset.set({        
    name: "Zee", 
    image: "../img/Zee.png",
    svg: "../svg/Zee.svg",
    description: "500 di-electron events around the Z boson",
    url: "http://localhost:8000/data/Zee.json",
    content: "The Z is a neutral gauge boson and is one of the carriers of the weak force. It is unstable, and decays to either two muons or two electrons around 3% of the time."
});

Elab.wenu_dataset = new Elab.Dataset({id:"Wenu"});
Elab.wenu_dataset.set({        
    name: "Wenu", 
    image: "../img/Wenu.png",
    svg: "../svg/Wenu.svg",
    description: "500 events of W to e&#0957",
    url: "http://localhost:8000/data/Wenu.json",
    content: "The W is a charged gauge boson and is one of the carriers of the weak force. It is unstable, and decays into either a muon and a muon neutrino or an electron and an electron neutrino around 11% of the time.",
});

Elab.wmunu_dataset = new Elab.Dataset({id:"Wmunu"});
Elab.wmunu_dataset.set({
    name: "Wmunu", 
    image: "../img/Wmunu.png",
    svg: "../svg/Wmunu.svg",
    description: "500 events of W to &#0956&#0957",
    url: "http://localhost:8000/data/Wmunu.json",
    content: "The W is a charged gauge boson and is one of the carriers of the weak force. It is unstable, and decays into either a muon and a muon neutrino or an electron and an electron neutrino around 11% of the time.",
});

Elab.dimuon_dataset = new Elab.Dataset({id:"dimuon"});
Elab.dimuon_dataset.set({
    name: "dimuon", 
    image: "../img/dimuon.png",
    svg: "../svg/dimuon.svg",
    description: "100,000 di-muon events in the invariant mass range 2-110 GeV",
    url: "http://localhost:8000/data/dimuon100k.json",
    content: "Two protons colliding will produce all sorts of particles. Some of these particles can then produce two muons."
});

Elab.dielectron_dataset = new Elab.Dataset({id:"dielectron"});
Elab.dielectron_dataset.set({
    name: "dielectron",
    image: "../img/dielectron.png",
    svg: "../svg/dielectron.svg",
    description: "100,000 di-electron events in the invariant mass range 2-100 GeV",
    url: "http://localhost:8000/data/dielectron100k.json",
    content: "Two protons colliding will produce all sorts of particles. Some of these particles can then produce two electrons."
});

Elab.h4l_dataset = new Elab.Dataset({id:"Hto4l"});
Elab.h4l_dataset.set({
    name: "Hto4l",
    image: "../img/HtoZZ.png",
    svg: "../svg/HtoZZ.svg",
    description: "3 events in the mass range 120-130 GeV, where a Higgs candidate decays into 4 muons, 2 muons and 2 electrons, and into 4 electrons."
});

Elab.hgammagamma_dataset = new Elab.Dataset({id:"HtoGammaGamma"});
Elab.hgammagamma_dataset.set({
    name: "HtoGammaGamma",
    image: "../img/HtoGammaGamma.png",
    svg: "../svg/HtoGammaGamma.svg",
    description: "10 events in the mass range 120-130 GeV, where a Higgs candidate decays into two photons.",
    url: "http://localhost:8000/data/diphoton.json"
});

Elab.datasets = new Elab.Datasets();

Elab.datasets.on("add", function(ds) {
    console.log("Added dataset: " + ds.get("id"));
});

Elab.jpsi_primary = new Elab.ParentParticle({id:"jpsi"});
Elab.jpsi_primary.set({
    name: "jpsi",
    description: "J/&#0968",
    urls: ["http://localhost:8000/data/dimuon_2-5GeV.json"]
});

Elab.Z_primary = new Elab.ParentParticle({id:"Z"});
Elab.Z_primary.set({
    name: "Z",
    description: "Z",
    urls: ["http://localhost:8000/data/Zmumu.json", "http://localhost:8000/data/Zee.json"]
});

Elab.W_primary = new Elab.ParentParticle({id:"W"});
Elab.W_primary.set({
    name: "W",
    description: "W",
    urls: ["http://localhost:8000/data/Wenu.json", "http://localhost:8000/data/Wmunu.json"]
});

Elab.dimuon_product = new Elab.DecayProduct({id:"dimuon"});
Elab.dimuon_product.set({
    name: "dimuon",
    description: "dimuon",
    urls: ["http://localhost:8000/data/dimuon_2-5GeV.json", "http://localhost:8000/data/Zmumu.json", "http://localhost:8000/data/dimuon100k.json"]
});

Elab.dielectron_product = new Elab.DecayProduct({id:"dielectron"});
Elab.dielectron_product.set({
    name: "dielectron",
    description: "dielectron",
    urls: ["http://localhost:8000/data/Zee.json", "http://localhost:8000/data/dielectron100k.json"]
});

Elab.enu_product = new Elab.DecayProduct({id:"enu"});
Elab.enu_product.set({
    name: "enu",
    description: "enu",
    urls: ["http://localhost:8000/data/Wenu.json"]
});

Elab.munu_product = new Elab.DecayProduct({id:"munu"});
Elab.munu_product.set({
    name: "munu",
    description: "munu",
    urls: ["http://localhost:8000/data/Wmunu.json"]
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

Elab.dielectron_parameters = new Elab.Parameters([
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

Elab.gammagamma_parameters = new Elab.Parameters([
    {name:"pt1", unit:"GeV", description:"The transverse momentum of the first photon", id:"pt1", selected:false},
    {name:"eta1", unit:"", description:"The pseudorapidity of the first photon", id:"eta1", selected:false},
    {name:"phi1", unit:"radians", description:"The phi angle of the first photon", id:"phi1", selected:false},
    {name:"pt2", unit:"GeV", description:"The transverse momentum of the second photon", id:"pt2", selected:false},
    {name:"eta2", unit:"", description:"The pseudorapidity of the second photon", id:"eta2", selected:false},
    {name:"phi2", unit:"radians", description:"The phi angle of the second photon", id:"phi2", selected:false},
    {name:"M", unit:"GeV", description:"The invariant mass of the two photons", id:"M", selected:false}
]);

Elab.jpsi_dataset.set('parameters', Elab.Jpsi_parameters);
Elab.zee_dataset.set('parameters', Elab.Zee_parameters);
Elab.zmumu_dataset.set('parameters', Elab.Zmumu_parameters);
Elab.wenu_dataset.set('parameters', Elab.Wenu_parameters);
Elab.wmunu_dataset.set('parameters', Elab.Wmunu_parameters);
Elab.dimuon_dataset.set('parameters', Elab.dimuon_parameters);
Elab.dielectron_dataset.set('parameters', Elab.dielectron_parameters);
Elab.hgammagamma_dataset.set('parameters', Elab.gammagamma_parameters);

Elab.datasets.add(Elab.jpsi_dataset);
Elab.datasets.add(Elab.zee_dataset);
Elab.datasets.add(Elab.zmumu_dataset);
Elab.datasets.add(Elab.wenu_dataset);
Elab.datasets.add(Elab.wmunu_dataset);
Elab.datasets.add(Elab.dimuon_dataset);
Elab.datasets.add(Elab.dielectron_dataset);
//Elab.datasets.add(Elab.h4l_dataset);
Elab.datasets.add(Elab.hgammagamma_dataset);

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
            //console.log(pv.$el.html());
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

Elab.CrossfilterView = Backbone.View.extend({
    template: _.template($('#crossfilter-template').html()),

    render: function() {
        $("#crossfilter-plots").html(this.template({parameters: this.collection.toJSON()}));
    }
});

Elab.FlotView = Backbone.View.extend({
    className: "plot",

    initialize: function() {
        this.render();
        this.model.on('change', this.redraw, this);
    },

    events: {
        'click button.logx': 'clickedLogX',
        'click button.logy': 'clickedLogY',
        'click button.binwidth': 'clickedBinWidth',
        'click button.ymax': 'clickedYMax',
        'click button.undo': 'clickedUndo',
        'plotselected': 'plotSelected'
    },

    plotSelected: function(e, ranges) {
        console.log("You selected " + ranges.xaxis.from + " to " + ranges.xaxis.to);
        this.zoomSelection(ranges);
    },

    zoomSelection: function(ranges) {
         this.model.set('options', $.extend(true, {}, this.model.get('options'), {xaxis:{min: ranges.xaxis.from, min: ranges.xaxis.to}}));  
    },

    goBack: function() {
        this.model.set('options', $.extend(true, {}, this.model.previousAttributes()));
        console.log(this.model.get('options'));
    },

    clickedLogX: function() {
        var selected = ! $(this.el).find('button.logx').hasClass('active');
        
        if ( selected ) {
            $.extend(true, this.model.get('options'), {xaxis:{transform: function(v) {return v > 0 ? Math.log(v) : 0;}}});
            this.model.trigger('change', this.model);  
        } else {
            this.goBack();  
        }
    },

    clickedLogY: function() {
        var selected = ! $(this.el).find('button.logy').hasClass('active');

        if ( selected ) {
            // This changes the attributes, but the change event doesn't trigger
            $.extend(true, this.model.get('options'), {yaxis: {transform: function(v) {return v > 0 ? Math.log(v) : 0;}}});
            this.model.trigger('change', this.model);
        } else {
           this.goBack();
        }
    },

    clickedBinWidth: function() {
        var value = $(this.el).find('input[name=binwidth]').val();
        console.log(this.id + ' binwidth= ' + value);
        var name = this.model.get('name');

        this.model.set('data', [Elab.buildHistogram(Elab.raw_data.map(function(d) {return d[name];}), value)]);
    },

    clickedYMax: function() {
        var value = $(this.el).find('input[name=ymax]').val();
        console.log(this.id + ' ymax= ' + value);
    },

    clickedUndo: function() {
        this.goBack();
    },

    template: _.template($('#flot-template').html()),

    render: function() {
        $(this.el).html(this.template({plot: this.model.toJSON()}));
    },

    redraw: function() {
        console.log('redraw!');
        $.plot(("#"+this.model.get('title')+" .placeholder"), this.model.get('data'), this.model.get('options'));
    }
});

Elab.FlotPlotsView = Backbone.View.extend({
    render: function() {
        this.collection.each(function(p) {
            pv = new Elab.FlotView({model:p, id:p.get('title')});

            $("#flot-plots").append(pv.el);
            $.plot(("#"+p.get('title')+" .placeholder"), p.get('data'), p.get('options'));
            $('#'+p.get('title')+' .title').html(p.get('title'));
        }, this);  
    }
});

Elab.buildHistogram = function(data, bw) {
    data = data.map(function(d) {return +d;});
    
    var minx = d3.min(data),
        maxx = d3.max(data),
        nbins = Math.floor((maxx-minx) / bw);

    console.log('min, max, binwidth, nbins: ' + minx + ', ' + maxx + ', ' + bw + ', ' + nbins);

    var histogram = d3.layout.histogram();
    histogram.bins(nbins);
    data = histogram(data);

    var output = [];
    for ( var i = 0; i < data.length; i++ ) {
        output.push([data[i].x, data[i].y]);
        output.push([data[i].x + data[i].dx, data[i].y]);
    }
    return output;
};

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

        // Here we just put all parameters in crossfilter view and render in showPlots
        Elab.crossfilter_view.collection = Elab.datasets.get(name).get('parameters');
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
                var histogram = Elab.buildHistogram(Elab.raw_data.map(function(d) {return d[name];}), 0.1);
                var plot = new Elab.Plot({data: [histogram], title: name, name: name});

                plot.on("change", function(p){
                    console.log('changed attributes: ' + p.changedAttributes());
                });

                Elab.plots.add(plot);
            }, this);

        Elab.emptyAll();
        Elab.plot_page_view.render();

        Elab.flot_plots_view.collection = Elab.plots;
        Elab.flot_plots_view.render();

        Elab.crossfilter_view.render();
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
    }
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
    Elab.crossfilter_view = new Elab.CrossfilterView();

    Elab.router = new Elab.Router();
    Backbone.history.start();
});


