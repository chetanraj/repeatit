(function () {
    var steps = [
        {
            selector: '#question-raw-content',
            action: 'redactor'
        },
        {
            selector: '.true-false-answer-select:eq(0)',
            action: 'click'
        },
        {
            type: 'recipe',
            recipeId: 'FillSolutionHintRecipe',
            params: {
                solution: "This is sample solution",
                hint: "This is sample hint"
            }
        },
        {
            selector: '#saveQuestionDetails1',
            action: 'click'
        }
    ];

    var recipe = window.recipe.FillTrueFalseRecipe = new window.recipe.Recipe(steps);
    recipe.start = function (params) {
        this.steps[0].value = params.questionTitle;

        var answerIndex = Math.round(Math.random());
        this.steps[1].selector = '.true-false-answer-select:eq(' + answerIndex + ')';
    }
})();
