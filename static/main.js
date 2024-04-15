const btn = document.getElementById('genre-btn');
const dropdown = document.getElementById('drop');
const opt = document.getElementsByClassName('opt');
let isChild = 0;

btn.addEventListener('click', () => {
    if(dropdown.classList.contains('hide')) {
        dropdown.classList.remove('hide');
        dropdown.classList.toggle('showb');
    }else if(dropdown.classList.contains('showb')){
        dropdown.classList.remove('showb');
        dropdown.classList.toggle('hide');
    }
    
})

let anims = document.getElementsByClassName("anims");
Array.from(anims).forEach(function(anim) {
    anim.addEventListener("mouseenter", function() {
        anim.style.opacity = 0.7;
    })
    anim.addEventListener("mouseleave", function() {
        anim.style.opacity = 1;
    })
});

let opts = document.getElementsByClassName("opt");
Array.from(opts).forEach((opt) => {
    let isClicked = false;
    let parent = opt.parentNode;
    opt.addEventListener("click", (e) => {
        if (isClicked === true) {
            opt.style.border = "1px solid transparent";
            isClicked = false;
            parent.appendChild(opt);

        }else if (isClicked === false) {
            opt.style.border = "1px solid black";
            isClicked = true;
            parent.insertBefore(opt, parent.firstChild);
            console.log(opt.innerHTML);
        }
    }) 
})


const dropdownBtn = document.querySelector('.genre-btn');
const dropdownMenu = document.querySelector('.dropdown');
dropdownMenu.style.width = dropdownBtn.offsetWidth - 23 + 'px';

window.addEventListener('resize', () => {
    dropdownMenu.style.width = dropdownBtn.offsetWidth - 20 + 'px';
})