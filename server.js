const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const hamsters = require('./routes/hamsters.js')
const matches = require('./routes/matches.js')
const matchWinners = require('./routes/matchWinners.js')
const winners = require('./routes/winners.js')
const losers = require('./routes/losers.js')

const staticFolder1 = path.join(__dirname,'frontend')
const staticFolder2 = path.join(__dirname,'image/hamsters')

const PORT = process.env.PORT || 7777

//Middleware
app.use((req, res, next) =>{
    console.log(`${req.method} ${req.url}`, req.params);
    next()
})
    
app.use( express.json() )
app.use( cors() )
app.use( express.static(staticFolder1) )
app.use( '/img' , express.static(staticFolder2) )
    
// Routes
app.get('/', (req, res) => {
    res.send('Firebase hamsterwars-assignment')
})
    
// REST API for /hamsters
app.use('/hamsters', hamsters)
app.use('/matches', matches)
app.use('/matchWinners', matchWinners)
app.use('/winners', winners)
app.use('/losers', losers) 

// Start server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
})