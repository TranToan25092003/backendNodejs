// handel logout btn
const logoutBtn = document.querySelector("[log-out-btn]");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    const isClick = confirm("logout");
    if (isClick) {
      window.location.href = "/admin/auth/logout";
    }
  });
}
//end
