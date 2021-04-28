const express = require('express')
const router = express.Router()
const getDatabase = require('../database.js')
const db = getDatabase()

// GET /matchWinners/:id
router.get('/:id', async (req, res) => {
    const matchesRef = db.collection('matches')
    const snapshot = await matchesRef.where('winnerId', '==', req.params.id).get();
    console.log(snapshot.empty);
    
    if (snapshot.empty) {
        console.log('No matching documents.');
        res.status(404).send('This hamster has not won yet!')
        return;
    }
    let allMatches = [];
    snapshot.forEach(doc => {
        const data = doc.data();
        data.id = doc.id;
        console.log(doc.id, '=>', doc.data());
        allMatches.push(data);
    });
    res.status(200).send(allMatches);
    
});

module.exports = router