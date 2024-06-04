// api/recipe.js
const express = require('express');
const authenticateToken  = require('../middleware/authenticateToken');
const axios = require('axios');
const dotenv = require('dotenv')
dotenv.config();
console.log(dotenv.config());
const baseURL = 'https://api.edamam.com/api/recipes/v2';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
    const query = req.query.q;
    const edamam_type = 'public'; // public or private recipes
    const dishType = req.query.dishType;
    const cuisineType = req.query.cuisineType;
    const mealType = req.query.mealType;
    if (!dishType && !cuisineType && !mealType && !query) {
        return res.status(400).json({ message: 'Invalid query' });
    } 
    try {
        axios.get(`${baseURL}/`, {
                params: {
                    q: 123,
                    app_id: process.env.APP_ID,
                    app_key: process.env.APP_KEY,
                    type: edamam_type,
                    cuisineType: cuisineType,
                    mealType: mealType,
                    dishType: dishType,
                }
            })
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

router.get('/random', authenticateToken, (req, res) => {
    const edamam_type = 'public'; // public or private recipes
    const query = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    try {
        axios.get(`${baseURL}/`, {
                params: {
                    q: query,
                    app_id: process.env.APP_ID,
                    app_key: process.env.APP_KEY,
                    type: edamam_type,
                }
            })
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
})

module.exports= router;
