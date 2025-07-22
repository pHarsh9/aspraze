const asyncHandler = require('express-async-handler')

//@desc Get goals
//@route GET /api/goals
const getGoals = asyncHandler(async (req, res)=>{
    res.json({message:'Get goals'})
})

//@desc Set goals
//@route POST /api/goals
const setGoals = asyncHandler(async (req, res)=>{
    console.log(req.body.text)
    if(!(req.body.text)){
        res.status(400)
        throw new Error('Please add text field')
        
    }
    res.json({message:'Set goal'})
})

//@desc Update goals
//@route PUT /api/goals/:id
const updateGoals = asyncHandler(async (req, res)=>{
    res.json({message:`Change goal ${req.params.id}`})
})

//@desc Delete goals
//@route DELETE /api/goals/:id
const deleteGoals = asyncHandler(async (req, res)=>{
    res.json({message:`Delete goal ${req.params.id}`})
})



module.exports = { getGoals, setGoals,updateGoals,deleteGoals,}