module.exports = (paginationObj, query, countDocument) => {
  //#pagination
  // input req.query and import productmodel
  // output retunr pagination Obj

  let pageNo = query.page;

  paginationObj.quantityPage = Math.ceil(
    countDocument / paginationObj.limitProduct
  );

  //# check pageno was send or validation
  if (pageNo && isFinite(pageNo)) {
    pageNo = parseInt(pageNo);
    if (pageNo <= 0 || pageNo > paginationObj.quantityPage) {
      return;
    }
    paginationObj.currentPage = parseInt(pageNo);
  }

  return paginationObj;
  //# end pagnitation
};
