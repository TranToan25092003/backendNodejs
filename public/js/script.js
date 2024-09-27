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
