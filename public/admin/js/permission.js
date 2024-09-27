"use strict";

const tablePermission = document.querySelector("[table-permission]");

if (tablePermission) {
  const permission = [];
  const buttonSubmit = document.querySelector("[button-submit]");
  buttonSubmit.addEventListener("click", () => {
    // take all row
    const row = tablePermission.querySelectorAll("[data-name]");

    // handle check box and get permission
    row.forEach((item) => {
      const dataName = item.getAttribute("data-name"); // get current row name
      const inputs = item.querySelectorAll("input"); // get all input in a row
      if (dataName === "id") {
        // create object by role id
        inputs.forEach((input) => {
          permission.push({
            id: input.value,
            permission: [],
          });
        });
      } else {
        inputs.forEach((input, index) => {
          // permission box checked
          const checked = input.checked;
          if (checked) {
            // permission checked
            permission[index].permission.push(dataName); // push permission
          }
        });
      }
    });
    if (permission.length > 0) {
      const formChangePermission = document.querySelector(
        "#form-change-permission"
      );
      const inputFormChangePermission = formChangePermission.querySelector(
        "input[name=datPermission]"
      );
      inputFormChangePermission.value = JSON.stringify(permission);
      formChangePermission.submit();
    }
  });
}

//# default data
const allData = document.querySelector("[allData]");
if (allData) {
  const data = JSON.parse(allData.getAttribute("allData")); // get data
  data.forEach((item, index) => {
    // get all permission
    const permissions = item.Permissions;
    permissions.forEach((permission) => {
      // go to row to tick
      const row = tablePermission.querySelector(`[data-name=${permission}]`); // go to row
      const box = row.querySelectorAll("input")[index]; // ticket
      box.checked = true;
    });
  });
}
// end default data
