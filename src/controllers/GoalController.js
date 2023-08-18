const GoalModel = require('../models/GoalModel'); 

// set new goal
exports.createGoal = (req, res) => {
    let reqBody = req.body; 
    reqBody.email = req.headers['email']; 

    GoalModel.create(reqBody, (err,data)=>{
        if(err) {
            res.status(400).json({status:"fail", data: err})
        }
        else {
            res.status(200).json({status:"success", data: data});
        }
    })
}


// delete goal
exports.deleteGoal=(req,res)=>{
    let id= req.params.id;
    let Query={_id:id};
    GoalModel.remove(Query,(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else{
            res.status(200).json({status:"success",data:data})
        }
    })
}

// update goal by status
exports.updateGoalStatus=(req,res)=>{
    let id= req.params.id;
    let status= req.params.status;
    let Query={_id:id};
    let reqBody={status:status}
    GoalModel.updateOne(Query,reqBody,(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else{
            res.status(200).json({status:"success",data:data})
        }
    })
}


// list Goal By Status
exports.listGoalByStatus=(req,res)=>{
    let status= req.params.status;
    let email=req.headers['email'];
    GoalModel.aggregate([
        {$match:{status:status,email:email}},
        {$project:{
                _id:1,title:1,description:1, status:1,
                createdDate:{
                    $dateToString:{
                        date:"$createdDate",
                        format:"%d-%m-%Y"
                    }
                }
            }}
    ], (err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else{
            res.status(200).json({status:"success",data:data})
        }
    })
}


// goal status count 
exports.GoalStatusCount=(req,res)=>{
    let email=req.headers['email'];
    GoalModel.aggregate([
        {$match:{email:email}},
        {$group:{_id:"$status",sum:{$count: {}}}}
    ], (err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else{
            res.status(200).json({status:"success",data:data})
        }
    })
}