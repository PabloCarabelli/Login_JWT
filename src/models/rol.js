import  {Schema, model} from 'mongoose'

export const ROLES = ['moderator', 'user', 'admin'];
 const roleSchema = new Schema(
    {
        name: String
    },
    {
        versionKey: false
    }
);

export default model('Role', roleSchema);