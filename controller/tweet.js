import * as tweetRepository from '../data/tweet.js'
import * as usersRepository from '../data/auth.js'

export async function getTweets(req, res) {
    const username = req.query.username
    const data = await(username
        ? tweetRepository.gettAllByUsername(username)
        : tweetRepository.getAll())
    res.status(200).json(data)
}

// getTweet
export  async function getTweet(req, res, next) {
    const id = req.params.id;
    const tweet = await tweetRepository.getById(id)
    if(tweet) {
        res.status(200).json(tweet)
    } else {
        res.status(404).json({message: `Tweet id(${id}) not found`})
    }
}

// createTweet
export async function createTweet(req, res, next) {
    const {text} = req.body;
    const tweet = await tweetRepository.create(text, req.userId)
    res.status(201).json(tweet)
}

// updateTweet
export async function updateTweet(req, res, next) {
    const id = req.params.id
    const text = req.body.text
    const tweet = await tweetRepository.getById(id)
    if(!tweet) {
        res.status(404).json({message: `Tweet id(${id}) not found`})
    }
    if (tweet.userId !== req.userId) {
        return res. sendStatus(403)
    } 
    const updated = await tweetRepository.update(id, text)
    res.status(200).json(tweet)
}

// deleteTweet
export async function deleteTweet(req, res, next) {
    const id = req.params.id
    const tweet = await tweetRepository.getById(id)
    if(!tweet) {
        res.status(404).json({message: `Tweet id(${id}) not found`})
    }
    if (tweet.userId !== req.userId) {
        return res. sendStatus(403)
    } 
    await tweetRepository.remove(id)
    res.sendStatus(204)
}

// // signUpTweet
// export async function signUpTweet(req, res, next){
//     const {id, username, password, name, email, url} = req.body
//     const tweet = await usersRepository.signup(id, username, password, name, email, url)
//     res.status(201).json(tweet)
// }

// // loginTweet
// export async function loginTweet(req, res, next){
//     const {id, password} = req.body
//     const login =  await usersRepository.login(id, password)
//     if (login) {
//         res.status(200).json({message: '로그인 되었습니다'})
//     }else{
//         res.status(200).json({message: 'id 비밀번호가 일치하지 않습니다'})
//     }
// }