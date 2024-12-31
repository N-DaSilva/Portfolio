const loader = document.querySelector(".loader")
const loaderVid = document.querySelector(".loader video")
loaderVid.style.opacity = '1'
setTimeout(function () {
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none'
}, 3000);

const background = document.querySelector('.background');

let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;
let animationEnabled = true;
let checkbox = document.getElementById('show');

function updateTelescope() {
    if (animationEnabled) {
        background.style.clipPath = `circle(300px at ${cursorX}px ${cursorY}px)`;
        background.style.webkitClipPath = `circle(300px at ${cursorX}px ${cursorY}px)`;
    }
    requestAnimationFrame(updateTelescope);
}

document.addEventListener('mousemove', (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;
});

updateTelescope();

checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
        animationEnabled = false;
        document.querySelector('label').innerHTML = 'Hide projects';

        background.style.clipPath = `circle(3000px at ${cursorX}px ${cursorY}px)`;
        background.style.webkitClipPath = `circle(3000px at ${cursorX}px ${cursorY}px)`;

    } else {
        document.querySelector('label').innerHTML = 'Show projects';

        background.style.clipPath = `circle(300px at ${cursorX}px ${cursorY}px)`;
        background.style.webkitClipPath = `circle(300px at ${cursorX}px ${cursorY}px)`;

        setTimeout(function () {
            animationEnabled = true;
        }, 500)
    }
})