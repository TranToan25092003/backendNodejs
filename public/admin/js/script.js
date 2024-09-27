try {
  //# handle search button by status
  const button = document.querySelectorAll("[button-type]");

  const addOrRemoveHref = function (url, nameStatus, status) {
    if (status) {
      console.log("oke");
      url.searchParams.set(nameStatus, status);
    } else {
      url.searchParams.delete(nameStatus);
    }
  };

  if (button.length != 0) {
    let url = window.location.href;
    let url2 = new URL(url);

    button.forEach((item) => {
      item.addEventListener("click", () => {
        const status = item.getAttribute("button-type");
        addOrRemoveHref(url2, "status", status);

        window.location.href = url2.href;
      });
    });
  } else {
    console.log("no button exist");
  }
  //# end handle search button by status

  //# form search
  const formSearch = document.querySelector("#form-search");
  if (formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("oke");
      const keyword = e.target.elements.keyword.value;

      addOrRemoveHref(url, "keyword", keyword);
      window.location.href = url.href;
    });
  }

  //# end

  //# pagination page
  const paginationBtn = document.querySelectorAll("[page-click]");
  if (paginationBtn) {
    paginationBtn.forEach((item) => {
      let url = new URL(window.location.href);
      item.addEventListener("click", () => {
        const currentPage = item.getAttribute("page-click");
        url.searchParams.set("page", currentPage);
        window.location.href = url.href;
        console.log("click");
      });
    });
  }

  //#end

  //start //#change statsus
  const changeStatusBtn = document.querySelectorAll("[btn-change-status]");
  const formChangeStatus = document.querySelector("#form-change-status");

  if (changeStatusBtn) {
    if (formChangeStatus.getAttribute("data-path") == null) {
      console.log("error datapath");
    } else {
      const dataPath = formChangeStatus.getAttribute("data-path");
      changeStatusBtn.forEach((item) => {
        item.addEventListener("click", () => {
          // id status
          const id = item.getAttribute("id");
          const status = item.getAttribute("status");
          const changeStatus = status === "active" ? "inactive" : "active";
          const action = dataPath + `${changeStatus}/${id}?_method=PATCH`;
          formChangeStatus.action = action;
          formChangeStatus.submit();
        });
      });
    }
  }

  //end

  //start change-multi-status
  const changeMultiBox = document.querySelector("[check-box-multi]");
  const listBoxId = changeMultiBox.querySelectorAll("input[name='id']");
  if (changeMultiBox) {
    const boxMulti = changeMultiBox.querySelector("input[name='checkAll']");

    boxMulti.addEventListener("click", () => {
      listBoxId.forEach((item) => {
        item.checked = boxMulti.checked;
      });
    });

    // handle click multip box
    listBoxId.forEach((item) => {
      item.addEventListener("click", () => {
        const lengthBox = listBoxId.length;
        const lengthCheckedBox = changeMultiBox.querySelectorAll(
          "input[name='id']:checked"
        );
        lengthBox === lengthCheckedBox.length
          ? (boxMulti.checked = true)
          : (boxMulti.checked = false);
      });
    });
  }
  //end

  //start form change multip
  const formChangeMultip = document.querySelector("[form-change-multip]");
  if (formChangeMultip) {
    formChangeMultip.addEventListener("submit", (e) => {
      e.preventDefault();
      const changeMultiBox = document.querySelector("[check-box-multi]");
      const boxChecked = changeMultiBox.querySelectorAll(
        "input[name='id']:checked"
      );

      const typeAction = e.target.elements.type.value;

      //# tick to box check
      if (boxChecked.length) {
        const listId = [];
        boxChecked.forEach((item) => {
          //# check wether change position
          if (typeAction == "change_position") {
            //# true
            const position = item
              .closest("tr")
              .querySelector("input[name=position]").value;
            listId.push(`${item.value}-${position}`);
          } else {
            listId.push(item.getAttribute("value"));
          }
        });

        const inputId = formChangeMultip.querySelector("input[name='listId']");
        inputId.value = listId.join(" ");
        formChangeMultip.submit();
      } else {
        alert("tick to at least one ");
      }
    });
  }
  //end form change multip

  //end delete-btn
} catch (error) {}

//Start delete-btn
const deleteBtn = document.querySelectorAll("[delete-btn]");
const formDeleteProduct = document.querySelector("#form-delete-product");
deleteBtn.forEach((item) => {
  item.addEventListener("click", () => {
    const isConfirm = confirm("this will be remove please reconfirm");
    // lay ra form delete
    // lay ra path
    // chinh action path
    // add method delete
    // call submit method

    if (isConfirm) {
      let deletePath = formDeleteProduct.getAttribute("data-path");
      const id = item.getAttribute("id");
      deletePath = deletePath + id + "?_method=DELETE";
      formDeleteProduct.action = deletePath;
      formDeleteProduct.submit();
    }
  });
});

// show alert
const show_alert = document.querySelector("[show-alert]");
if (show_alert) {
  const timeShow = show_alert.getAttribute("data-time");
  const closeAlert = document.querySelector("[close-alert]");
  closeAlert.addEventListener("click", () => {
    show_alert.classList.add("alert-hidden");
  });

  console.log(timeShow);
  setTimeout(() => {
    show_alert.classList.add("alert-hidden");
  }, parseInt(timeShow));
}
// end show alert

//show image preview
const uploadImg = document.querySelector("[upload-img]");
if (uploadImg) {
  const uploadImgInput = document.querySelector("[upload-img-input]");
  const previewImg = document.querySelector("[preview-img]");
  uploadImgInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      previewImg.src = URL.createObjectURL(file);
    }
  });
}
//end show image preview

// remove img preview
const btnPreviewImg = document.querySelector("[remove-img]");

// end remove img preview

//sort
const sort = document.querySelector("[sort]");

if (sort) {
  const selectSort = document.querySelector("[sort-select]");
  const url = new URL(window.location.href);
  selectSort.addEventListener("change", (e) => {
    const [sortKey, typeSort] = e.target.value.split("-");

    url.searchParams.set("sortKey", sortKey);
    url.searchParams.set("typeSort", typeSort);
    window.location.href = url.href;
  });
  const sortClear = document.querySelector("[sort-clear]");
  sortClear.addEventListener("click", () => {
    url.searchParams.delete("sortKey");
    url.searchParams.delete("typeSort");
    window.location.href = url.href;
  });

  // add selected for option
  const sortKey = url.searchParams.get("sortKey");
  const typeSort = url.searchParams.get("typeSort");
  if (sortKey && typeSort) {
    const selected = selectSort.querySelector(
      `option[value='${[sortKey, typeSort].join("-")}']`
    );
    selected.selected = true;
  }
  //
}
//end sort
