const express = require('express')
const router = express.Router()
const getDatabase = require('../database.js')
const db = getDatabase()

// GET /losers
router.get('/', async (req, res) => {
    const getHamsters = db.collection('hamsters')
    const snapShot = await getHamsters.orderBy('defeats', 'desc').limit(5).get();
    let loserHamster = [];
    
    //felmeddelande
    if (snapShot.empty) {
        res.status(404).send('There are no hamsters here!')
        return;
    }

    snapShot.forEach(doc => {
        const data = doc.data();
        data.id = doc.id;
        console.log(data.id);
        loserHamster.push(data);
    });
    
    res.send(loserHamster);
    });

module.exports = router