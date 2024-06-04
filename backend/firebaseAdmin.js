const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const serviceAccount = require('./serviceAccountKey.json');

const app = initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const auth = getAuth(app);
module.exports = {db, auth};