document.addEventListener("DOMContentLoaded", function() {
  const buttons = document.querySelectorAll(".tab-btn");
  const products = document.querySelectorAll(".product");

  // Mặc định: hiển thị danh mục đầu tiên (nếu có)
  if (buttons.length > 0) {
    const defaultCategory = buttons[0].dataset.category;
    showCategory(defaultCategory);
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      // Xóa class active ở tất cả các nút
      buttons.forEach(b => b.classList.remove("active"));
      button.classList.add("active");

      // Lấy danh mục cần hiển thị
      const category = button.dataset.category;
      showCategory(category);
    });
  });

  function showCategory(category) {
    products.forEach(product => {
      if (product.dataset.category === category) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  }
});

const tabs = document.querySelectorAll(".tab-btn");

tabs.forEach(tab => {
    tab.addEventListener("click", function() {
        tabs.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
    });
});