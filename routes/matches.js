const express = require('express')
const router = express.Router()
const getDatabase = require('../database.js')
const db = getDatabase()

// GET /matches
router.get('/', async (req, res) => {
    const matchesRef = db.collection('matches')
    const snapShot = await matchesRef.get()

    let allMatches = [];
    
    //felmeddelande
    if (snapShot.empty) {
        res.status(404).send('There are no hamsters here!')
        return;
    };

    snapShot.forEach(doc => {
        const data = doc.data();
        data.id = doc.id;
        console.log(data.id);
        allMatches.push(data);
    });

    res.send(allMatches);
});

// GET /matches/:id
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const matchIdRef = await db.collection('matches').doc(id).get();

    if (!matchIdRef.exists) {
        res.status(404).send('Match does not exist')
        return;
    }

    const data = matchIdRef.data();
    data.id = matchIdRef.id
    res.status(200).send(data);
})

// POST /matches id

//Gå igenom igen!
router.post('/', async (req, res) => {
    const object = req.body;
    
    //Sätta spärr! Lägg till att det måste vara en sträng!
    if(!object || !object.winnerId || !object.loserId) {
        res.sendStatus(400).send('Wrong structure on the object')
        return
    }

    const docRef = await db.collection('matches').add(object);
    objectId = {
        id: docRef.id
    }
    res.status(200).send(objectId);
    });

// DELETE //matches/:id
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const matchIdRef = await db.collection('matches').doc(id).get();
    
    if (!id) {
        res.sendStatus(404).send('Wrong structure on the id')
        return;
    } 
    else if(!matchIdRef.exists) {
        res.status(404).send(`Match with id: "${id}" does not exist`)
        return;
    };
    
    await db.collection('matches').doc(id).delete()
    res.sendStatus(200);
})

module.exports = router