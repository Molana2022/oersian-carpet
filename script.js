'use strict';

////////sticky Navigation/////////////////////////////
const section1 = document.querySelector('#section--1');
const initialCords = section1.getBoundingClientRect();

window.addEventListener('scroll' , function(){
  if (window.scrollY > initialCords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
})

////////Navigation's elements Fade///////////////////
const fadeNav  = function(e){
  if (e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => { if (el !== link) 
      { el.style.opacity = this; }
    });
    logo.style.opacity = this;}
}

const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', fadeNav.bind(0.5));
nav.addEventListener('mouseout', fadeNav.bind(1));

////////Lazy Load Image//////////////////////////
const imgTargets= document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer){
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  //Replace src with data-src
  entry.target.src= entry.target.dataset.src;
  entry.target.addEventListener('load' , function(){
    entry.target.classList.remove('lazy-img');
  });

  observer.unobsever(entry.target);
};

const imgObserver= new IntersectionObserver(loadImg , {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

////////Tabbed Component/////////////////////////
const tabContainer= document.querySelector('.operations__tab-container');
const tabs= document.querySelectorAll('.operations__tab');
const contents= document.querySelectorAll('.operations__content');

////////Active tab//////////////////////////////
tabContainer.addEventListener('click' , function(e)
{
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tabs.forEach( t => t.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active');

////////Activated content////////////////////
  contents.forEach(c=> c.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
  });

//////////////////slider////////////////////
////////////////////////////////////////////
const slider = function() {
  const slides = document.querySelectorAll('.slide');
  slides.forEach((s, i) => s.style.transform = `translateX(${i*100}%)`);
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const allDots = document.querySelector('.dots');

  let crrSlide = 0;
  const maxSlide = slides.length;

  ////////Slide Dots/////////////////////////
  const createDots = function(){
    slides.forEach(function(_ , i){
      allDots.insertAdjacentHTML('beforeend', `
      <button class='dots__dot' data-slide= '${i}'></button>`)
    });
  }

  const activateDot = function(slide){
    document.querySelectorAll('.dots__dot--active').forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide='${slide}']`).classList.add('dots__dot--active')
  };

  const gotoSlide = function(slide){
    slides.forEach((s, i) => s.style.transform = `translateX(${(i-slide)*100}%)`);
    console.log(slide);
  }
  
  const nextSlide = function(){
    if (crrSlide === maxSlide - 1) crrSlide = 0;
    else crrSlide++;
    gotoSlide(crrSlide);
    activateDot(crrSlide);
  }

  const prevSlide = function(){
    if (crrSlide === 0) crrSlide = maxSlide - 1;
    else crrSlide--;
    gotoSlide(crrSlide);
    activateDot(crrSlide);
  }

  const init = function() {
  gotoSlide(0);
  createDots();
  activateDot(crrSlide);
  }

  init();
  ///////Next slide/////////////////////////
  btnRight.addEventListener('click' , nextSlide);
  btnLeft.addEventListener('click' , prevSlide);

  document.addEventListener('keydown', function(e){
    e.key === 'ArrowLeft' && prevSlide();
    e.key ==='ArrowRight' && nextSlide();
  })
  
  allDots.addEventListener('click' , function(e) {
    if (e.target.classList.contains('dots__dot')) {
      const {slide} = e.target.dataset;
      gotoSlide(slide);
      activateDot(slide);
    }
  } );
}

slider();

///////Modal window///////////////////////////////S
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});




