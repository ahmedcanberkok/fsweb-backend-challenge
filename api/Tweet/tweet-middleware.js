const tweetModels = require("./tweet-model");

const checkTweetId = async (req, res, next) => {
    try {
      const checkId = await tweetModels.getTweetById(req.params.tweetId);
      if (!checkId) {
        res
          .status(404)
          .json({ message: `ID No: ${req.params.tweetId} tweet not found` });
      } else {
        next();
      }
    } catch (error) {
      next();
    }
  };

  module.exports = { checkTweetId };