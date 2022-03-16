let popup = document.getElementById("popupForm");
let popupForm = document.querySelector(".popup__form");
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

function profileNameTitle() {
  userName.setAttribute("title", popupUserName.value);
  userName.style.cursor = "default";
}

function profileWhoisTitle() {
  userWhois.setAttribute("title", popupUserWhois.value);
  userWhois.style.cursor = "default";
}

userName.addEventListener("mouseover", profileNameTitle);
userWhois.addEventListener("mouseover", profileWhoisTitle);
userWhois.setAttribute("title", popupUserWhois);
popupEditBtn.addEventListener("click", openPopup);
popupCloseBtn.addEventListener("click", closePopup);
popupForm.addEventListener("submit", formSubmitHandler);
