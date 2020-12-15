import config from "../config";
import User from "../models/users";
import jwt from "jsonwebtoken";
import Rol from "../models/rol";

export const verifyToken = async (req, res, next) => {
    try {
        
        const token = req.headers['x-access-token'];
        if(!token) return res.status(402).json({message:"No token provider."});

        const decode = jwt.verify(token, config.SECRET); 

        req.userId = decode.id;

        const user = await User.findById(req.userId, {password: 0});
        if(!user) return res.status(403).json({message: "No user found,"});
        next();

    } catch (error) {
        return res.status(401).json({message: "Unauthorized"})
    }
};

export const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Rol.find({_id: {$in: user.roles}});

    for (let index = 0; index < roles.length; index++) {
        if(roles[index].name === "moderator"){
            next();
            return;
        }        
    } 

    return res.status(403).json({message: "Required rol MODERATOR"});
}
export const isAdmin = async (req, res, next) => {

    const user = await User.findById(req.userId);
    const roles = await Rol.find({_id: {$in: user.roles}});

    for (let index = 0; index < roles.length; index++) {
        if(roles[index].name === "admin"){
            next();
            return;
        }        
    } 

    return res.status(403).json({message: "Required rol ADMIN"});
}