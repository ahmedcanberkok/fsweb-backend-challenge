const mentionModels = require("./mention-model");

const checkMentionId = async (req, res, next) => {
  try {
    const isExistValid = await mentionModels.getMentionById(req.params.id);
    if (!isExistValid) {
      res
        .status(404)
        .json({ message: `ID No: ${req.params.id} mention not found` });
    } else {
      next();
    }
  } catch (error) {
    next();
  }
};

const validatePayload = (req, res, next) => {
  try {
    const { mention } = req.body;
    if (!mention) {
      res.status(400).json({ message: `${mention} property is missing` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
module.exports = { checkMentionId, validatePayload };