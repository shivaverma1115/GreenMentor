const express = require('express') ;
const baseRoute = express.Router() ;


baseRoute.get('/', (req, res) => {
    return res.send({
        msg: "This is api base point"
    })
})


module.exports = {
    baseRoute
}