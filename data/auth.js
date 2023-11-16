import MongoDb, { ObjectId } from 'mongodb';
import { getUsers } from '../db/database.js';
const ObjectID=MongoDb.ObjectId;
export async function findByUsername(username) {
    return getUsers().find({username}).next().then(mapOptionalUser);
};
export async function findById(id) {
    return getUsers().find({_id:new ObjectId(id)}).next().then(mapOptionalUser);
};
export async function createUser(user) {
    return getUsers().insertOne(user).then((result)=>{
        //result.ops[0]._id.toString()
        console.log(result.insertedId.toString())
    });
};
function mapOptionalUser(user){
    return user ? {...user, id: user._id.toString()}:user;
}