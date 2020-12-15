import Role from '../models/rol';

export const createRoles = async () => {

    try {
        const counter = await Role.estimatedDocumentCount();
    
        if (counter > 0) return;
    
        const values = await Promise.all([
            new Role({name: 'user' }).save(),
            new Role({name: 'moderator' }).save(),
            new Role({name: 'admin' }).save(),        
        ])
        console.log(values);
        
    } catch (error) {
        console.error(error);
    }
};

