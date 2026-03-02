

const sections = document.querySelectorAll(".story-section");

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
},{threshold:0.2});

sections.forEach(section=>{
  observer.observe(section);
});
const slider = document.querySelector(".testimonial-slider");
const cards = document.querySelectorAll(".testimonial-card");
const leftBtn = document.querySelector(".left");
const rightBtn = document.querySelector(".right");

let index = 0;

function updateSlider(){
  const cardWidth = cards[0].offsetWidth + 30; 
  slider.style.transform = `translateX(-${index * cardWidth}px)`;
}

rightBtn.addEventListener("click", ()=>{
  if(index < cards.length - 3){
    index++;
    updateSlider();
  }
});

leftBtn.addEventListener("click", ()=>{
  if(index > 0){
    index--;
    updateSlider();
  }
});

window.addEventListener("resize", updateSlider);

