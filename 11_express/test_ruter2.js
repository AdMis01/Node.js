const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.status(200).send('Podstrona z Ruter');
})
router.get('/hello',(req,res) => {
    res.status(200).send('Podstrona z hello');
})

module.exports = router;