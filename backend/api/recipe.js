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
    console.log('3.14159265')
    const query = req.query.q;
    const dishType = req.query.dishType;
    const cuisineType = req.query.cuisineType;
    const mealType = req.query.mealType;
    
    if (!dishType && !cuisineType && !mealType && !query) {
        return res.status(400).json({ message: 'Invalid query' });
    }

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
    if (dishType) {
        params.params.dishType = dishType;
    }
    if(cuisineType) {
        params.params.cuisineType = cuisineType;
    }
    if(mealType) {
        params.params.mealType = mealType;
    }
    if(query) {
        params.params.q = query;
    }


    try {
        axios.get(`${baseURL}/`, params)
            .then((response) => {
                const formattedRecipes = response.data.hits.map((recipe) => recipe.recipe);
                res.status(200).json(formattedRecipes);
            })
            .catch((error) => {
                console.error(error.message);
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    const newRecipe = req.body;
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

router.get("/unapproved", authenticateToken, async (req, res) => {
    const recipes = [];
    const snapshot = await db.collection('recipe').where('isApproved', '==', false).get();
    snapshot.forEach((doc) => {
        recipes.push(
            {   
                ...doc.data(),
                id: doc.id,            
            });
    });
    res.status(200).json(recipes);
});

router.get('/getByID/:id', authenticateToken, async (req, res, next) => {
    console.log('3.14159265')
    const recipeId = req.params.id;
    const fieldsInitial = ['image', 'images'];
    const fieldsFinal = [
        'image', 'images', 'uri', 'source', 'cuisineType', 'mealType', 'dishType', 'label', 'ingredients', 'calories'
    ];

    const optionsInitial = {
        params: {
            app_id: process.env.APP_ID,
            app_key: process.env.APP_KEY,
            id: recipeId,
            type: 'public',
            field: fieldsInitial,
        },
        paramsSerializer: {
            indexes: null,
        }
    };

    const optionsFinal = {
        params: {
            app_id: process.env.APP_ID,
            app_key: process.env.APP_KEY,
            id: recipeId,
            type: 'public',
            field: fieldsFinal,
        },
        paramsSerializer: {
            indexes: null,
        }
    };

    try {
        const docRef = db.collection('recipe').doc(recipeId);
        const recipeDoc = await docRef.get();

        if (recipeDoc.exists) {
            const recipeData = recipeDoc.data();
            if (!recipeData.isUserGenerated) {
                const newResponse = await axios.get(`${baseURL}/${recipeId}`, optionsInitial);
                recipeData.images = newResponse.data.recipe.images;
                recipeData.image = newResponse.data.recipe.image;
            }

            // Get all comments for the recipe
            const commentsSnapshot = await docRef.collection('comment').get();
            const comments = await Promise.all(commentsSnapshot.docs.map(async (commentDoc) => {
                const commentData = commentDoc.data();
                commentData.id = commentDoc.id;
                commentData.createdAt = commentData.createdAt.toDate();

                // Get all comments for each reply
                const repliesSnapshot = await commentDoc.ref.collection('reply').get();
                const replies = repliesSnapshot.docs.map(replyDoc => ({
                    id: replyDoc.id,
                    ...replyDoc.data(),
                    createdAt: replyDoc.data().createdAt.toDate(),
                }));

                commentData.replies = replies;
                return commentData;
            }));

            // Add comments to the recipe data
            recipeData.comments = comments;

            res.status(200).json(recipeData);
            console.log(recipeData);
        } else {
            const response = await axios.get(`${baseURL}/${recipeId}`, optionsFinal);
            console.log(response.data.recipe);
            const newRecipe = {
                ...response.data.recipe,
                isUserGenerated: false,
                isApproved: true,
                comments: [],
            };

            res.status(200).json(newRecipe);

            const dbRecipe = {
                ...response.data.recipe,
                isUserGenerated: false,
                isApproved: true,
            };

            await db.collection('recipe').doc(recipeId).set(dbRecipe, { merge: true });
        }
    } catch (error) {
        console.error(error);
    }
});


module.exports = router;
