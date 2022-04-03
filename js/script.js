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


let btnCenter = title.offsetWidth/2 - start.offsetWidth/2
console.log(btnCenter);
title.addEventListener("mouseover", (e)=>{
    first.style.transform = "translateY(-35%)"
    second.style.transform = "translateY(35%)"
    start.style.transform = "translateX("+`${btnCenter}`+"px) translateY(-5vh)"
    start.style.transition = "750ms ease-in-out"
});


title.addEventListener("mouseleave", (e)=>{
    first.style.transform = "translateY(0%)"
    second.style.transform = "translateY(0%)"
    start.style.transform = "translateX(-120vw) translateY(-5vh)"
    start.style.transition = "750ms ease-in-out"
})

start.addEventListener("click", ()=>{
    difficulty.style.display = "flex"
    window.scrollTo({
        top: title.offsetHeight*2,
        left: 100,
        behavior: 'smooth'
      });
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
    
})