// api/recipe.js
const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const axios = require('axios');
const dotenv = require('dotenv');
const { db } = require('../firebaseAdmin');
dotenv.config();
const baseURL = 'https://api.edamam.com/api/recipes/v2'; // can add /{id} to get a specific recipe by id
const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
    const query = req.query.q;
    const edamam_type = 'public'; // public or private recipes
    const dishType = req.query.dishType;
    const cuisineType = req.query.cuisineType;
    const mealType = req.query.mealType;
    
    const fields = [
        'image',
        'images',
        'uri',
        'label',
    ];
    
    const params = {
        params: {
        q: query,
        app_id: process.env.APP_ID,
        app_key: process.env.APP_KEY,
        type: 'public',
        cuisineType: cuisineType,
        mealType: mealType,
        dishType: dishType,
        field: fields,
        },
        paramsSerializer: {
            indexes: null,
        }
    };

    if (!dishType && !cuisineType && !mealType && !query) {
        return res.status(400).json({ message: 'Invalid query' });
    }
    try {
        axios.get(`${baseURL}/`, params)
            .then((response) => {
                res.status(200).json(response.data);
            })
            .catch((error) => {
                console.error(error.message);
                res.status(500).json({ message: 'Internal Server Error' });
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    const newRecipe = req.body.data;
    let docRef;
    if (!req.body.data) {
        docRef = db.collection('recipe').doc();
    }
    else {
        docRef = db.collection('recipe').doc(req.body.data.id);
    }
    try {
        await docRef.set(newRecipe, {merge: true})
        res.status(200).json({ message: 'Recipe added successfully' });
    } catch (error) {
        console.log(error);
        console.log(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/random', authenticateToken, (req, res) => {
    const edamam_type = 'public'; // public or private recipes
    const query = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    
    const fields = [
        'image',
        'images',
        'uri',
        'label',
    ];
    
    const params = {
        params: {
        q: query,
        app_id: process.env.APP_ID,
        app_key: process.env.APP_KEY,
        type: 'public',
        field: fields,
        },
        paramsSerializer: {
            indexes: null,
        }
    };

    try {
        axios.get(`${baseURL}`, params)
            .then((response) => {
                const formattedRecipes = response.data.hits.map((recipe) => recipe.recipe);
                res.status(200).json(formattedRecipes);
            })
            .catch((error) => {
                console.error(error.message);
                console.error(error)
                res.status(500).json({ message: 'Internal Server Error' });
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    const recipeId = req.params.id;
    const docRef = db.collection('recipe').doc(recipeId);
    const doc = await docRef.get();
    
    if (doc.exists) {
        res.status(200).json(doc.data());
        return;
    }

    const fields = [
        'image',
        'images',
        'uri',
        'source', 
        'cuisineType',
        'mealType',
        'dishType',
        'label',
        'ingredients',
        'calories',
    ];
    
    const params = {
        params: {
        app_id: process.env.APP_ID,
        app_key: process.env.APP_KEY,
        id: recipeId,
        type: 'public',
        field: fields,
        },
        paramsSerializer: {
            indexes: null,
        }
    };

    try {
        const response = await axios.get(`${baseURL}/${recipeId}`, params)
        res.status(200).json(response.data);
        const newRecipe = {
            ...response.data.recipe,
            isUserGenerated: false,
            isApproved: true,
        }
        await db.collection('recipe').doc(recipeId).set(newRecipe, {merge: true});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
