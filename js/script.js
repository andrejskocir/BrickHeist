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
let risanje
let level;

let btnCenter = title.offsetWidth/2 - start.offsetWidth/2
let cash = new Audio("./audio/cash.mp3")

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
  if(easy.classList.contains("active"))
    level = 1
  else if (medium.classList.contains("active"))
    level = 2
  else
    level = 3

    game.style.display = "flex"
    window.scrollTo({
        top: container.offsetHeight*2,
        left: 100,
        behavior: 'smooth'
      });
      setTimeout(function(){
        difficulty.style.display = "none"
      },750)
    drawIt()
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
  location.reload()
  /*
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    easy.classList.remove("active")
    medium.classList.remove("active")
    hard.classList.remove("active")
*/

}
let song = new Audio("./audio/song.mp3")
song.volume = 0.2
function playSong() {
  song.play()
  song.loop= true
  document.getElementById("play").style.display = "block";
  document.getElementById("pause").style.display = "none";
}
function stopSong() {
  song.pause();
  document.getElementById("play").style.display = "none";
  document.getElementById("pause").style.display = "block";
}

const icons = document.querySelector(".icons");
const copy = document.getElementById("copy");

icons.addEventListener("click", (e) => {
  cash.play()
  swal.fire({
    title: "<h2 style='color:white'>Instructions</h2>",
    background: "rgb(103, 9, 29)",
    confirmButtonColor: '#353535',
    html: "<p style='color:white; text-align: left; font-size: 3vmin; letter-spacing: 0.1vmin; padding: 0 1vmin;'>Choose your difficulty out of the three given options.<br>In order to win you must break all the bricks.<br>To move use the mouse or left and right arrow on your keyboard.<br>You can also pause the game with the letter P on your keyboard.<br>Good luck!</p>",
  });
})


copy.addEventListener("click", (e) => {
  cash.play()
  swal.fire({
    title: "<h2 style='color:white'>Credits</h2>",
    html: "<h3 style='color:white;letter-spacing: 0.1vmin;'>Made by Andrej Skočir</h3>",
    background: "rgb(103, 9, 29)",
    customClass: {
      confirmButton: 'no-border',
    },
    confirmButtonColor: '#353535',
  });

})