let slideIndex = 0;
autoShowSlides();

function autoShowSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    
    setTimeout(autoShowSlides, 6000); // 4 giây đổi ảnh
}

function plusSlides(n) {
    slideIndex += n - 1;
    if (slideIndex < 0) slideIndex = 0;
    autoShowSlides();
}

function currentSlide(n) {
    slideIndex = n - 1;
    autoShowSlides();
}





