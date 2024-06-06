const express = require("express");
const { db } = require('../firebaseAdmin');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const admin = require('firebase-admin');

router.get('/', authenticateToken, async (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({ message: 'Invalid request' });
    }
    const ref = db.collection('recipe').doc(id).collection('comment');
    try {
        const snapshot = await ref.get();
        const comments = [];
        snapshot.forEach(doc => {
            comments.push({
                id: doc.id,
                ...doc.data()
            });
        });
        res.status(200).json(comments);
    } catch (error) {
        console.log(error);
        console.log(error.message);
    }
})

router.post('/', authenticateToken, async (req, res) => {
    const id = req.query.id
    const { text, user } = req.body;
    if (!text || !user || !id)  {
        return res.status(400).json({ message: 'Invalid request' });
    }

    console.log(id);
    const ref = db.collection('recipe').doc(id).collection('comment').doc();

    try { 
        // Update the recipe with the new comment
        await ref.set({
            text,
            user,
            createdAt: admin.firestore.FieldValue.serverTimestamp() // Use Firebase server timestamp
        });
        res.status(201).json({ id: ref.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// API Route is http://localhost:8000/comment/reply
// This route is used to reply to a comment
router.post('/reply', authenticateToken, async (req, res) => {
    const postid = req.query.postid;
    const commentid = req.query.commentid;
    const { text, user } = req.body;
    if (!text || !user || !postid || !commentid)  {
        return res.status(400).json({ message: 'Invalid request' });
    }
    const ref = db
                .collection('recipe').doc(postid)
                .collection('comment').doc(commentid)
                .collection('reply').doc();
    try { 
        // Update the comment with the new reply
        await ref.set({
            text,
            user,
            createdAt: admin.firestore.FieldValue.serverTimestamp() // Use Firebase server timestamp
        });
        res.status(201).json({ id: ref.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
