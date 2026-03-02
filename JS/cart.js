  document.addEventListener("DOMContentLoaded", function () {

    // ===== GIỎ HÀNG LƯU TRONG RAM =====
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  let cart = getCart(); // ✅ LẤY TỪ LOCALSTORAGE


    // ===== LẤY ẢNH SẢN PHẨM CHO MỌI TRANG =====
    function getProductImage(btn) { // 
      // Trang chi tiết
      const detailContainer = btn.closest(".container");
      if (detailContainer) {//
        const img = detailContainer.querySelector(".product-img img");
        if (img) return img.src;
      }

      // Trang index / card thường
      const product = btn.closest(".product");
      if (product) {
        const img = product.querySelector("img");
        if (img) return img.src;
      }

      // Slider / sản phẩm liên quan
      const box = btn.closest(".box");
      if (box) {
        const img = box.querySelector("img");
        if (img) return img.src;
      }

      return "IMG/no-image.png";
    }


    // ================= TĂNG / GIẢM SỐ LƯỢNG =================
    document.querySelectorAll(".product").forEach(product => {
      const minusBtn = product.querySelector(".minus");
      const plusBtn = product.querySelector(".plus");
      const input = product.querySelector(".qty-input, .qty-input_box");

      if (!minusBtn || !plusBtn || !input) return;

      minusBtn.addEventListener("click", () => {
        let value = parseInt(input.value) || 1;
        if (value > 1) input.value = value - 1;
      });

      plusBtn.addEventListener("click", () => {
        let value = parseInt(input.value) || 1;
        if (value < 20) input.value = value + 1;
      });

      input.addEventListener("input", () => {
        let value = parseInt(input.value);
        if (isNaN(value) || value < 1) input.value = 1;
        if (value > 20) input.value = 20;
      });
    });

    // ================= THÊM VÀO GIỎ =================
    document.querySelectorAll(".add-cart-btn, .add-cart-btn_box").forEach(btn => {
      btn.addEventListener("click", () => {
        const product = btn.closest(".product");
        if (!product) return;

        const name = product.querySelector("h3")?.innerText.trim();
        const qtyInput = product.querySelector(".qty-input, .qty-input_box");
        const qty = parseInt(qtyInput?.value) || 1;

        const priceEl = product.querySelector(".gia-moi, .price");
        const priceText = priceEl ? priceEl.innerText : "0";
        const price = parseInt(priceText.replace(/\D/g, '')) || 0;

        if (!name) return;

        const existing = cart.find(item => item.name === name);
        if (existing) {
          existing.qty += qty;
        } else {
          const img = getProductImage(btn);


          cart.push({ name, price, qty, img });
        }
        saveCart(cart); 
        showToast(`Đã thêm ${qty} ${name} vào giỏ 🛒`);
        updateCartView();
        updateCartCount(); 
      });
    });

    // ================= MỞ / ĐÓNG POPUP =================
    const cartPopup = document.getElementById("cartPopup");


  function waitForCartButton() {
    const cartBtn = document.getElementById("openCart");

    if (cartBtn) {
      cartBtn.addEventListener("click", function (e) {
        e.preventDefault();
      const popup = document.getElementById("cartPopup");
      popup.style.display = "flex";

      setTimeout(() => {
        popup.classList.add("show");
      }, 10);

  updateCartView();
  updateCartCount(); 

      });
    } else {
      setTimeout(waitForCartButton, 200);
    }
  }
  waitForCartButton();



    window.addEventListener("click", function (e) {
      if (e.target === cartPopup) {
        cartPopup.style.display = "none";
      }
    });

    // ================= CẬP NHẬT HIỂN THỊ POPUP =================
  function updateCartView() {
    const ul = document.getElementById("cartItems");
    const totalEl = document.getElementById("cartTotal");

    if (!ul || !totalEl) return;

    ul.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      ul.innerHTML = "<li>🛒 Giỏ hàng đang trống</li>";
      totalEl.innerText = "0";
      updateCartCount();
      return;
    }
    
    cart.forEach((item, index) => {
    
      const li = document.createElement("li");
      li.classList.add("cart-item");
      const isTrash = item.qty === 1;
      li.innerHTML = `

      <img src="${item.img}" class="cart-img" alt="${item.name}">
        <span class="cart-name"><b>${item.name}</b></span>
      
        <div class="cart-qty">
            <button class="qty-minus " ${isTrash ? 'trash' : ''}" data-index="${index}">
        ${isTrash ? '🗑️' : '−'}
            </button>
    
          <span>x${item.qty}</span>
          <button class="qty-plus" data-index="${index}">+</button>
        </div>

        <span class="cart-price">
          ${(item.price * item.qty).toLocaleString()}đ
        </span>

        <button class="remove-item" data-index="${index}">❌</button>
      `;

      ul.appendChild(li);
      total += item.price * item.qty;
    });

    totalEl.innerText = total.toLocaleString();

    // ===== NÚT + =====
    document.querySelectorAll(".qty-plus").forEach(btn => {
      btn.addEventListener("click", function () {
        const index = this.dataset.index;
        cart[index].qty++;
        saveCart(cart);
        updateCartView();
        updateCartCount();
      });
    });

    // ===== NÚT - =====
    document.querySelectorAll(".qty-minus").forEach(btn => {
      btn.addEventListener("click", function () {
        const index = this.dataset.index;
        if (cart[index].qty === 1) {
              // 👉 Nếu đang là 1 → xóa luôn
              cart.splice(index, 1);
            } else {
              // 👉 Nếu > 1 → giảm số lượng
              cart[index].qty--;
            }

        saveCart(cart);
        updateCartView();
        updateCartCount();
      });
    });

    // ===== NÚT X =====
document.querySelectorAll(".remove-item").forEach(btn => {
  btn.addEventListener("click", function () {
    const index = this.dataset.index;
    const li = this.closest(".cart-item");

    // Thêm animation
    li.classList.add("removing");

    setTimeout(() => {
      cart.splice(index, 1);
      saveCart(cart);
      updateCartView();
      updateCartCount();
    }, 300); // phải khớp với CSS
  });
});
  }

  // ================= SỐ THÔNG BÁO GIỎ HÀNG =================
  function updateCartCount() {
    const cartCount = document.getElementById("cartCount");
    if (!cartCount) return;

    let totalQty = 0;
    cart.forEach(item => {
      totalQty += item.qty;
    });

    if (totalQty > 0) {
      cartCount.innerText = totalQty;
      cartCount.style.display = "inline-block";
    } else {
      cartCount.style.display = "none";
    }
  }

    

    // ================= TOAST =================
    function showToast(message) {
      const toast = document.createElement("div");
      toast.classList.add("toast");
      toast.innerText = message;

      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2500);
    }

  updateCartView();
  updateCartCount();


  function waitForCartCount() {
    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
      updateCartCount();
    } else {
      setTimeout(waitForCartCount, 100);
    }
  }
  updateCartView();
  waitForCartCount();

  });
  // ================= FIX NÚT X ĐÓNG POPUP =================
  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("close-btn")) {
      const popup = document.getElementById("cartPopup");

      popup.classList.remove("show");

      setTimeout(() => {
        popup.style.display = "none";
      }, 300);

    }
  });

