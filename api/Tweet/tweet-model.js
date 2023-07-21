const db = require("../../data/db-config");
const getAllTweets = async function () {
    const allTweets = await db("Tweets as t")
      .rightJoin("users as u", "u.user_id", "t.user_id")
      .select(
        "t.tweet_id",
        "t.tweet",
        "u.user_id",
        "u.username",
        "t.created"
      );
    return allTweets;
  };
  
  async function getTweetById(id){
    const getTweetsId = await db('Tweets as t')
                                  .join('users as u','t.user_id','u.user_id')
                                  .select('u.username','u.user_id','t.tweet_id','t.tweet','t.created')
                                  .where('t.tweet_id',id)
                                  .first()
    return getTweetById;
  }

  async function insertTweet(payload){ 
    const[id] = await db('Tweets').insert(payload);
    return await getTweetById(id);
}

async function deleteTweet(id){ 
    return db('Tweets').where('tweet_id',id).del();
  }
  


  module.exports={
    getAllTweets,
    getTweetById,
    insertTweet,
    deleteTweet,
  }