const router = require("express").Router();
const Mention = require('./mention-model');
const {validatePayload}= require('./mention-middleware');
router.get("/", async (req, res, next) => {
    try {
      const allMention = await Mention.getAllMention();
      res.status(200).json(allMention);
    } catch (error) {
      next(error);
    }
  });
  
  router.post("/newmention", validatePayload, async (req, res, next) => {
    try {
        mentionId = req.body;
       await Mention.İnsertMention(req.body);
      res.status(201).json(`${mentionId} id'li mention eklendi`);
    } catch (error) {
      next(error);
    }
  });
  
module.exports = router;