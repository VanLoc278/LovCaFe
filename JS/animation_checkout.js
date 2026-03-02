placeOrderBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const note = document.getElementById("note").value.trim();

  if (!name || !phone || !address) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  // HIỆN LOADING
  document.getElementById("loadingOverlay").classList.remove("hidden");

  setTimeout(() => {
    const order = {
      id: "DH" + Date.now(),
      name,
      phone,
      address,
      note,
      items: cart,
      total,
      createdAt: new Date().toLocaleString()
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.removeItem("cart");

    // ẨN LOADING → HIỆN SUCCESS
    document.getElementById("loadingOverlay").classList.add("hidden");
    document.getElementById("successOverlay").classList.remove("hidden");

    // CHUYỂN TRANG SAU 2 GIÂY
    setTimeout(() => {
      window.location.href = "order-detail.html";
    }, 2000);

  }, 1500); // giả lập xử lý server
});
