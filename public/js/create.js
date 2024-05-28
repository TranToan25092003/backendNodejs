//show image preview
const uploadImg = document.querySelector("[upload-img]");
if (uploadImg) {
  const uploadImgInput = document.querySelector("[upload-img-input]");
  const previewImg = document.querySelector("[preview-img]");
  uploadImgInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    console.log(e);
    if (file) {
      previewImg.src = URL.createObjectURL(file);
    }
  });
}
//end show image preview
