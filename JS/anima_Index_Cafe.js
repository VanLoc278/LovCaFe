document.addEventListener("DOMContentLoaded", function () {
  const storySection = document.querySelector("#story_v4");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        storySection.classList.add("show");
      }
    });
  }, {
    threshold: 0.3   // 30% xuất hiện mới chạy animation
  });

  observer.observe(storySection);
});