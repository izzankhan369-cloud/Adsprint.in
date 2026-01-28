// SCROLL PROGRESS BAR
window.onscroll = function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("scroll-progress").style.width = scrolled + "%";
};

// PREVENT MOUSE RE-ENTRY JITTER
document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = "none";
    });
    card.addEventListener('mouseleave', () => {
        card.style.transition = "all 0.5s ease";
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    });
});

// ... Keep your existing Cursor and Intersection Observer code here ...
