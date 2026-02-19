/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "burgerMenu": () => (/* binding */ burgerMenu),
/* harmony export */   "isWebp": () => (/* binding */ isWebp),
/* harmony export */   "phoneMask": () => (/* binding */ phoneMask),
/* harmony export */   "popups": () => (/* binding */ popups)
/* harmony export */ });
/*---------------------------------------------------------------------------
Проверка WebP
---------------------------------------------------------------------------*/
function isWebp() {
   function testWebP(callback) {
      const webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height === 2);
      };
      webP.src =
         "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }

   testWebP(function (support) {
      document.body.classList.add(support ? "webp" : "no-webp");
   });
}


/*---------------------------------------------------------------------------
Маска телефона
---------------------------------------------------------------------------*/
function phoneMask() {
   document.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll("input.tel-mask").forEach((input) => {
         let keyCode;
         function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            let pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            let matrix = "+7 (___) ___ __ __",
               i = 0,
               val = this.value.replace(/\D/g, ""),
               new_value = matrix.replace(/[_\d]/g, (a) =>
                  i < val.length ? val.charAt(i++) : a
               );
            i = new_value.indexOf("_");
            if (i !== -1) {
               i < 5 && (i = 3);
               new_value = new_value.slice(0, i);
            }
            let reg = matrix
               .substr(0, this.value.length)
               .replace(/_+/g, (a) => `\\d{1,${a.length}}`)
               .replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || (keyCode > 47 && keyCode < 58)) {
               this.value = new_value;
            }
            if (event.type === "blur" && this.value.length < 5) this.value = "";
         }

         input.addEventListener("input", mask);
         input.addEventListener("focus", mask);
         input.addEventListener("blur", mask);
         input.addEventListener("keydown", mask);
      });
   });
}


/*---------------------------------------------------------------------------
Бургер меню
---------------------------------------------------------------------------*/
function burgerMenu() {
   document.addEventListener("DOMContentLoaded", () => {
      const menuIcon = document.querySelector(".menu__icon");
      const menuBody = document.querySelector(".menu__body");
      const body = document.body;
      const menuBodyClose = document.querySelector(".menu__body-close");
      const animationDuration = 500;

      if (!menuIcon || !menuBody) return;

      const closeMenu = () => {
         menuIcon.classList.remove("active");
         menuBody.classList.remove("active");
         body.classList.remove("no-scroll");
      };

      menuIcon.addEventListener("click", () => {
         menuIcon.classList.toggle("active");
         menuBody.classList.toggle("active");
         body.classList.toggle("no-scroll");
      });

      menuBody.addEventListener("click", (e) => {
         const link = e.target.closest("a");
         if (link) {
            e.preventDefault();
            closeMenu();
            setTimeout(() => {
               window.location.href = link.href;
            }, animationDuration);
         }
      });

      if (menuBodyClose) menuBodyClose.addEventListener("click", closeMenu);

      document.addEventListener("click", (e) => {
         if (!menuBody.contains(e.target) && !menuIcon.contains(e.target)) closeMenu();
      });
   });
}



/*---------------------------------------------------------------------------
Попапы
---------------------------------------------------------------------------*/
function popups() {
   if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initPopups);
   } else {
      initPopups();
   }
}

function initPopups() {
   const POPUP_SELECTOR = ".popup";
   const OPEN_BTN_SELECTOR = ".open-popup";
   const ACTIVE_CLASS = "show";
   const BODY_ACTIVE_CLASS = "popup-opened";

   let activeButton = null;

   // =========================
   // OPEN / SWITCH POPUPS
   // =========================
   document.addEventListener("click", (e) => {
      const button = e.target.closest(OPEN_BTN_SELECTOR);
      if (!button) return;

      e.preventDefault();
      e.stopPropagation();

      const popupId = button.dataset.popup;
      if (!popupId) return;

      const popup = document.getElementById(popupId);
      if (!popup) return;

      const currentPopup = document.querySelector(
         `${POPUP_SELECTOR}.${ACTIVE_CLASS}`
      );

      if (activeButton === button && currentPopup) {
         closePopup(currentPopup);
         return;
      }

      if (currentPopup) {
         closePopup(currentPopup);
      }

      openPopup(popup, button);
   });

   // =========================
   // CLOSE POPUPS (overlay / close btn / outside)
   // =========================
   document.addEventListener("click", (e) => {
      const openPopupEl = document.querySelector(
         `${POPUP_SELECTOR}.${ACTIVE_CLASS}`
      );
      if (!openPopupEl) return;

      const isCloseBtn = e.target.closest(".popup__close");
      const isInsideBody = e.target.closest(".popup__body");

      if (isCloseBtn || !isInsideBody) {
         closePopup(openPopupEl);
      }
   });

   // =========================
   // ESC KEY
   // =========================
   document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;

      const openPopupEl = document.querySelector(
         `${POPUP_SELECTOR}.${ACTIVE_CLASS}`
      );
      if (!openPopupEl) return;

      closePopup(openPopupEl);
   });

   // =========================
   // HELPERS
   // =========================
   function openPopup(popup, button) {
      popup.classList.add(ACTIVE_CLASS);
      document.body.classList.add(BODY_ACTIVE_CLASS);

      if (button) {
         button.classList.add("active");
         activeButton = button;
      }
   }

   function closePopup(popup) {
      popup.classList.remove(ACTIVE_CLASS);
      document.body.classList.remove(BODY_ACTIVE_CLASS);

      if (activeButton) {
         activeButton.classList.remove("active");
         activeButton = null;
      }
   }
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.isWebp();
_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.burgerMenu();
_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.popups();
_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.phoneMask();

/*==========================================================================
header compact
============================================================================*/
function initHeaderCompact() {
   const header = document.querySelector('.header');
   if (!header) return;

   window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
         header.classList.add('compact');
      } else {
         header.classList.remove('compact');
      }
   });
}


/*==========================================================================
Service sliders
============================================================================*/
function initServiceSliders() {
   const serviceSliders = document.querySelectorAll('.services__item-slider');

   serviceSliders.forEach((sliderEl) => {

      if (sliderEl.swiper) return;

      const serviceCard = sliderEl.closest('.services__item');

      const nextBtn = serviceCard.querySelector('.services__item-next');
      const prevBtn = serviceCard.querySelector('.services__item-prev');

      new Swiper(sliderEl, {
         slidesPerView: 1,
         loop: true,
         speed: 600,
         spaceBetween: 10,
         navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn,
         },
      });
   });
}

/*==========================================================================
Move request photo
============================================================================*/
function initRequestImageMove() {
   const mediaQuery = window.matchMedia('(max-width: 767px)');

   document.querySelectorAll('.request__body').forEach(body => {
      const image = body.querySelector('.request__image');
      const subtitle = body.querySelector('.request__subtitle');

      if (!image || !subtitle) return;

      const originalParent = image.parentNode;
      const originalNext = image.nextElementSibling;

      function handleChange(e) {
         if (e.matches) {
            subtitle.appendChild(image);
         } else {
            if (originalNext) {
               originalParent.insertBefore(image, originalNext);
            } else {
               originalParent.appendChild(image);
            }
         }
      }

      mediaQuery.addEventListener('change', handleChange);
      handleChange(mediaQuery);
   });
}


/*==========================================================================
Videos
============================================================================*/
document.addEventListener('DOMContentLoaded', () => {
   const videos = document.querySelectorAll('.video');

   if (!videos.length) return;

   videos.forEach(video => {
      const preview = video.querySelector('.video__preview');
      const playBtn = video.querySelector('.video__play');

      const startVideo = () => {
         const videoSrc = video.dataset.video;
         if (!videoSrc) return;

         if (video.classList.contains('video--active')) return;

         video.classList.add('video--active');

         const iframe = document.createElement('iframe');
         iframe.src = videoSrc + '?autoplay=1';
         iframe.setAttribute('frameborder', '0');
         iframe.setAttribute('allowfullscreen', '');
         iframe.setAttribute('allow', 'autoplay; encrypted-media; fullscreen; picture-in-picture');
         iframe.classList.add('video__iframe');

         video.innerHTML = '';
         video.appendChild(iframe);
      };

      preview.addEventListener('click', startVideo);
      playBtn.addEventListener('click', startVideo);
   });
});


/*==========================================================================
Partners sliders
============================================================================*/
function initPartnersSliders() {
   const partnersSliders = document.querySelectorAll('.partners__slider');

   partnersSliders.forEach((sliderEl) => {

      if (sliderEl.swiper) return;

      new Swiper(sliderEl, {
         slidesPerView: 'auto',
         loop: true,
         speed: 800,
         spaceBetween: 20,
         autoplay: {
            delay: 1500,
         }
      });
   });
}

/*==========================================================================
Sertificates sliders
============================================================================*/
function initSertificatesSliders() {
   const ertificatesSliders = document.querySelectorAll('.sertificates__slider');

   ertificatesSliders.forEach((sliderEl) => {

      if (sliderEl.swiper) return;

      new Swiper(sliderEl, {
         slidesPerView: 'auto',
         loop: true,
         speed: 800,
         spaceBetween: 20,
         navigation: {
            prevEl: '.sertificates__prev',
            nextEl: '.sertificates__next',
         }
      });
   });
}

/*==========================================================================
faq
============================================================================*/
function initFaqAccordion() {
   const faqItems = document.querySelectorAll('.faq__item');
   if (!faqItems.length) return;

   faqItems.forEach(item => {
      const question = item.querySelector('.faq__question');
      const answer = item.querySelector('.faq__answer');

      if (!question || !answer || item.dataset.inited) return;

      question.addEventListener('click', () => {
         const isActive = item.classList.contains('active');

         faqItems.forEach(el => {
            const elAnswer = el.querySelector('.faq__answer');
            if (!elAnswer) return;

            el.classList.remove('active');
            elAnswer.style.maxHeight = null;
         });

         if (!isActive) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
         }
      });

      item.dataset.inited = 'true';
   });
}


/*==========================================================================
City
============================================================================*/
function initCityDropdown(selector = '.header__city') {
   const cityBlocks = document.querySelectorAll(selector);
   if (!cityBlocks.length) return;

   cityBlocks.forEach(block => {
      const button = block.querySelector('.header__city-button');
      const list = block.querySelector('.header__city-list');

      if (!button || !list) return;

      const open = () => block.classList.add('is-open');
      const close = () => block.classList.remove('is-open');
      const toggle = () => block.classList.toggle('is-open');

      button.addEventListener('click', (e) => {
         e.stopPropagation();
         toggle();
      });

      block.addEventListener('mouseenter', open);
      block.addEventListener('mouseleave', close);
   });

   document.addEventListener('click', (e) => {
      cityBlocks.forEach(block => {
         if (!block.contains(e.target)) {
            block.classList.remove('is-open');
         }
      });
   });
}


/*==========================================================================
Submenu
============================================================================*/
document.addEventListener('DOMContentLoaded', () => {
   const menuItems = document.querySelectorAll('.menu__item.has-submenu');
   const breakpoint = 992; // до этого значения считаем мобилкой

   function isMobile() {
      return window.innerWidth < breakpoint;
   }

   function closeAllSubmenus() {
      menuItems.forEach(item => {
         item.classList.remove('active');
         const submenu = item.querySelector('.menu__submenu');
         submenu?.classList.remove('is-opened');
      });
   }

   menuItems.forEach(item => {
      const arrow = item.querySelector('.menu__item-arrow');
      const submenu = item.querySelector('.menu__submenu');

      // ===== ПК (hover) =====
      item.addEventListener('mouseenter', () => {
         if (isMobile()) return;

         item.classList.add('active');
         submenu?.classList.add('is-opened');
      });

      item.addEventListener('mouseleave', () => {
         if (isMobile()) return;

         item.classList.remove('active');
         submenu?.classList.remove('is-opened');
      });

      // ===== МОБ (click) =====
      arrow?.addEventListener('click', (e) => {
         if (!isMobile()) return;

         e.preventDefault();
         e.stopPropagation();

         const isOpened = submenu.classList.contains('is-opened');

         closeAllSubmenus();

         if (!isOpened) {
            item.classList.add('active');
            submenu.classList.add('is-opened');
         }
      });
   });

   // Закрытие при клике вне меню (моб)
   document.addEventListener('click', (e) => {
      if (!isMobile()) return;

      if (!e.target.closest('.menu')) {
         closeAllSubmenus();
      }
   });

   // При ресайзе — закрываем всё
   window.addEventListener('resize', closeAllSubmenus);
});



/*==========================================================================
Init
============================================================================*/
document.addEventListener('DOMContentLoaded', () => {
   initHeaderCompact();
   initServiceSliders();
   initRequestImageMove();
   initPartnersSliders();
   initSertificatesSliders();
   initFaqAccordion();
   initCityDropdown();
});


})();

/******/ })()
;