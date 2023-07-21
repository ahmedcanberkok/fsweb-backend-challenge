const router = require('express').Router();
const tweetsModel = require('./tweet-model');
const {checkTweetId}= require('./tweet-middleware');
//ALL TWEETS
router.get('/mainpage', async (req,res)=>{
    try {
      const allTweets = await tweetsModel.getAllTweets();
      res.json(allTweets);
    } catch (error) {
      res.status(500).json({ message: "Postları getirirken bir hata oluştu." });    }
  })
  //mainpage çalışıyor



  router.get('/:id', async (req,res,next)=>{
    try {
      const allTweets = await tweetsModel.getTweetById(req.params.id);
      res.json(allTweets);
    } catch (error) {
      next()
    }

    
  })

  //TWEET EKLEME BAŞARILI
router.post('/newtweet', async (req,res,next)=>{
  try {
    const{user_id,tweet }=req.body;
    const date = new Date().toISOString()
    const insertTweetData ={
      user_id : user_id,
      tweet :tweet,
      created:date
    }
    const insertedTweet = await tweetsModel.insertTweet(insertTweetData)
    res.status(201).json(insertedTweet);
  } catch (error) {
    next(error)
  }
})

//TWEET SİLME BAŞARILI
router.delete("/:id", checkTweetId, async (req, res, next) => {
  try {
    const tweetId = req.params.id;
    await tweetsModel.deleteTweet(tweetId);
    res.json({ message: `${tweetId} id'li tweet silindi` });
  } catch (error) {
    next(error);
  }
});



module.exports=router;