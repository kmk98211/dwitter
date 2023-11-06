import * as userRepository from './auth.js'

let tweets = [
    {
        id : '1',
        text : '안녕하세요',
        createdAt : Date.now().toString,
        userId: '1'

    },
    {
        id : '2',
        text : '반갑습니다!',
        createdAt : Date.now().toString,
        userId: '2'
    }
]

export async function getAll(){
    return Promise.all(
        tweets.map(async (tweet) => {
            const {username, name, url} = await userRepository.findById(tweet.userId)
            return {...tweet, username, name, url}
        })
    );
}

export async function gettAllByUsername(username){
    return getAll().then((tweet) => tweet.filter((tweet) => twwet.username === username))
}

export async function getById(id) {
    const found = tweets.find((tweet) => tweet.id === id)
    if(!found) {
        return null;;
    }
    const {username, name, url} = await userRepository.findById(found.userId)
    return {...found, username, name, url}
}

export async function create(text, userId){
    const tweet = {
        id : '10',
        text,
        createdAt : Date.now().toString,          //text:text이랑 같음  이름 같으면 :안써도됨
        userId
    }
    tweets = [tweet, ...tweets]
    return getById(tweet.id)
}


export async function update(id,text){
    const tweet = tweets.find((tweet) => tweet.id === id);
    if(tweet){
        tweet.text = text
    }
    return getById(tweet.id)
}

export async function remove(id){
    tweets = tweets.filter((tweet) => tweet.id !== id);
}