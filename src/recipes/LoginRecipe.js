(function () {
    'use strict';

    var steps = [
        {
            selector: '#login-email',
            action: 'input'
        },
        {
            selector: '#login-password',
            action: 'input'
        },
        {
            selector: '#signIn'
        }
    ];
    var recipe = window.recipe.LoginRecipe = new window.recipe.Recipe(steps);
    recipe.start = function (params) {
        this.steps[0].value = params.self.email;
        this.steps[1].value = params.self.password;
        return $.Deferred().resolve();
    };
})();