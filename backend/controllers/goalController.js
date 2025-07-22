const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
//@desc Get goals
//@route GET /api/goals
const getGoals = asyncHandler(async (req, res)=>{
    const goals = await Goal.find()
    res.json(goals)
})

//@desc Set goals
//@route POST /api/goals
const setGoals = asyncHandler(async (req, res)=>{
    console.log(req.body.text)
    if(!(req.body.text)){
        res.status(400)
        throw new Error('Please add text field')
    }
    const goal = await Goal.create({
        text: req.body.text
    })
    res.json(goal)
})

//@desc Update goals
//@route PUT /api/goals/:id
const updateGoals = asyncHandler(async (req, res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    const updated = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(updated)
})

//@desc Delete goals
//@route DELETE /api/goals/:id
const deleteGoals = asyncHandler(async (req, res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    await goal.deleteOne();
    res.json({id: req.params.id})
})



module.exports = { getGoals, setGoals,updateGoals,deleteGoals,}