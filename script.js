const marquee = document.getElementById('running-text');

marquee.innerHTML += marquee.innerHTML;

marquee.addEventListener('animationiteration', () => {
  if (marquee.scrollLeft >= marquee.offsetWidth / 2) {
    marquee.scrollLeft = 0;
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('a[href^="#"]');

  for (const link of links) {
    link.addEventListener('click', smoothScroll);
  }

  function smoothScroll(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const offset = 50;
      const elementPosition = getElementPosition(targetElement);

      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  }

  function getElementPosition(element) {
    let offsetTop = element.offsetTop;

    while (element.offsetParent) {
      element = element.offsetParent;
      offsetTop += element.offsetTop;
    }

    return offsetTop;
  }
});

let currentSlide = 0;
const totalSlides = 6;
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const sliderCounter = document.querySelector('.slider-counter');

function updateCounter() {
  sliderCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;
}

function nextSlide() {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
  } else {
    currentSlide = 0;
  }
  updateCounter();
  updatePosition();
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
  } else {
    currentSlide = totalSlides - 1;
  }
  updateCounter();
  updatePosition();
}

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

let cardBox = document.querySelector('.participants__cardBox');
let cardWidth = document.querySelector('.participants__card').offsetWidth;
let cardGap = window.innerWidth <= 375 ? 32 : 20;
let currentPosition = 0;

function updatePosition() {
  currentPosition = currentSlide * (cardWidth + cardGap);
  cardBox.style.transform = `translateX(${-currentPosition}px)`;
}

function autoSlide() {
  setInterval(() => {
    nextSlide();
  }, 4000);
}

document.addEventListener('DOMContentLoaded', function () {
  updateCounter();
  updatePosition();
  autoSlide();
});

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

document.addEventListener('DOMContentLoaded', function () {
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  const slider = document.querySelector('.stages__gridBox');
  const columnWidth = document.querySelector('.stages__item').clientWidth;
  const columnGap = 20;
  let currentIndex = 0;

  function goToSlide(index) {
    if (index < 0 || index >= 5) {
      return;
    }

    currentIndex = index;
    const offset = -currentIndex * (columnWidth + columnGap);
    slider.style.transform = `translateX(${offset}px)`;

    const bullets = document.getElementById('bullets').textContent.split('');

    function updateBullets(activeIndex) {
      bullets.forEach((bullet, index) => {
        if (index === activeIndex) {
          bullets[index] = '&#9679;';
        } else {
          bullets[index] = '&#9675;';
        }
      });
      document.getElementById('bullets').innerHTML = bullets.join('');
    }

    const activeSlideIndex = currentIndex;
    updateBullets(activeSlideIndex);
  }

  function goToPrevSlide() {
    goToSlide(currentIndex - 1);
    updateIndicators();
  }

  function goToNextSlide() {
    goToSlide(currentIndex + 1);
    updateIndicators();
  }

  prevButton.addEventListener('click', goToPrevSlide);
  nextButton.addEventListener('click', goToNextSlide);
});
