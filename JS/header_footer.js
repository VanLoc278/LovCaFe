// ===== LOAD HEADER =====
fetch("header.html")
.then(res => res.text())
.then(data => {

  document.getElementById("header").innerHTML = data;

  // Sau khi header load xong mới chạy menu
  initMobileMenu();

});


// ===== LOAD FOOTER =====
fetch("footer.html")
.then(res => res.text())
.then(data => {
  document.getElementById("footer").innerHTML = data;
});



// ===== MOBILE MENU =====
function initMobileMenu(){

  const menuBtn = document.querySelector(".mobile");
  const overlay = document.querySelector(".mobile-menu-overlay");
  const closeBtn = document.querySelector(".close-menu");

  if(!menuBtn || !overlay) return;

  // mở menu
  menuBtn.addEventListener("click", function(){
    overlay.classList.add("active");
  });

  // đóng menu
  closeBtn.addEventListener("click", function(){
    overlay.classList.remove("active");
  });

  // click nền để đóng
  overlay.addEventListener("click", function(e){
    if(e.target === overlay){
      overlay.classList.remove("active");
    }
  });
  
// FIX lỗi khi phóng to màn hình
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    overlay.classList.remove("active");
  }
});

}