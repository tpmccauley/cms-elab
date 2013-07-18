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

Elab.CrossfilterView = Backbone.View.extend({
    template: _.template($('#crossfilter-template').html()),

    render: function() {
        $("#crossfilter-plots").append(this.template({parameters: this.collection.toJSON()}));

        /*
        this.collection.each(function(ch) {
            var name = ch.get('name');

            // ugh. interface.
            var xmax = ch.get('dimension').top(1)[0][name];
            var xmin = ch.get('dimension').bottom(1)[0][name];

            ch.set('x', d3.scale.linear().domain([xmin, xmax]).rangeRound([0, 400]));
            ch.set('width',  ch.get('x').range()[1]);
            ch.set('height', ch.get('y').range()[0]);
            ch.get('y').domain([0, ch.get('group').top(1)[0].value]);

            console.log(ch.toJSON());

        }, this);
        */
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
            // so we trigger it manually
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