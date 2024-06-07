// api/recipe.js
const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const dotenv = require('dotenv');
const axios = require('axios');
const { db } = require('../firebaseAdmin');
dotenv.config();
const router = express.Router();
const baseURL = 'https://api.edamam.com/api/recipes/v2'; // can add /{id} to get a specific recipe by id

// Save a recipe to a user's saved recipes
router.post('/save', authenticateToken, async (req, res) => {
    const userId = req.query.userid;
    const recipeId = req.query.recipeid;

    try {
        const userRef = db.collection('user').doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            await userRef.set({ recipes: [`/recipe/${recipeId}`] });
            res.status(200).send('Recipe saved');
            return
        }

        const userData = userDoc.data();
        const savedRecipes = userData.recipes || [];

        if (!savedRecipes.includes(`/recipe/${recipeId}`)) {
            savedRecipes.push(`/recipe/${recipeId}`);
            await userRef.update({ recipes: savedRecipes });
            return
        }
        res.status(200).send('Recipe saved successfully');
        return
    } catch (error) {
        console.error('Error saving recipe:', error);
        res.status(500).send('Internal Server Error');
        return
    }
});

// Unsave a recipe from a user's saved recipes
router.post('/unsave', authenticateToken, async (req, res) => {
    const userId = req.query.userid;
    const recipeId = req.query.recipeid;

    try {
        const userRef = db.collection('user').doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).send('User not found');
        }

        const userData = userDoc.data();
        const savedRecipes = userData.recipes || [];

        const recipeIndex = savedRecipes.indexOf(`/recipe/${recipeId}`);
        if (recipeIndex > -1) {
            savedRecipes.splice(recipeIndex, 1);
            await userRef.update({ recipes: savedRecipes });
        }

        res.status(200).send('Recipe unsaved successfully');
    } catch (error) {
        console.error('Error unsaving recipe:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Check if a recipe is saved by user
router.get('/isSaved', authenticateToken, async (req, res) => {
    const userId = req.query.userid;
    const recipeId = req.query.recipeid;
    const docRef = db.collection('user').doc(userId);
    try {
        await docRef.get().then((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                const savedRecipes = userData.recipes || [];
                res.status(200).json({ isSaved: savedRecipes.includes(`/recipe/${recipeId}`) });
            } else {
                res.status(200).send({ isSaved: false });
            }
        });
    } catch (error) {
        console.error('Error checking if recipe is saved:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Get all saved recipes
router.get('/saved', authenticateToken, async (req, res) => {
    const userId = req.query.userid;
    const docRef = db.collection('user').doc(userId);
    try {
        await docRef.get().then(async (doc) => {
            if (doc.exists) {
                const userData = doc.data();
                const savedRecipes = userData.recipes || [];

                // Iterate through the savedRecipes array and get the recipe data for each recipe ID
                const recipeIDs = savedRecipes.map((recipePath) => {
                    return (recipePath.split('/').pop());
                });
                const recipes = []
                console.log(recipeIDs)
                for (const recipeID of recipeIDs) {
                    const recipeRef = db.collection('recipe').doc(recipeID);
                    const recipeDoc = await recipeRef.get();
                    const recipeData = recipeDoc.data();
                    const fieldsInitial = ['image', 'images'];

                    const optionsInitial = {
                        params: {
                            app_id: process.env.APP_ID,
                            app_key: process.env.APP_KEY,
                            id: recipeDoc.id,
                            type: 'public',
                            field: fieldsInitial,
                        },
                        paramsSerializer: {
                            indexes: null,
                        }
                    };
                    if (recipeDoc.exists) {
                        if (!recipeData.isUserGenerated) {
                            const newResponse = await axios.get(`${baseURL}/${recipeDoc.id}`, optionsInitial);
                            recipeData.images = newResponse.data.recipe.images;
                            recipeData.image = newResponse.data.recipe.image;
                        }
                        recipes.push({ ...recipeData, id: recipeDoc.id });
                    } else {
                        recipes.push(null);
                    }
                }
                res.status(200).json({ recipes: recipes.filter(recipe => recipe !== null) });
            } else {
                res.status(200).send({ recipes: [] });
            }
        });
    } catch (error) {
        console.error('Error getting saved recipes:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Get all user-created recipes
router.get('/created', authenticateToken, async (req, res) => {
    const user = req.query.user;
    const docRef = db.collection('recipe');
    try {
        await docRef.get().then((snapshot) => {
            const recipes = [];
            snapshot.forEach((doc) => {
                const recipeData = doc.data();
                if (recipeData.source === user) {
                    recipes.push({ ...recipeData, id: doc.id });
                }
            });
            res.status(200).json({ recipes });
        });
    } catch (error) {
        console.error('Error getting created recipes:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
