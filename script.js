let popup = document.getElementById("popupForm");
let popupContainer = document.querySelector(".container");
let popupEditBtn = document.querySelector(".profile__edit-button");
let popupCloseBtn = document.querySelector(".popup__close-button");
let userName = document.querySelector(".profile__name");
let userWhois = document.querySelector(".profile__whois");
let popupUserName = document.getElementById("popup-name");
let popupUserWhois = document.getElementById("popup-whois");

function openPopup() {
  popup.classList.add("popup_opened");
  popupUserName.value = userName.textContent;
  popupUserWhois.value = userWhois.textContent;
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  userName.textContent = popupUserName.value; // Так мы можем определить свою логику отправки.
  userWhois.textContent = popupUserWhois.value; // О том, как это делать, расскажем позже.
  closePopup();
}

popupEditBtn.addEventListener("click", openPopup);
popupCloseBtn.addEventListener("click", closePopup);
popupContainer.addEventListener("submit", formSubmitHandler);
