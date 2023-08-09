import User from "../model/user-schema.js";


export const userSignup=async (request,response)=>{
    try{

        const exist=await User.findOne({username:request.body.username});
        if(exist){
            return response.status(401).json({message: 'Username already exist'});
        }
        const user=request.body;
        const newUser=new User(user);
        await newUser.save();

        return response.status(200).json({message: user});
    }catch(error){

        response.status(500).json({message:error.message});
    }
}

export const userlogin=async (request,response)=>{
    try{

        const email=request.body.email;
        const password=request.body.password;

        let usermail=await User.findOne({email: email, password: password});
        let userphn=await User.findOne({phone: email, password: password});
        if(usermail){
            return response.status(200).json({data:usermail});
        }
        else if(userphn){
            return response.status(200).json({data:userphn});
        }
        else{
            return response.status(401).json('Invalid login');
        }
    }catch(error){

        response.status(500).json('Error', error.message);
    }
}