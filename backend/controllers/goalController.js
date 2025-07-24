const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

//@desc Get goals
//@route GET /api/goals
//@access PRIVATE
const getGoals = asyncHandler(async (req, res)=>{
    const goals = await Goal.find({user: req.user.id})
    res.json(goals)
})

//@desc Set goals
//@route POST /api/goals
//@access PRIVATE
const setGoals = asyncHandler(async (req, res)=>{
    if(!(req.body.text)){
        res.status(400)
        throw new Error('Please add text field')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.json(goal)
})

//@desc Update goals
//@route PUT /api/goals/:id
//@access PRIVATE
const updateGoals = asyncHandler(async (req, res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)
    
    //Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //Check for logged in user and goal user
    if(goal.user.toString()!== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(updatedGoal)
})

//@desc Delete goals
//@route DELETE /api/goals/:id
//@access PRIVATE
const deleteGoals = asyncHandler(async (req, res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
        const user = await User.findById(req.user.id)
    
    //Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //Check for logged in user and goal user
    if(goal.user.toString()!== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    await goal.deleteOne();
    res.json({id: req.params.id})
})



module.exports = { getGoals, setGoals,updateGoals,deleteGoals,}