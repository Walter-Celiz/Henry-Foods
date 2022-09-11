// const axios = require("axios");
// const { API_KEY } = process.env;
const { Diet } = require("../db");
const API = require("../api.json")

const getAllDiets = async (req, res) => {
    try {
        // const apiCall = await axios.get(
        //     `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=30`
        // );
        const apiDiets = API.results.map(recipe => recipe.diets);
        const flatDiets = apiDiets.flat();
        const unique = [...new Set(flatDiets)];
        const diets = unique.map((name) => ({ name }));

        await Diet.bulkCreate(diets);
    } catch (error) {
        console.log(error + " #getAllDiets fail!!! 🔴🔴🔴🔴 ");
    }
};

module.exports = {
    getAllDiets,
};