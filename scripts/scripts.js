const scrollArrow = () => {
    const scrollToTopButton = document.querySelector('.scroll-to-top');

    if (!scrollToTopButton) {
        return;
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
    });

    scrollToTopButton.addEventListener('click', event => {
        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });
};
scrollArrow();

const nav = () => {
    const burger = document.querySelector('.burger');
    const headerWrapper = document.querySelector('.header__wrapper');
    const body = document.querySelector('body');

    burger.addEventListener('click', function (e) {
        e.stopPropagation();
        headerWrapper.classList.toggle('active');
        burger.classList.toggle('open');
        body.classList.toggle('no-scroll');
    });

    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            headerWrapper.classList.remove('active');
            burger.classList.remove('open');
            body.classList.remove('no-scroll');
        });
    });

    document.addEventListener('click', function (e) {
        if (!headerWrapper.contains(e.target) && !burger.contains(e.target)) {
            headerWrapper.classList.remove('active');
            burger.classList.remove('open');
            body.classList.remove('no-scroll');
        }
    });

    document.addEventListener('DOMContentLoaded', function () {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav__link');

        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('link_active');
            }
        });
    });
};
nav();
