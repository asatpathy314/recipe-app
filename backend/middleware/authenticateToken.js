// middleware/authenticateToken.js
const { auth }= require('../firebaseAdmin');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('huh')
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const idToken = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authenticateToken;
