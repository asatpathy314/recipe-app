const express = require("express");
const axios = require("axios");
const { auth } = require("./firebaseAdminInitializer");
const dotenv = require('dotenv')
dotenv.config()
const { createCustomToken } = require("firebase-admin/auth");

const router = express.Router();

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Missing email or password" });
    }
    try {
        auth.createUser({
            email: email,
            emailVerified: false,
            password: password,
            disabled: false,
        }).then((userRecord) => {
            console.log('Successfully created new user:', userRecord.uid);
            res.status(200).json(userRecord);
        }).catch((error) => {
            console.log('Error creating new user:', error);
            res.status(400).json({ error: error.message });
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
