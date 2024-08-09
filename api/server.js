import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Api for buildings and upgrades.

// Buildings are the main things you buy during the game.
const buildings = [
    {id:1, name: "Auto Clicker", baseCps: 1, baseCost: 10, costHike: 1.05, count:0},
    {id:2, name: "Grandma", baseCps: 3, baseCost: 100, costHike: 1.1, count:0},
    {id:3, name: "Cookie Oven", baseCps: 10, baseCost: 500, costHike: 1.25, count:0},
    {id:4, name: "Cookie Farm", baseCps: 25, baseCost: 1200, costHike: 1.28, count:0},
    {id:5, name: "Cookie Factory", baseCps: 70, baseCost: 10000, costHike: 1.25, count:0},
    {id:6, name: "Mega Grandma", baseCps: 700, baseCost: 1000000, costHike: 1.55, count:0},
]

// Upgrades are just supplementary little things you can add on.
const upgrades = [
    {id:1, name: "Better Clicks", targetIds: [1], cpsIncrease: 1, cpsMultiplier: 1, baseCost: 100, costHike: 2.0, 
        description: "+1 CPS per Auto Clicker. Also affects your clicks.",
        count:0},
    {id:2, name: "Grandma Boosters", targetIds: [2,6], cpsIncrease: 0, cpsMultiplier: 1.5, baseCost: 2000, costHike: 2.0, 
        description: "Multiply Grandma CPS by 1.5. Highly unethical.",
        count:0},
]


// Get all of our wonderful information.
app.get("/Buildings", function(req,res){
    res.json(buildings);
})

app.get("/Upgrades", function(req,res){
    res.json(upgrades);
})

app.listen(port, function(){
    console.log(`Server running on port ${port}`)
})