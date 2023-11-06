import express from "express"
import * as tweetController from '../controller/tweet.js'
import {body,param, validationResult} from 'express-validator'
import {validate} from "../middleware/validator.js"

const router = express.Router()

const validateTweet = [
    body('text').trim().isLength({min : 3}).withMessage('최소 3자이상 입력'),validate
]

// GET / tweets
router.get('/',tweetController.getTweets)
// GET / tweets?username=:username;
router.get('/',(req,res,next) => {
    const username = req.query.username
    const data = username
        ? tweets.filter((tweet) => tweet.username === username)
        : tweets
    res.status(200).json(data)
})

// GET / tweets/:id
router.get('/:id', tweetController.getTweet)
// POST / tweets
router.post('/', validateTweet,tweetController.createTweet)

// PUT / tweets/:id
router.put('/:id', validateTweet,tweetController.updateWeet)

// DELETE / tweets/:id
router.delete('/:id', tweetController.deleteTweet)



/* 
    post,put에 text에 대해 빈문자열 없애고, 최소 3자이상 입력해야 저장되도록 api에 적용
*/

export default router