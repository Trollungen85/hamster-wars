const express = require('express')
const router = express.Router()
const getDatabase = require('../database.js')
const db = getDatabase()

// GET /winners
router.get('/', async (req, res) => {
    const getHamsters = db.collection('hamsters')
    let winnerHamster = [];
    
    try {
        const snapShot = await getHamsters.orderBy('wins', 'desc').limit(5).get();
        if (snapShot.empty) {
            res.status(404).send('There are no hamsters here!')
            return;
        }
        
        snapShot.forEach(doc => {
            const data = doc.data();
            data.id = doc.id;
            console.log(data.id);
            winnerHamster.push(data);
        });
        
        res.send(winnerHamster);
    } 
    catch (error) {
        res.status(500).send(error.message)
    }
});

module.exports = router