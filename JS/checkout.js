const now = new Date();


// ===== LẤY GIỎ HÀNG =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");
const placeOrderBtn = document.getElementById("placeOrder");

let total = 0;//tại sao phải dùng let ở đây mà không dùng const? 

// ===== RENDER GIỎ HÀNG =====
function renderCheckout() {
  checkoutItems.innerHTML = "";
  total = 0;

  if (cart.length === 0) {
    checkoutItems.innerHTML = "<li>Giỏ hàng trống</li>";
    checkoutTotal.innerText = "0đ";
    placeOrderBtn.disabled = true;
    return;
  }

  placeOrderBtn.disabled = false;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    const li = document.createElement("li");
    li.className = "checkout-item";

    li.innerHTML = `
       <div class="product-left">
    <img src="${item.img}" alt="${item.name}">
    <div class="qty-control under-image">
      <button class="qty-btn minus" data-index="${index}">−</button>
      <span class="qty">${item.qty}</span>
      <button class="qty-btn plus" data-index="${index}">+</button>
    </div>
  </div>

      
      
      
      <div class="info">
        <h4>${item.name}</h4>
        <p>Số lượng: ${item.qty}</p>
        <p>Giá: ${item.price.toLocaleString()}đ</p>
        
        <p><strong>${itemTotal.toLocaleString()}đ</strong></p>
      </div>
      <button class="remove-btn" data-index="${index}">✕</button>
    `;

    checkoutItems.appendChild(li);
  });

  checkoutTotal.innerText = total.toLocaleString() + "đ";
}

checkoutItems.addEventListener("click", (e) => {
  //*const index = e.target.dataset.index;// lỗi nếu bấm vào chỗ khác nút thì không có dataset
  const btn = e.target.closest("button"); // tìm nút gần nhất
  if (!btn) return;
  const index = btn.dataset.index;// lấy index từ nút

  // TĂNG SỐ LƯỢNG
  if (e.target.classList.contains("plus")) {
    cart[index].qty += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCheckout();
  }

  // GIẢM SỐ LƯỢNG
  if (e.target.classList.contains("minus")) {
    if (cart[index].qty > 1) {
      cart[index].qty -= 1;
    } else {
      // qty = 1 mà bấm − thì xóa
      cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCheckout();
  }

  // XÓA SẢN PHẨM
  if (e.target.classList.contains("remove-btn")) {
    const itemElement = e.target.closest(".checkout-item");
    itemElement.classList.add("removing");

    setTimeout(() => {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCheckout();
    }, 300);
  }
});


// ===== ĐẶT HÀNG =====
placeOrderBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const note = document.getElementById("note").value.trim();

  if (!name || !phone || !address) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  document.getElementById("loadingOverlay").classList.remove("hidden");
    
    setTimeout(() => {
    const now = new Date();
    const order = {
      id: "DH" + Date.now(),
      name,
      phone,
      address,
      note,
      items: cart,
      total,
     createdAt: now.toLocaleString("vi-VN")
    };

    localStorage.setItem("order", JSON.stringify(order));
    const orders = JSON.parse(localStorage.getItem("orders")) || [];//
    orders.push(order);
    
    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.removeItem("cart");



    document.getElementById("loadingOverlay").classList.add("hidden");
    document.getElementById("successOverlay").classList.remove("hidden");

    setTimeout(() => {
      window.location.href = "order-detail.html";
    }, 1000);
  }, 1000);
});

// ===== LOAD LẦN ĐẦU =====
renderCheckout();