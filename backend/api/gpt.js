const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const axios = require('axios');
const dotenv = require('dotenv')
dotenv.config();
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const router = express.Router();

/*
In order to use the API route send 
    1. Authorization: Bearer ${accessToken}
    2. Send a json object formatted as follows:
        {
            "messages" : [
                {
                    "role": "user",
                    "content": "What is the capital of France?"
                },
                {
                    "role": "assistant",
                    "content": "The capital of France is Paris.
                },
                {
                    "role": "user",
                    "content": "What is the capital of Spain?"
                },
            ]
        }
*/

router.post('/', authenticateToken, async (req, res) => {
    const assistantContext = [{ "role": "system", "content": "You are a helpful assistant. You are here to help the user with cooking. Do not answer questions unrelated to cooking." }]
    const context = assistantContext.concat(req.body.messages);
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: context
        })
        res.status(200).json(completion.choices[0]);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
