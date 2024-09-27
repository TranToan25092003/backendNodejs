const settingModel = require("../../model/Setting.model");

module.exports.getSetting = async (req, res, next) => {
  //get setting
  const setting = await settingModel.findOne({});
  res.locals.setting = setting;
  //end
  next();
};
