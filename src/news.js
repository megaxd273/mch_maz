const fetchData = async () => {
  try {
    const response = await fetch('../news.json');
    const data = await response.json();
    return data.news;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const createNewsElement = (pic, link, title, date, firstDot) => {
  const sliderLine = document.querySelector('.news__slider-line');
  const dotsContainer = document.querySelector('.news__dots-wrapper');

  const slide = document.createElement('div');
  slide.classList.add('news__slide');

  const newsLink = document.createElement('a');
  newsLink.href = link;
  newsLink.textContent = '';
  newsLink.target = '_blank';
  newsLink.classList.add('news__link-wrapper');

  slide.classList.add('news__slider-img');
  slide.style.backgroundImage = `url(${pic})`;
  slide.style.backgroundSize = 'cover';
  slide.style.position = 'center';
  slide.setAttribute('data-title', title);
  slide.setAttribute(
    'data-date',
    new Date(date).toLocaleDateString('ru-RU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  );
  slide.append(newsLink);
  sliderLine.append(slide);

  const dot = document.createElement('div');
  dot.classList.add('news__dot');
  if (firstDot) {
    dot.classList.add('news__dot_active');
  }
  dotsContainer.append(dot);
  const dotsWrapperWidth = dotsContainer.offsetWidth;
  dotsContainer.style.left = `calc(50% - ${dotsWrapperWidth / 2}px)`;
};

const initSlider = () => {
  const sliderLine = document.querySelector('.news__slider-line');
  const prevButton = document.querySelector('.news__button_prev');
  const nextButton = document.querySelector('.news__button_next');
  const dots = document.querySelectorAll('.news__dot');

  let position = 0;
  let dotIndex = 0;
  let slideDistance = document
    .querySelector('.news__slider-img')
    .getBoundingClientRect().width;
  const updateSlideDistance = () => {
    slideDistance = document
      .querySelector('.news__slider-img')
      .getBoundingClientRect().width;
  };

  window.addEventListener('resize', () => {
    position = 0;
    dotIndex = 0;
    indicate(dotIndex);
    sliderLine.style.left = 0;
    updateSlideDistance();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      position = slideDistance * index;
      sliderLine.style.left = -position + 'px';
      indicate(index);
    });
  });
  const nextSlide = () => {
    updateSlideDistance();
    if (position < (dots.length - 1) * slideDistance) {
      position += slideDistance;
      dotIndex += 1;
    } else {
      position = 0;
      dotIndex = 0;
    }
    sliderLine.style.left = -position + 'px';
    indicate(dotIndex);
  };
  const prevSlide = () => {
    if (position > 0) {
      position -= slideDistance;
      dotIndex -= 1;
    } else {
      position = (dots.length - 1) * slideDistance;
      dotIndex = dots.length - 1;
    }
    sliderLine.style.left = -position + 'px';
    indicate(dotIndex);
  };
  const indicate = (index) => {
    for (const dot of dots) {
      dot.classList.remove('news__dot_active');
    }
    dots[index].classList.add('news__dot_active');
  };
  nextButton.addEventListener('click', nextSlide);
  prevButton.addEventListener('click', prevSlide);

  // setInterval(() => {
  //   nextSlide();
  // }, 3000);
};
fetchData().then((news) => {
  news.forEach((item, index) => {
    createNewsElement(
      item.picture,
      item.link,
      item.title,
      item.date,
      index === 0
    );
  });
  initSlider();
});
