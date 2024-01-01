const express = require("express");

//JSON data import
const {users} = require("../data/users.json");

const {getAllUsers,getSingleUserById,deleteUser,updateUserById,createNewUser,getSubscriptionDetailsById} = require("../controllers/user-controller");

const router = express.Router();

/* 
Router:/users
Method :GET
Description:Get all users
Access:public
parameters:None
*/

/*router.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        data:users
    })
})*/
router.get("/",getAllUsers)


/* 
Router:/users/:id
Method :GET
Description:Get all users by id
Access:public
parameters:id
*/

/*router.get("/:id",(req,res)=>{
    const {id} = req.params;
    const user = users.find((each)=>each.id === id)
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    return res.status(200).json({
        success:true,
        data:user
    })
})*/

router.get("/:id",getSingleUserById)

/* 
Router:/users
Method :POST
Description:Create a new user
Access:public
parameters:None
*/

/*router.post("/",(req,res)=>{
    const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body;

    const user =users.find((each)=>each.id === id);
    if(user){
        return res.status(404).json({
            success:false,
            message:"User already exist with the given id"
        })
    }
    users.push({
        id, 
        name, 
        surname, 
        email, 
        subscriptionType, 
        subscriptionDate
    });
    return res.status(201).json({
        success:true,
        data:users
    })
})*/

router.post("/",createNewUser)

/* 
Router:/users
Method :PUT
Description:Update user by id
Access:public
parameters:ID
*/

/*router.put("/:id",(req,res)=>{
    const {id} = req.params;
    const {data} =req.body;

    const user = users.find((each)=>each.id === id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    const updateUser = users.map((each)=>{
        if(each.id===id){
            return {
                ...each,
                ...data
            };
        }
        return each
    })
    return res.status(200).json({
        success:true,
        data:updateUser
    })
})*/

router.put("/:id",updateUserById)

/* 
Router:/users/:id
Method :DELETE
Description:Deleting user by id
Access:public
parameters:ID
*/

/*router.delete("/:id",(req,res)=>{
    const {id} = req.params;

    const user = users.find((each)=>each.id===id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    const index = users.indexOf(user);
    users.splice(index,1);
    return res.status(200).json({
        success:true,
        data:users
    })
})*/
router.delete("/:id",deleteUser);

/* 
Router:/users/subscription details/:id
Method :GET
Description:Get all users subscription details
Access:public
parameters:id
*/
/*router.get("/subscription-details/:id",(req,res)=>{
    const {id} = req.params;
    const user = users.find((each)=>each.id===id);
     if(!user)
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
     const getDateInDays = (data ="")=>{
        let date;
        if(data ===""){
            date=new Date();
        }else{
            date = new Date(data);
        }
        let days =Math.floor(date/(1000*60*60*24))
        return days;
     };

     const subscriptionType = (date) =>{
        if(user.subscriptionType === "Basic"){
            date=date+90
        }else if(user.subscriptionType === "Standard"){
            date=date+180
        }else if(user.subscriptionType === "Premium"){
            date=date+365
        }
        return date;
     };
     //subscription expiration calc
     //Jan 1 1970 //milliseconds
     let returnDate = getDateInDays(user.returnDate);
     let currentDate = getDateInDays();
     let subscriptionDate = getDateInDays(user.subscriptionDate);
     let subscriptionExpiration = subscriptionType(subscriptionDate);

     const data = {
        ...user,
        subscriptionExpired: subscriptionExpiration < currentDate,
        daysleftForExpiration:
                 subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate,
                 fine:
                    returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 :0,
     }
     return res.status(200).json({
        success:true,
        data,
     })
})*/

router.get("/subscription-details/:id",getSubscriptionDetailsById)

module.exports = router;