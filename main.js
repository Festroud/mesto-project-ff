(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}function n(e){if("Escape"===e.key){var n=document.querySelector(".popup_is-opened");n&&t(n)}}function r(e,t,n){var r=e.querySelector(".".concat(t.id,"-input-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}function o(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));!function(e,t,n){t?(e.classList.add(n.disabledButtonClass),e.disabled=!0):(e.classList.remove(n.disabledButtonClass),e.disabled=!1)}(e.querySelector(t.submitButtonSelector),n.some((function(e){return!e.validity.valid})),t)}function c(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){r(e,n,t)})),o(e,t)}var a=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function u(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...";t.textContent=e?r:n}function i(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранение...";t.preventDefault();var r=t.submitter,o=r.textContent;u(!0,r,o,n),e().then((function(){t.target.reset()})).catch((function(e){console.error("Ошибка: ".concat(e))})).finally((function(){u(!1,r,o)}))}var s={baseUrl:"https://nomoreparties.co/v1/wff-cohort-23",headers:{authorization:"0e3cc8b0-02a1-45cf-83f4-1d07ae6ce22f","Content-Type":"application/json"}},l=function(e){return fetch("".concat(s.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:s.headers}).then(a)},d=function(e){return fetch("".concat(s.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:s.headers}).then(a)},p=function(e){return fetch("".concat(s.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:s.headers}).then(a)},f=document.querySelector(".places__list"),_=document.querySelector(".popup_type_image"),m=_.querySelector(".popup__image"),v=_.querySelector(".popup__caption"),h=document.querySelector(".profile__edit-button"),y=document.querySelector(".profile__add-button"),S=document.querySelector(".profile__title"),b=document.querySelector(".profile__description"),q=document.querySelector('.popup__form[name="edit-profile"]'),E=q.querySelector(".popup__input_type_name"),k=q.querySelector(".popup__input_type_description"),L=document.querySelector('.popup__form[name="new-place"]'),C=L.querySelector(".popup__input_type_card-name"),g=L.querySelector(".popup__input_type_url"),x=document.querySelector('.popup__form[name="edit-avatar"]'),A=x.querySelector(".popup__input_type_url"),U=document.querySelectorAll(".popup"),T=document.querySelector(".popup_type_edit"),w=document.querySelector(".popup_type_new-card"),B=document.querySelector(".popup_type_edit-avatar"),P=document.querySelector(".profile__image"),D=null,N={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",disabledButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"};function O(t){var n=t.target.src,r=t.target.alt;m.src=n,m.alt=r,v.textContent=r,e(_)}function j(e,t){confirm("Вы уверены, что хотите удалить эту карточку?")&&l(e).then((function(){var e=t.target.closest(".card");e&&e.remove()})).catch((function(e){return console.error("Ошибка: ".concat(e))}))}function J(e,t,n,r){r?p(e).then((function(e){n(e.likes)})).catch((function(e){return console.error(e)})):d(e).then((function(e){n(e.likes)})).catch((function(e){return console.error(e)}))}function H(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=function(e,t,n,r,o){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),a=c.querySelector(".card__image"),u=c.querySelector(".card__title"),i=c.querySelector(".card__like-button"),s=c.querySelector(".card__like-count"),l=c.querySelector(".card__delete-button");a.src=e.link,a.alt=e.name,u.textContent=e.name,s.textContent=e.likes.length,e.likes.some((function(e){return e._id===o}))&&i.classList.add("card__like-button_is-active");var d=function(t){e.likes=t,s.textContent=t.length,t.some((function(e){return e._id===o}))?i.classList.add("card__like-button_is-active"):i.classList.remove("card__like-button_is-active")};return a.addEventListener("click",t),i.addEventListener("click",(function(t){var r=i.classList.contains("card__like-button_is-active");n(e._id,t,d,r)})),e.owner._id===o?l.addEventListener("click",(function(t){return r(e._id,t)})):l.remove(),c}(e,O,J,j,D);t?f.prepend(n):f.append(n)}h.addEventListener("click",(function(){E.value=S.textContent,k.value=b.textContent,e(T),c(q,N)})),y.addEventListener("click",(function(){e(w),c(L,N)})),P.addEventListener("click",(function(){e(B),c(x,N)})),function(e){e.forEach((function(e){var n=e.querySelector(".popup__close");n&&n.addEventListener("click",(function(){t(e)})),e.addEventListener("click",(function(n){n.target===e&&t(e)}))}))}(U),q.addEventListener("submit",(function(e){i((function(){return(e=E.value,n=k.value,fetch("".concat(s.baseUrl,"/users/me"),{method:"PATCH",headers:s.headers,body:JSON.stringify({name:e,about:n})}).then(a)).then((function(e){S.textContent=e.name,b.textContent=e.about,t(T)}));var e,n}),e)})),L.addEventListener("submit",(function(e){i((function(){return(e=C.value,n=g.value,fetch("".concat(s.baseUrl,"/cards"),{method:"POST",headers:s.headers,body:JSON.stringify({name:e,link:n})}).then(a)).then((function(e){H(e,!0),t(w)}));var e,n}),e)})),x.addEventListener("submit",(function(e){i((function(){return(e=A.value,fetch("".concat(s.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:s.headers,body:JSON.stringify({avatar:e})}).then(a)).then((function(e){P.style.backgroundImage="url('".concat(e.avatar,"')"),t(B)}));var e}),e)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){n.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.error):t.setCustomValidity(""),t.validity.valid?r(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-input-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n),o(e,n)}(e,n,t)}))})),o(e,t)}(t,e)}))}(N),fetch("".concat(s.baseUrl,"/users/me"),{headers:s.headers}).then(a).then((function(e){S.textContent=e.name,b.textContent=e.about,P.style.backgroundImage="url('".concat(e.avatar,"')"),D=e._id})).then((function(){return fetch("".concat(s.baseUrl,"/cards"),{headers:s.headers}).then(a)})).then((function(e){e.forEach((function(e){return H(e)}))})).catch((function(e){return console.error(e)}))})();