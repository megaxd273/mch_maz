function handleResize() {
  document.querySelectorAll('.menu__item').forEach(function (item) {
    item.onclick = null;
  });
  document.querySelectorAll('.menu__item').forEach(function (item) {
    if (window.innerWidth > 1000) {
      item.onclick = function (e) {
        // e.stopPropagation();
        clickMenu(e, item);
      };
    } else {
      document.querySelector('.menu__item').onclick = toggleMenu;
    }
  });
}
handleResize();

// window.addEventListener('resize', function () {
//   console.log(123);
//   handleResize();
// });

function clickMenu(e, item) {
  console.log('qwe');

  e.preventDefault();
  document.querySelectorAll('.menu__item').forEach(function (otherItem) {
    if (otherItem !== item && otherItem.classList.contains('open')) {
      otherItem.classList.remove('open');
    }
  });
  item.classList.toggle('open');
}

function toggleMenu() {
  console.log('asd');

  document.querySelector('.burger').classList.toggle('active');
  document.querySelector('.menu').classList.toggle('open');
}

document.querySelector('.burger').addEventListener('click', toggleMenu);
document.querySelector('.menu').addEventListener('click', toggleMenu);

// document.querySelector('.burger').addEventListener('click', function () {
//   this.classList.toggle('active');
//   document.querySelector('.menu').classList.toggle('open');
// });

let lastScroll = 0;
const header = document.querySelector('.menu');
const headerStyle = header.style;
const headerTopPanel = document.querySelector('.header__top-panel');
const scrollPosition = () => window.scrollY;
const containsHidden = () => header.classList.contains('menu_hidden');
const rect = headerTopPanel.getBoundingClientRect();

window.addEventListener('scroll', () => {
  if (window.innerWidth > 1000) {
    window.scrollY > rect.height
      ? (headerStyle.position = 'fixed')
      : (headerStyle.position = 'static');
    window.scrollY <= rect.height
      ? header.classList.remove('menu_visible')
      : header.classList.add('menu_visible');
    if (
      scrollPosition() > lastScroll &&
      !containsHidden() &&
      scrollPosition() > rect.height
    ) {
      header.classList.add('menu_hidden');
    } else if (scrollPosition() < lastScroll && containsHidden()) {
      header.classList.remove('menu_hidden');
    }
    lastScroll = scrollPosition();
  }
});

const faqs = document.querySelectorAll('.faq');
faqs.forEach((el) => {
  el.addEventListener('click', () => {
    el.classList.toggle('active');
  });
});

const reviewButton = document.querySelector('.reviews-section__button');
const modal = document.querySelector('[data-modal]');
reviewButton.addEventListener('click', () => {
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  document.body.style.paddingRight = `${scrollbarWidth}px`;
  modal.showModal();
  document.body.style.overflow = 'hidden';
});
const closeModal = (e) => {
  const dialogDimensions = modal.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    modal.close();
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = `${0}px`;
  }
};
modal.addEventListener('click', (e) => closeModal(e));
modal.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.close();
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = `${0}px`;
  }
});

const reviewsData = [
  {
    userName: 'Светлана',
    userText:
      'Обратилась к неврологу, получила нужную мне консультацию. Также была у терапевта. К персоналу никаких вопросов.',
  },
  {
    userName: 'Анатолий Аркадьевич',
    userText:
      'Нужно было сделать компьютерную томографию. Заказал талон, приехал в назначенное время и сделал. Получил грамотную расшифровку и остался доволен работой.',
  },
  { userName: 'Пользователь 3', userText: 'Отзыв 3' },
  { userName: 'Пользователь 4', userText: 'Отзыв 4' },
  { userName: 'Пользователь 5', userText: 'Отзыв 5' },
  { userName: 'Пользователь 6', userText: 'Отзыв 6' },
];
function addReviewsToPage(reviews) {
  const container = document.querySelector('.reviews-section__container');
  container.innerHTML = '';
  reviews.forEach((review) => {
    const reviewElement = document.createElement('div');
    reviewElement.classList.add('review-card');

    const profileContainer = document.createElement('div');
    profileContainer.classList.add('review-card__profile');

    const reviewName = document.createElement('div');
    reviewName.classList.add('review-card__user');
    reviewName.textContent = review.userName;

    const reviewText = document.createElement('div');
    reviewText.classList.add('review-card__text');
    reviewText.textContent = review.userText;

    const reviewImg = document.createElement('div');
    reviewImg.classList.add('review-card__img');
    reviewImg.innerHTML = `
      <svg
    
        viewBox="0 0 1024 1024"
        class="icon"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M691.573 338.89c-1.282 109.275-89.055 197.047-198.33 198.331-109.292 1.282-197.065-90.984-198.325-198.331-0.809-68.918-107.758-68.998-106.948 0 1.968 167.591 137.681 303.31 305.272 305.278C660.85 646.136 796.587 503.52 798.521 338.89c0.811-68.998-106.136-68.918-106.948 0z"
          fill="#4A5699"
        />
        <path
          d="M294.918 325.158c1.283-109.272 89.051-197.047 198.325-198.33 109.292-1.283 197.068 90.983 198.33 198.33 0.812 68.919 107.759 68.998 106.948 0C796.555 157.567 660.839 21.842 493.243 19.88c-167.604-1.963-303.341 140.65-305.272 305.278-0.811 68.998 106.139 68.919 106.947 0z"
          fill="#C45FA0"
        />
        <path
          d="M222.324 959.994c0.65-74.688 29.145-144.534 80.868-197.979 53.219-54.995 126.117-84.134 201.904-84.794 74.199-0.646 145.202 29.791 197.979 80.867 54.995 53.219 84.13 126.119 84.79 201.905 0.603 68.932 107.549 68.99 106.947 0-1.857-213.527-176.184-387.865-389.716-389.721-213.551-1.854-387.885 178.986-389.721 389.721-0.601 68.991 106.349 68.933 106.949 0.001z"
          fill="#E5594F"
        />
      </svg>
    `;
    profileContainer.append(reviewImg, reviewName);

    reviewElement.append(profileContainer, reviewText);
    container.append(reviewElement);
  });
}
addReviewsToPage(reviewsData);

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const paths = document.querySelectorAll('.review-card__img svg path');

paths.forEach((path) => {
  path.style.fill = getRandomColor();
});

const loadMoreBtn = document.querySelector(
  '.reviews-section__button_load-more'
);
const cardsArray = Array.from(document.querySelectorAll('.review-card'));

const responsiveCases = [
  { minWidth: 1150, maxCardsToShow: 8 },
  { minWidth: 900, maxCardsToShow: 6 },
  { minWidth: 600, maxCardsToShow: 4 },
  { minWidth: 0, maxCardsToShow: 2 },
];

function handleResponsiveCases() {
  const width = window.innerWidth;
  let showLoadMoreBtn = true;

  for (const { minWidth, maxCardsToShow } of responsiveCases) {
    if (width > minWidth) {
      const visibleCards = cardsArray.slice(0, maxCardsToShow);
      const hiddenCards = cardsArray.slice(maxCardsToShow);

      visibleCards.forEach((item) =>
        item.classList.remove('review-component_hidden')
      );
      hiddenCards.forEach((item) =>
        item.classList.add('review-component_hidden')
      );

      showLoadMoreBtn = hiddenCards.length > 0;

      break;
    }
  }

  loadMoreBtn.classList.toggle('review-component_hidden', !showLoadMoreBtn);
}

window.addEventListener('resize', () => {
  handleResponsiveCases();
  handleResize();
});
loadMoreBtn.addEventListener('click', () => {
  cardsArray.forEach((item) =>
    item.classList.remove('review-component_hidden')
  );
  loadMoreBtn.classList.add('review-component_hidden');
});

handleResponsiveCases();
function addReview() {
  const userNameInput = document.getElementById('user-name');
  const userTextInput = document.getElementById('user-text');

  const userName = userNameInput.value;
  const userText = userTextInput.value;

  if (userName && userText) {
    userNameInput.value = '';
    userTextInput.value = '';
    reviewsData.push({ userName, userText });
    const modal = document.querySelector('[data-modal]');
    addReviewsToPage(reviewsData);
    handleResponsiveCases();

    modal.close();
  } else {
    alert('Заполните все поля формы.');
  }
}
