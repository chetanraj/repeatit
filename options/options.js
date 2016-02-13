$(function () {
    var MainView = Backbone.View.extend({
        el: ".container",
        initialize: function () {
            var self = this;
            this.accordionChoiceTemplate = $("#accordion-panel-template").text();
            this.parameterSetTemplate = $("#parameterSetTemplate").text();
            chrome.storage.sync.get('recipelist', function (result) {
                self.collection = new Backbone.Collection(result.recipelist);
                self.renderRecipes();
            });
        },
        events: {
            "keyup #search": "searchOnKeyup",
            "click .parameter-sets .reset": "resetParameterSets",
            "click .parameter-sets .save": "saveParameterSets"
        },
        saveParameterSets: function (e) {
            var recipeId = $(e.currentTarget).data('recipeid');
            var $recipeContainer = this.$("#recipe-" + recipeId);
            var paramSets = {};
            //{setName:{paramKey:paramValue}, setName2:{paramKey2:paramValue2, paramKey3:paramValue3}}
            $recipeContainer.find("[data-paramset]").each(function () {
                var setName = $(this).data('paramset').replace(recipeId + '-', '');
                paramSets[setName] = {};
                $(this).find("[data-paramkey]").each(function () {
                    var paramKey = $(this).data('paramkey');
                    var paramValue = $(this).val();
                    paramSets[setName][paramKey] = paramValue;
                });
            });
            var storageKey = 'params-' + recipeId,
                obj = {};
            obj[storageKey] = paramSets;
            chrome.storage.sync.set(obj, function () {
                console.log("Saved ParameterSets to storage : " + recipeId);
                window.location.reload();       //Todo re-render of reicpe instead of reload.
            });
        },
        resetParameterSets: function (e) {
            var recipeId = $(e.currentTarget).data('recipeid');
            chrome.storage.sync.get('recipelist', function (r) {
                var recipelist = r.recipelist;
                var recipe = _.find(recipelist, function (recipe) {
                    return recipe.id === recipeId;
                });
                var parameterSets = {};
                parameterSets["params-" + recipe.id] = recipe.params;
                chrome.storage.sync.set(parameterSets, function () {
                    console.log("Reset ParameterSets to default : " + recipe.id);
                    window.location.reload();       //Todo re-render of recipe accordion instead of reload
                });
            });
            //Todo code to reset parameterSets for the clicked recipe
            //Remove from storage params-recipeId
            //Take from storage - recipelist
            //Save in storage
            //Render this particular recipe
        },
        searchOnKeyup: function (e) {
            var self = this;
            clearTimeout(this.searchTimeout);
            var searchTerm = $(e.currentTarget).val();
            this.searchTimeout = setTimeout(function () {
                self.findRecipes(searchTerm.toLowerCase());
            }, 200);
        },
        findRecipes: function (searchTerm) {
            var self = this;
            _.each(this.collection.models, function (model) {
                if (model.get('title').toLowerCase().indexOf(searchTerm) > -1 || model.get('description').toLowerCase().indexOf(searchTerm) > -1) {
                    self.$("#recipe-" + model.get('id')).show();
                } else {
                    self.$("#recipe-" + model.get('id')).hide();
                }
            });
        },
        renderRecipes: function () {
            var self = this;
            _.each(this.collection.models, function (model) {
                if (model.get('type') === 'parent') {
                    self.$("#accordion").append(_.template(self.accordionChoiceTemplate)({data: model.toJSON()}));
                    if (model.get('params')) {
                        self.renderParameterSets(model);
                        self.$("#recipe-" + model.get('id')).find(".actions").show();
                    }
                }
            });
            this.$(".collapse:eq(0)").addClass('in');
        },
        renderParameterSets: function (model) {
            var self = this,
                storageKey = 'params-' + model.get('id'),
                $parameterSets = self.$("#recipe-" + model.get('id') + " .parameter-sets ");

            chrome.storage.sync.get(storageKey, function (m) {
                var params = m[storageKey];
                _.each(params, function (value, key) {
                    var tabTitle = '<li><a href="#parameterSet-' + model.get('id') + '-' + key + '" data-toggle="tab">' + key + '</a></li>'
                    $parameterSets.find(".tabs-left").append(tabTitle);

                    var tabContent = _.template(self.parameterSetTemplate)({
                        data: {
                            id: model.get('id') + '-' + key,
                            params: value
                        }
                    });
                    $parameterSets.find(".tab-content").append(tabContent);
                });
                $parameterSets.find(".tabs-left li:first").addClass('active');
                $parameterSets.find(".tab-content .tab-pane:first").addClass('active');
            });
        }
    });
    new MainView();
});