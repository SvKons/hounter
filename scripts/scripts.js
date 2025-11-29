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

const swiperSlides = () => {
    const swipers = {};
    let currentActiveSwiper = null;

    const sliderConfigs = {
        featured: {
            selector: '.featured-swiper',
            navigation: {
                prevEl: '.featured__navigation .arrow_prev',
                nextEl: '.featured__navigation .arrow_next',
                disabledClass: 'is-disabled',
            },
            config: {
                slidesPerView: 1.2,
                spaceBetween: 20,
                breakpoints: {
                    550: {
                        slidesPerView: 2.2,
                        spaceBetween: 30,
                    },
                    768: {
                        slidesPerView: 2.8,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 3.5,
                        spaceBetween: 40,
                    },
                },
                on: {
                    init(swiperInstance) {
                        bindCustomNavigation(swiperInstance, 'featured');
                    },
                },
            },
        },
        reviews: {
            selector: '.reviews__swiper',
            navigation: {
                prevEl: '.reviews__navigation .arrow_prev',
                nextEl: '.reviews__navigation .arrow_next',
                disabledClass: 'is-disabled',
            },
            config: {
                slidesPerView: 1.2,
                spaceBetween: 20,
                loop: true,
                centeredSlides: false,
                breakpoints: {
                    425: {
                        slidesPerView: 1.4,
                        spaceBetween: 20,
                        centeredSlides: false,
                    },
                    768: {
                        slidesPerView: 1.5,
                        spaceBetween: 30,
                        centeredSlides: true,
                    },
                },
                on: {
                    init(swiperInstance) {
                        bindCustomNavigation(swiperInstance, 'reviews');
                    },
                },
            },
        },
    };

    const bindCustomNavigation = (swiper, configName) => {
        const nav = sliderConfigs[configName]?.navigation;
        if (!nav) return;

        swiper.params.navigation = {
            prevEl: nav.prevEl,
            nextEl: nav.nextEl,
            disabledClass: nav.disabledClass || 'is-disabled',
        };

        swiper.navigation?.init?.();
        swiper.navigation?.update?.();
    };

    document.querySelectorAll('[data-swiper-config]').forEach(container => {
        const configName = container.dataset.swiperConfig;
        const configData = sliderConfigs[configName];

        if (!configData || !configData.selector) {
            console.warn(`Конфигурация для ${configName} не найдена или не содержит selector`);
            return;
        }

        const swiperEl = container.querySelector(configData.selector);
        if (!swiperEl) {
            console.warn(`Элемент для ${configName} не найден`);
            return;
        }

        const swiperType = swiperEl.getAttribute('data-swiper') || configName;
        const swiperInstance = new Swiper(swiperEl, configData.config);
        swipers[swiperType] = swiperInstance;
    });

    const setActiveSwiper = tabId => {
        const activeSwiperEl = document.querySelector(`#${tabId} .featured-swiper`);
        if (!activeSwiperEl) return;

        const swiperType = activeSwiperEl.getAttribute('data-swiper');
        currentActiveSwiper = swipers[swiperType];

        if (!currentActiveSwiper) return;

        currentActiveSwiper.slideTo(0, 0);
        currentActiveSwiper.navigation?.update?.();
    };

    setActiveSwiper('house');

    return { swipers, setActiveSwiper };
};

const tabs = () => {
    document.addEventListener('DOMContentLoaded', function () {
        const tabButtons = document.querySelectorAll('.tab__button');
        const tabPanes = document.querySelectorAll('.tab__panel');

        const { setActiveSwiper } = swiperSlides();

        tabButtons.forEach(button => {
            button.addEventListener('click', function () {
                const tabId = this.getAttribute('data-tab');

                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));

                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');

                setActiveSwiper(tabId);
            });
        });
    });
};
tabs();
