document.addEventListener("DOMContentLoaded", function() {
  // Xử lý nút + và -
  document.querySelectorAll(".product").forEach(product => {
    const minusBtn = product.querySelector(".minus");
    const plusBtn = product.querySelector(".plus");
    const input = product.querySelector(".qty-input, .qty-input_box");

    if (minusBtn && plusBtn && input) {

      minusBtn.addEventListener("click", () => {
        let value = parseInt(input.value);
        if (value > 1) input.value = value - 1;
      });

      plusBtn.addEventListener("click", () => {
        let value = parseInt(input.value);
        if (value < 20) input.value = value + 1;
      });

      // Ngăn nhập sai dữ liệu
      input.addEventListener("input", () => {
        let value = parseInt(input.value);
        if (isNaN(value) || value < 1) {
          input.value = 1;
        } else if (value > 20) {
          input.value = 20;
        }
      });
    }
  });

  // Xử lý khi nhấn "Thêm vào giỏ"
  document.querySelectorAll(".add-cart-btn, .add-cart-btn_box").forEach(btn => {
    btn.addEventListener("click", () => {
      const product = btn.closest(".product");
      const name = product.querySelector("h3").innerText;
      const qty = product.querySelector(".qty-input, .qty-input_box").value;

      showToast(`Đã thêm ${qty} ${name} vào giỏ hàng! 🛒`);
    });
  });

  // Hàm tạo thông báo dạng toast
  function showToast(message) {
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerText = message;

    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
});
