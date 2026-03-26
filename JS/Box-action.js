const listBox = document.querySelectorAll('.box');
const wrapperBox = document.querySelector('.review-box');
const btnLeft = document.querySelector('.btnLeft');
const btnRight = document.querySelector('.btnRight');
const reviewDiv = document.querySelector('.review');

let count = 0;
let widthItem = 0;
let spacing = 0;

function getSlideAmount() {
    if (window.innerWidth >= 1366) {
        return 5;
    } 
    else if (window.innerWidth >= 768) {
        return 3;
    } 
    else {
        return 2.3; // mobile: 2 sản phẩm + lộ 1 phần sản phẩm thứ 3
    }
}

function make_slide() {

    const amountSlideAppear = getSlideAmount();

    widthItem = reviewDiv.offsetWidth / amountSlideAppear;

    const widthAllBox = widthItem * listBox.length;

    wrapperBox.style.width = `${widthAllBox}px`;

    listBox.forEach((element) => {
        element.style.width = `${widthItem - 12}px`;
        element.style.marginRight = '12px';
    });

    spacing = widthAllBox - reviewDiv.offsetWidth;

    wrapperBox.style.transform = `translateX(0px)`;
    count = 0;
}

btnRight.addEventListener('click', function () {

    count += widthItem;

    if (count > spacing) {
        count = 0;
    }

    wrapperBox.style.transform = `translateX(${-count}px)`;
});

btnLeft.addEventListener('click', function () {

    count -= widthItem;

    if (count < 0) {
        count = spacing;
    }

    wrapperBox.style.transform = `translateX(${-count}px)`;
});

window.addEventListener('resize', make_slide);

document.addEventListener('DOMContentLoaded', make_slide);