# Repeat It
> A User Action Simulator Chrome Extension



## Installation

1. Clone this repo
2. Visit `chrome://extensions` in Chrome
3. Select `Developer Mode`
4. Click on `Load unpacked extension`
5. Select the directory in which this repo is cloned



## Steps to create a new Recipe

1. Create a new Recipe.js file (for e.g. MyNewRecipe.js)
2. Create a new entry in the array defined in recipes.json. 
3. Before committing run the gulp task `scripts` so that your recipe is minified and added to the extension (inject.js)

>NOTE - Make sure the `id` of the new entry matches with the global namespace of the recipe. For e.g. window.recipe.myNewRecipe should always have `id = myNewRecipe`



## Todos

1. Make the search box functional so that recipes can be searched by their title in real-time i.e. search as you type (after initial loading)
2. Load recipes.json only once for the entire browser session
3. Placeholder for search input
4. Create Mini-Recipes which has no existence alone but can always be clubbed with actual Recipes (`steps : [{selection, action, type}]`)
5. Organization of all Recipes and Mini-Recipes in directories and corresponding gulp task changes
6. Test to make sure all Recipes are present in inject.js combined and every recipe contains `steps`
7. Create a video showing installation and usage.
8. When recording show some kind of highlighting in the extension icon and Record button.
9. Create a options page to import/export all/selective recipes/recordings but these won't be available to all extension installations. (Needs fileSystem permission)
10. Upgrade extension to use Backbone so that recipelist can be a Backbone collection with unique recipe ids and appropriate events to update popup.html DOM.
11. Recorded recipes should wait for DOM manipulation and ajax-requests to complete before triggering the next step.



## RoadMap

1. Ability to record actions and create a recipe at run-time
2. Ability to run these recipes from Selenium (Extension install and execute on console - `window.recipe.RecipePlayer(someRecipe)`
3. Put this extension in Chrome Store
4. Implement usageCount of every recipe globally (across all installations)
5. Implement normalCompletionTime for every recipes' manual execution and record actual execution average across all installations to show how much did we saved.
6. Recipe options and a way to edit options for every recipe and local saving without affecting any other installation.
7. Write a plugin for firefox
8. Create gulp tasks to create packaged extensions to be installed in chrome & firefox, with versions and add them to releases.
