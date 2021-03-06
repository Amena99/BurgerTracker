const express = require("express");
const router = express.Router();
const burger = require("../models/burger.js");

// show all
router.get("/", function(req, res){

    burger.selectAll(function(data){
        const hbsObject = {
            burgers: data 
        };
        console.log("HBS OBJ", hbsObject);
        res.render("index", hbsObject);
    });
});

// create new
router.post("/api/burgers/", function(req, res){
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function(result){
        res.json({ id: result.id});
    });
});

// change devoured state
router.put("/api/burgers/:id", function(req, res){
    const condition = "id = " + req.params.id;

    console.log("condition ", condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function(result){
        if(result.changedRows == 0){
            return res.status(404).end();
        }else {
            res.status(200).end();
        }
    });
});

// change name
// router.put("/api/burgers/update/:id", function(req, res){
//     const condition = "id = " + req.params.id;

//     console.log("condition ", condition);

//     burger.updateBurger({
//         burger_name: req.body.burger_name}, 
//         condition, function(result){
//         if(result.changedRows == 0){
//             return res.status(404).end();
//         }else {
//             res.status(200).end();
//         }
//     });
// });

//delete burger
router.delete("/api/burgers/:id", function(req, res){
    const condition = "id ="+ req.params.id;

    burger.deleteOne(condition, function(result){
        if(result.affectedRows ==0){
            return res.status(404).end();
        }else{
            res.status(200).end();
        }
    });
});

// export routes for server.js to use
module.exports = (router);