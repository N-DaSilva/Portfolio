const loader = document.querySelector('.loader');
setTimeout(function(){
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none'
  }, 1500);

document.querySelectorAll('path').forEach(function (star) {
    let { x, y, width, height } = star.getBBox();
    let cx = width / 2 + x;
    let cy = height / 2 + y;
    let duration = Math.random() + 1;

    star.style.transformOrigin = `${cx}px ${cy}px`;
    star.style.animation = `twinkle ${duration}s infinite`;
});

document.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');
    const hill = document.querySelector('.hill');

    fadeOut(sections);

    header.style.filter = `blur(${window.scrollY / 1000}px)`;

    if (window.scrollY > document.documentElement.clientHeight/2) {
        header.style.top = '-50%'
    } else {
        header.style.top = '0';
    }

    if (window.scrollY > document.documentElement.clientHeight) {
        hill.style.position = 'fixed';
        hill.style.top = '0';
        hill.style.left = '0';
        hill.style.width = '100%';
    } else {
        hill.style.position = 'relative';
    }
});

function fadeOut(sections) {
    let n = 1;
    sections.forEach(function (section) {
        if (window.scrollY > document.documentElement.clientHeight * n) {
            section.style.position = 'fixed';
            section.style.top = '0';
            section.style.left = '0';
            section.style.width = '100%';

            section.style.filter = `blur(${(window.scrollY - document.documentElement.clientHeight * n) / 1000}px)`;
            section.style.transform = `scale(${1 - (window.scrollY - document.documentElement.clientHeight * n) * (0.5 / document.documentElement.scrollHeight)})`;

        } else {
            section.style.transform = 'scale(1)';
            section.style.position = 'relative';
            section.style.filter = 'blur(0px)';
        }
        n++;
    });
}