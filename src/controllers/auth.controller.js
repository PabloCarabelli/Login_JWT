import User from '../models/users';
import jwt from 'jsonwebtoken';
import config from '../config';
import rol from '../models/rol';

export const signUp = async (req, res) => {
    
    const { username, email, password, roles } = req.body;

    const nuevoUser = new User({
        username,
        email,
        password: await User.encryptPassword(password), 
        roles
    })

    if (roles) {
        const rolEncontrado = await rol.find({name: {$in: roles}});
        nuevoUser.roles = rolEncontrado.map(role => role._id)
    }else{
        const role = await rol.findOne({name: 'user'});
        nuevoUser.roles = [role._id];
    }

    const userSaved = await nuevoUser.save(); // acá se guarda el usuario en base.
    //console.log(userSaved);
    const token =  jwt.sign({id: userSaved._id}, config.SECRET, {
        expiresIn: 86400 // 24 horas
    })

    res.status(200).json({token});
    
}

export const signIn = async (req, res) => {
   
    const userFound = await User.findOne({email: req.body.email}).populate('roles');

    if (!userFound) return res.status(400).json({token: null, message: "Invalid acount !"});
    // Aquí email no existe ..
    const matchPass = await User.comparePassword(req.body.password, userFound.password);

    if (!matchPass) return res.status(401).json({token: null, message: "Invalid acount !"})
    // Aquí contraseña no matchea ..
  
    const token =  jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 86400 // 24 horas
    })

    res.json({token})

}

