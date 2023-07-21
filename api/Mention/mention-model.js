const db = require("../../data/db-config");
const Tweets = require("../Tweet/tweet-model");

const getAllMention = async function (filter) {
    const mention = await db("Mentions").select('*').first();
    return mention;
  };

  const getMentionById = async (id) => {
    return await db("Mentions as m")
      .leftJoin("users as u", "m.userId", "u.userId")
      .leftJoin("tweets as t", "t.tweetId", "m.tweetId")
      .select(
        "u.userId",
        "u.username",
        "t.tweetId",
        "m.mention_id",
        "m.mention",
        "m.created"
      )
      .where("m.mention_id", id)
      .first();
  };

  const İnsertMention = async function (mention) {
    const insertedMention = await db("Mentions").insert(mention);
    return insertedMention;
  };
  
  

module.exports = { İnsertMention, getAllMention,getMentionById };