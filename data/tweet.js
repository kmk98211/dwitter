import MongoDb from 'mongodb';
import { getTweets } from '../db/database.js';
import * as UserRepository from './auth.js';
const ObjectID = MongoDb.ObjectId;

// 비동기처리
// 비동기일때 async쓰면 언제든 await 가능
export async function getAll(){
    return getTweets()
    .find()
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}

export async function getAllByUsername(username){
    return getTweets()
    .find({ username })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}

export async function getById(id){
    return getTweets()
    .find({ _id: new ObjectID(id) })
    .next()
    .then(mapOptionalTweet);
}

export async function create(text, userid){
    return UserRepository.findById(userid)
    .then((user) =>
        getTweets().insertOne({
            text,
            createdAt: new Date(),
            userid,
            name: user.name,
            username: user.username,
            url: user.url
        })
    )
    .then((result) => result => getById(result.insertedId)) 
    .then(mapOptionalTweet);
}

export async function update(id, text) { 
    return getTweets().findOneAndUpdate(
        { _id: new ObjectID(id) },
        { $set: { text } },
        { returnDocument: "after" }
    )
    .then((result) => result)
    .then(mapOptionalTweet);
}

export async function remove(id) {
    return getTweets().deleteOne({_id: new ObjectID(id)  });
}

function mapOptionalTweet(tweet) {
    return tweet ? { ...tweet, id: tweet.insertedId } : tweet;
}

function mapTweets(tweets) {
    return tweets.map(mapOptionalTweet);
}