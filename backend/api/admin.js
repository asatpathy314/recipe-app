// api/recipe.js
const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const dotenv = require('dotenv');
const { db } = require('../firebaseAdmin');
dotenv.config();
const router = express.Router();

router.post('/approve', authenticateToken, async (req, res) => {
    console.log('huh')
    const docRef = db.collection('recipe').doc(req.query.id);
    try { 
        await docRef.update({
            isApproved: true
        })
        res.status(200).json({message: "Recipe approved"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error."})
    }
});

router.post('/delete', authenticateToken, async (req, res) => {
    const docRef = db.collection('recipe').doc(req.query.id);
    try { 
        await docRef.delete()
        res.status(200).json({message: "Recipe deleted"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error."})
    }
});


module.exports = router;
