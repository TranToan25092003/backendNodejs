// update product qunatity
const inputs = document.querySelectorAll("input[name='quantity']");
if (inputs) {
  inputs.forEach((item) => {
    item.addEventListener("input", (e) => {
      const newQuantity = e.target.value;
      const productId = item.getAttribute("product-id");
      if (newQuantity && parseInt(newQuantity) > 0) {
        window.location.href = `/cart/update/${productId}/${newQuantity}`;
      }
    });
  });
}
//end
