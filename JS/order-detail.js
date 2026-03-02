const orders = JSON.parse(localStorage.getItem("orders")) || [];
if (orders.length === 0) {
  alert("Không tìm thấy đơn hàng!");
  location.href = "index.html";
}

const order = orders[orders.length - 1]; // LẤY ĐƠN MỚI NHẤT
const [time, date] = order.createdAt.split(" ");
// HIỂN THỊ THÔNG TIN

document.getElementById("name").innerText = order.name;
document.getElementById("phone").innerText = order.phone;
document.getElementById("address").innerText = order.address;
document.getElementById("note").innerText = order.note || "Không có ghi chú";
document.getElementById("orderDate").innerText = date;
document.getElementById("orderTime").innerText = time;
// HIỂN THỊ DANH SÁCH SẢN PHẨM

let subTotal = 0;
const tbody = document.getElementById("orderItems");

tbody.innerHTML = ""; // XÓA TRƯỚC KHI RENDER

order.items.forEach(item => {
  const total = Number(item.price) * Number(item.qty);
  subTotal += total;

  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>
      <div class="product">
        <img src="${item.img}">
        <span>${item.name}</span>
      </div>
    </td>
    <td>${item.qty}</td>
    <td>${Number(item.price).toLocaleString()}đ</td>
    <td>${total.toLocaleString()}đ</td>
  `;

  tbody.appendChild(tr);
});

document.getElementById("subTotal").innerText =
  subTotal.toLocaleString() + "đ";

document.getElementById("total").innerText =
  subTotal.toLocaleString() + "đ";//** nếu muốn tính ship + subtotal + giá ship* */