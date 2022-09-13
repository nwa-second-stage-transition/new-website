const goAboutSlide = ((targetIndex) => {
    var theCarousel = document.querySelector('#aboutCarousel')
    var carousel = new bootstrap.Carousel(theCarousel);
    carousel.to(targetIndex);
});

document.getElementById("year").innerHTML = new Date().getFullYear();

/** Netlify  **/
if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
    if (!user) {
        window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
        });
    }
    });
}