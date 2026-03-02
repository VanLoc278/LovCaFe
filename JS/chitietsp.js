
function goDetail(product) {
    const data = {
        name: product.dataset.name,
        price: product.dataset.price,
        img: product.dataset.img,
        desc: product.dataset.desc
    };

    localStorage.setItem("productDetail", JSON.stringify(data));
    window.location.href = "chitietsanpham.html";
}

document.addEventListener("DOMContentLoaded", function () {
    const data = JSON.parse(localStorage.getItem("productDetail"));

    if (!data) return;

    document.getElementById("productName").innerText = data.name;
    document.getElementById("productPrice").innerText = 
        Number(data.price).toLocaleString("vi-VN") + "đ";
    document.getElementById("productImg").src = data.img;
    document.getElementById("productDesc").innerText = data.desc;
});
