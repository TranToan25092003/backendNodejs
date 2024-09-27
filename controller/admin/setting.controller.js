const settingModel = require("../../model/Setting.model");

//# [GET] /admin/setting/general
module.exports.settinGeneral = async (req, res) => {
  // get the setting
  const setting = await settingModel.findOne({});

  //end

  res.render("admin/pages/setting/general.pug", {
    setting: setting,
  });
};

//# [PATCH] /admin/setting/general
module.exports.updatesetting = async (req, res) => {
  // check exist setting
  const existSetting = await settingModel.findOne({});
  //end

  if (!existSetting) {
    // not exist
    // create new object setting
    const setting = new settingModel(req.body);
    await setting.save();
    //end
  } else {
    await settingModel.updateOne(
      {
        _id: existSetting.id,
      },
      req.body
    );
  }

  req.flash("success", "update successfully");
  res.redirect("back");
};
