document.querySelectorAll('.menu__item').forEach(function (item) {
  item.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelectorAll('.menu__item').forEach(function (otherItem) {
      if (otherItem !== item && otherItem.classList.contains('open')) {
        otherItem.classList.remove('open');
      }
    });
    this.classList.toggle('open');
  });
  item.addEventListener('blur', function () {
    this.classList.remove('open');
  });
});

let lastScroll = 0;
const header = document.querySelector('.menu');
const headerStyle = header.style;
const headerTopPanel = document.querySelector('.header__top-panel');
const scrollPosition = () => window.scrollY;
const containsHidden = () => header.classList.contains('menu_hidden');
const rect = headerTopPanel.getBoundingClientRect();

window.addEventListener('scroll', () => {
  scrollY > rect.bottom
    ? (headerStyle.position = 'fixed')
    : (headerStyle.position = 'static');
  window.scrollY <= rect.bottom
    ? header.classList.remove('menu_visible')
    : header.classList.add('menu_visible');
  if (scrollPosition() > lastScroll && !containsHidden() && scrollY > 84) {
    header.classList.add('menu_hidden');
    console.log('down');
  } else if (scrollPosition() < lastScroll && containsHidden()) {
    console.log('up');
    header.classList.remove('menu_hidden');
  }
  lastScroll = scrollPosition();
});

const faqs = document.querySelectorAll('.faq');
faqs.forEach((el) => {
  el.addEventListener('click', () => {
    el.classList.toggle('active');
  });
});
