//# button status
module.exports = (query, condition) => {
  const buttonStatus = [
    { button: "All", status: "", class: "" },
    { button: "active", status: "active", class: "" },
    { button: "inactive", status: "inactive", class: "" },
  ];

  //# active button

  const currentStatus = query.status;
  let currentTypeList;
  //# filter by status if have
  currentStatus ? (condition.status = currentStatus) : "";

  if (currentStatus) {
    const currentButton = buttonStatus.find((item) => {
      return item.status === currentStatus;
    });
    currentButton.class = "active";
    currentTypeList = currentButton.status + " list";
  } else {
    buttonStatus[0].class = "active";
    currentTypeList = "List product";
  }
  //#end active button
  return [buttonStatus, currentTypeList];
};
