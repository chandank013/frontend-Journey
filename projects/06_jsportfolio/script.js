
 // Hamburger menu toggle
 const hamburger = document.getElementById("hamburger");
 const nav = document.getElementById("main-nav");
 hamburger.addEventListener("click", () => {
   nav.classList.toggle("open");
 });


// Dropdown toggle logic: only one open at a time, click toggles it
const navItems = document.querySelectorAll(".nav-item");
navItems.forEach((item) => {
  const link = item.querySelector("a");
  link.addEventListener("click", (e) => {
    e.preventDefault();
    if (item.classList.contains("active")) {
      // If already open, close it
      item.classList.remove("active");
    } else {
      // Close all others and open this
      navItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
    }
  });
});


// Click outside closes all dropdowns and nav on mobile
document.addEventListener("click", (e) => {
  if (!e.target.closest("nav") && !e.target.closest(".hamburger")) {
    navItems.forEach((i) => i.classList.remove("active"));
    nav.classList.remove("open");
  }
});


// Typing effect
const words = [
    "Programmer",
    "Frontend Developer",
    "Data Scientist",
    "Data Analyst"
    ];
let currentIndex = 0;
const span = document.querySelector(".typing-text span");
function updateWord() {
  span.textContent = words[currentIndex];
  currentIndex = (currentIndex + 1) % words.length;
}
updateWord(); // show first word immediately
setInterval(updateWord, 5000); // change every 5 seconds