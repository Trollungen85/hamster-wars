const express = require('express')
const router = express.Router()

const getDatabase = require('../database.js')
const db = getDatabase()

// GET all hamsters
//http://localhost:7777/hamsters
router.get('/', async (req, res) => {
    const hamstersRef = db.collection('hamsters');
    let allHamsters = [];
    
    try {
        const snapShot = await hamstersRef.get();
        if (snapShot.empty) {
            res.status(404).send('There are no hamsters here!');
            return;
        };

        snapShot.forEach( doc => {
            const data = doc.data();
            data.id = doc.id;
            allHamsters.push(data);
        });
        
        res.status(200).send(allHamsters);
    } 
    catch (error) {
        res.status(500).send(error.message)
    }
});

//GET random hamsters 
//http://localhost:7777/hamsters/random
router.get('/random', async (req, res) => {
    const hamstersRef = db.collection('hamsters')
    let items = []
    
    try {
        const snapshot = await hamstersRef.get()
        if (snapshot.empty) {
            res.status(404).send('There are no hamsters here!');
            return
        }
        
        snapshot.forEach(doc => {
            const data = doc.data()
            data.id = doc.id;
            items.push(data)
        });
        
        let randomIndex = Math.floor(Math.random() * items.length);
        res.status(200).send(items[randomIndex]);
    } 
    catch (error) {
        res.status(500).send(error.message)
    }
});

//GET hamsters by ID 
//http://localhost:7777/hamsters/2w4gtJCakWDndyqXi7wI
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    
    try {
        const hamsterIdRef = await db.collection('hamsters').doc(id).get()
        if(!hamsterIdRef.exists) {
            res.status(404).send('Hamster does not exist')
            return;
        };

        const data = hamsterIdRef.data();
        data.id = hamsterIdRef.id
        res.status(200).send(data);
    } 
    catch (error) {
        res.status(500).send(error.message)
    }
});

//POST create new hamster
//http://localhost:7777/hamsters
router.post('/', async (req, res) => {
    const object = req.body;

    try {
        const hamsterRef = await db.collection('hamsters').add(object);
        if( !isHamstersObject(object)) {
            res.status(400).send('Wrong structure on the object')
            return
        };
        
        objectId = {
            id: hamsterRef.id
        }
        res.status(200).send(objectId);
    } 
    catch (error) {
        res.status(500).send(error.message)
    }
});

//Functions
function isHamstersObject(maybeObject) {
    console.log(1)
    if (!maybeObject) {
        console.log(2)
        return false;
    } 
    else if (!maybeObject.name || !maybeObject.favFood || !maybeObject.loves || !maybeObject.imgName) {
        console.log(3)
        return false;
    }  
    else if ( !isPositiveNumber(maybeObject.wins) || !isPositiveNumber(maybeObject.defeats) || !isPositiveNumber(maybeObject.games) || !isPositiveNumber(maybeObject.age)) {
        console.log(4)
        return false;
    }
    console.log(5)
    return true;
}
function isPositiveNumber(x) {
    return (typeof x) == 'number' && x >= 0;
}

//PUT create new hamster
//http://localhost:7777/hamsters/2w4gtJCakWDndyqXi7wI
router.put("/:id", async (req, res) => {
    const object = req.body;
    const id = req.params.id;
    const hamsterRef = db.collection("hamsters");
    
    try {
        const snapshot = await hamsterRef.get();
        let hamsterId = false;

        snapshot.forEach((doc) => {
            if (id === doc.id) {
            hamsterId = true;
            }
        });

        if (!Object.keys(object).length) {
            res.sendStatus(400)
            return
        } 
        else if (!checkInput(object)) {
            res.status(400).send("Wrong structure on the object");
            console.log(6)
            return;
        }
        else if (!hamsterId) {
            res.status(404).send("There is no hamster with that id.");
            console.log(7)
            return;
        }

        await db.collection("hamsters").doc(id).set(object, { merge: true });
        res.send("Hamster changed.");
    } 
    catch (error) {
        res.status(500).send(error.message)
    }
});

function checkInput(obj) {
    console.log(obj);
    for (const prop in obj) {
        if (
        prop === "name" || prop === "age" ||
        prop === "favFood" || prop === "loves" ||
        prop === "imgName" || prop === "wins" ||
        prop === "defeats" || prop === "games"
        ) 
        {
            console.log(1);
            continue
        } 
        else {
            console.log(2);
            return false;
        }
    }
        
    for (const prop in obj) {
        if (prop === "name" && !isASting(obj[prop])) {
        console.log(3);
        return false;
        } 
        else if (prop === "age" && !isPositiveNumber(obj[prop])) {
        console.log(4);
        return false;
        } 
        else if (prop === "favFood" && !isASting(obj[prop])) {
        console.log(5);
        return false;
        } 
        else if (prop === "loves" && !isASting(obj[prop])) {
        console.log(6);
        return false;
        } 
        else if (prop === "imgName" && !isASting(obj[prop])) {
        console.log(7);
        return false;
        } 
        else if (prop === "wins" && !isPositiveNumber(obj[prop])) {
        console.log(8);
        return false;
        } 
        else if (prop === "defeats" && !isPositiveNumber(obj[prop])) {
        console.log(9);
        return false;
        } 
        else if (prop === "games" && !isPositiveNumber(obj[prop])) {
        console.log(10);
        return false;
        } 
        else {
        console.log(11);
        continue
        }
    }
    console.log(1);
    return true;
}
        
function isASting(x) {
    return (typeof x) == 'string';
};

//DELETE by id
//http://localhost:7777/hamsters/2w4gtJCakWDndyqXi7wI
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const hamsterIdRef = await db.collection('hamsters').doc(id).get();

        if( !id ) {
            res.sendStatus(400).send('Wrong structure on the id')
            return;
        }
        else if ( !hamsterIdRef.exists ) {
            res.status(404).send('Hamster does not exist')
            return;
        };

        await db.collection('hamsters').doc(id).delete()
        res.sendStatus(200);
    } 
    catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router