
const initialState = {
    recipes: [],
    detail: [],
    allRecipes: [],
    recipesLoaded: [],
    diets: [],
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_RECIPES":
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
            };

        case "GET_RECIPE_BY_NAME":
            return {
                ...state,
                recipes: action.payload,
            };

        // case 'FILTER_BY_STRIC_DIET':
        //     const allRecipes = state.allRecipes;
        //     const dietFiltered = action.payload === ""
        //         ? allRecipes
        //         : allRecipes.filter(recipe => recipe.diets === action.payload)
        //     return {
        //         ...state,
        //         recipes: dietFiltered
        //     }

        case "FILTER_BY_DIET":
            const allRecipes = state.allRecipes;
            const dietFiltered =
                action.payload === ""
                    ? allRecipes
                    : //trae lo que incluya el payload
                    allRecipes.filter((recipe) =>
                        recipe.diets.includes(action.payload)
                    );
            return {
                ...state,
                recipes: dietFiltered,
            };

        case "FILTER_CREATED":
            const allRecipes2 = state.allRecipes;
            const createdFilter = action.payload === "created"
                ? allRecipes2.filter((recipe) => recipe.createdInDb)
                : allRecipes2.filter((recipe) => !recipe.createdInDb);
            console.log(createdFilter)
            return {
                ...state,
                recipes: action.payload === "all" ? state.allRecipes : createdFilter,
            };

        case "ORDER_BY_NAME":
            let sortedRecipesNames =
                action.payload === "asc"
                    ? state.recipes.sort(function (a, b) {
                        if (a.name > b.name) return 1;
                        if (b.name > a.name) return -1;
                        return 0; //si es 0 el resultado lo deja igual
                    })
                    : state.recipes.sort(function (a, b) {
                        if (a.name > b.name) return -1;
                        if (b.name > a.name) return 1;
                        return 0;
                    });
            return {
                ...state,
                recipes: sortedRecipesNames,
            };

        case "ORDER_BY_SCORE":
            let sortedRecipesHealthScore =
                action.payload === "ascd"
                    ? state.recipes.sort(function (a, b) {
                        if (a.healthScore > b.healthScore) return 1;
                        if (b.healthScore > a.healthScore) return -1;
                        return 0; //si es 0 el resultado lo deja igual
                    })
                    : state.recipes.sort(function (a, b) {
                        if (a.healthScore > b.healthScore) return -1;
                        if (b.healthScore > a.healthScore) return 1;
                        return 0;
                    });
            return {
                ...state,
                recipesLoaded: sortedRecipesHealthScore,
            };

        case "POST_RECIPE":
            return {
                ...state,
            };

        case "GET_DIETS":
            return {
                ...state,
                diets: action.payload,
            };

        case "GET_RECIPE_DETAIL":
            return {
                ...state,
                detail: action.payload,
            };

        default:
            return state;
    }
}

export default rootReducer;
