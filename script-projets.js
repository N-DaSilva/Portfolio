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
    if (document.documentElement.clientWidth <= 768){
        animationEnabled = false;
        background.style.clipPath = `circle(3000px at ${cursorX}px ${cursorY}px)`;
        background.style.webkitClipPath = `circle(3000px at ${cursorX}px ${cursorY}px)`;
    } else {
        if (animationEnabled) {
            background.style.clipPath = `circle(300px at ${cursorX}px ${cursorY}px)`;
            background.style.webkitClipPath = `circle(300px at ${cursorX}px ${cursorY}px)`;
        }
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
        
        background.style.clipPath = `circle(3000px at ${cursorX}px ${cursorY}px)`;
        background.style.webkitClipPath = `circle(3000px at ${cursorX}px ${cursorY}px)`;

    } else {
        background.style.clipPath = `circle(300px at ${cursorX}px ${cursorY}px)`;
        background.style.webkitClipPath = `circle(300px at ${cursorX}px ${cursorY}px)`;

        setTimeout(function () {
            animationEnabled = true;
        }, 500)
    }
})

document.querySelectorAll('.star').forEach(function (star) {
    let { x, y, width, height } = star.getBBox();
    let cx = width / 2 + x;
    let cy = height /2 + y;
    let duration = Math.random() + 1;

    star.style.transformOrigin = `${cx}px ${cy}px`;
    star.style.animation = `twinkle ${duration}s infinite`;
});

const popup = document.querySelector('.popup');

fetch('projects.json')
    .then(response => response.json())
    .then(data => {
        document.querySelectorAll('.link').forEach(function (link) {
            link.addEventListener('click', function (event) {
                animationEnabled = false;
                displayPopup(data, event.currentTarget.id)
            });
        });
        
        document.querySelector('.close').addEventListener('click', function () {
            animationEnabled = true;
            popup.style.display = 'none';
        });
    });

function displayPopup(data, index) {
    let project = data[index];
    let title = popup.querySelector('h2');
    let duration = popup.querySelector('.duration');
    let context = popup.querySelector('.context');
    let team = popup.querySelector('.team');
    let technologies = popup.querySelector('.technologies');
    let competences = popup.querySelector('.competences');
    let description = popup.querySelector('.description');
    let link = popup.querySelector('a');
    let img = popup.querySelector('img');

    title.innerHTML = project.name;
    duration.innerHTML = project.duration;
    context.innerHTML = project.context;
    team.innerHTML = project.team;

    technologies.innerHTML = '';
    project.technologies.forEach(technology => {
        technologies.innerHTML += `<li>${technology}</li>`;
    });

    competences.innerHTML = '';
    project.competences.forEach(competence => {
        competences.innerHTML += `<li>${competence}</li>`;
    });

    description.innerHTML = project.description;
    link.href = project.url;
    img.src = `img/${index}.png`;

    popup.style.display = 'flex';
}