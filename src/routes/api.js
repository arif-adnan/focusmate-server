const express =require('express');
const UserController = require('../controllers/UsersController');
const GoalController = require('../controllers/GoalController');
const AuthVerifyMiddleware = require('../middlewares/AuthVerifyMiddleware');

const router =express.Router();

// User
router.post("/registration", UserController.registration);
router.post("/login", UserController.login)
router.post("/updateProfile",AuthVerifyMiddleware, UserController.profileUpdate);
router.get("/profileDetails", AuthVerifyMiddleware, UserController.profileDetails);

router.get("/RecoverVerifyEmail/:email",UserController.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp",UserController.RecoverVerifyOTP);
router.post("/RecoverResetPass",UserController.RecoverResetPass);


// goal 
router.post("/createGoal",AuthVerifyMiddleware,GoalController.createGoal);
router.get("/updateGoalStatus/:id/:status",AuthVerifyMiddleware,GoalController.updateGoalStatus);
router.get("/deleteGoal/:id",AuthVerifyMiddleware,GoalController.deleteGoal);
router.get("/listGoalByStatus/:status",AuthVerifyMiddleware,GoalController.listGoalByStatus);
router.get("/goalStatusCount",AuthVerifyMiddleware,GoalController.GoalStatusCount);


module.exports=router;