const express = require("express");
const { db } = require('../firebaseAdmin');
const router = express.Router();
const { authenticateToken } = require('../middleware/authenticateToken');

module.exports = router;

/*
Example of authenticated request

axios.get('http://localhost:8000/api/protected', {
    headers: {
    'Authorization': `Bearer ${accessToken}`
    }
})
.then(response => {
    console.log(response.data);
})
.catch(error => {
    console.error('Error:', error);
});

Example of a protected route;

router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

*/