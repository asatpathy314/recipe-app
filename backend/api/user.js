// api/recipe.js
const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const dotenv = require('dotenv');
const { db } = require('../firebaseAdmin');
dotenv.config();
const router = express.Router();

// Save a recipe to a user's saved recipes
router.post('/save', authenticateToken, async (req, res) => {
    const userId = req.query.userid;
    const recipeId = req.query.recipeid;

    try {
        const userRef = db.collection('user').doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            userRef.set({ recipes: [db.collection('recipe').doc(recipeId)] });
            res.status(200).send('Recipe saved')
        }

        const userData = userDoc.data();
        const savedRecipes = userData.recipes || [];

        if (!savedRecipes.includes(`/recipe/${recipeId}`)) {
            savedRecipes.push(`/recipe/${recipeId}`);
            await userRef.update({ recipes: savedRecipes });
        }

        res.status(200).send('Recipe saved successfully');
    } catch (error) {
        console.error('Error saving recipe:', error);
        res.status(500).send('Internal Server Error');
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
                res.status(404).send('User not found');
            }
        });
    } catch (error) {
        console.error('Error checking if recipe is saved:', error);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;
