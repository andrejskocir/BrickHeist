const title = document.querySelector(".title");
const first = document.querySelector(".first");
const second = document.querySelector(".second");
const start = document.querySelector(".start");
const container = document.querySelector(".container");
const difficulty = document.getElementById("difficulty")
const instructions = document.querySelector(".instructions")
const info = document.querySelector(".info")
const easy = document.getElementById("easy")
const medium = document.getElementById("medium")
const hard = document.getElementById("hard")
const select = document.querySelector(".select")
const game = document.getElementById("game")

let btnCenter = title.offsetWidth/2 - start.offsetWidth/2


title.addEventListener("mouseover", (e)=>{
    first.style.transform = "translateY(-35%)"
    second.style.transform = "translateY(35%)"
    start.style.transform = "translateX("+`${title.offsetWidth/2-start.offsetWidth/2}`+"px) translateY(-5vh)"
    start.style.transition = "750ms ease-in-out"
});


title.addEventListener("mouseleave", (e)=>{
    first.style.transform = "translateY(0%)"
    second.style.transform = "translateY(0%)"
    start.style.transform = "translateX(-100vw) translateY(-5vh)"
    start.style.transition = "750ms ease-in-out"
})



easy.addEventListener("click", ()=>{
    easy.classList.add("active")
    medium.classList.remove("active")
    hard.classList.remove("active")
    select.style.visibility = "visible"

})

medium.addEventListener("click", ()=>{
    medium.classList.add("active")
    easy.classList.remove("active")
    hard.classList.remove("active")
    select.style.visibility = "visible"

})

hard.addEventListener("click", ()=>{
    hard.classList.add("active")
    medium.classList.remove("active")
    easy.classList.remove("active")
    select.style.visibility = "visible"
})

select.addEventListener("click", ()=>{
    game.style.display = "flex"
    window.scrollTo({
        top: container.offsetHeight*2,
        left: 100,
        behavior: 'smooth'
      });
      setTimeout(function(){
        difficulty.style.display = "none"
      },750)
      
})
start.addEventListener("click", ()=>{
  difficulty.style.display = "flex"
  game.style.display = "none"
  window.scrollTo({
      top: title.offsetHeight*2,
      left: 100,
      behavior: 'smooth'
    });
})

//Get the button
var scrollToTop = document.querySelector(".scrollToTop");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTop.style.display = "block";
  } else {
    scrollToTop.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
